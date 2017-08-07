environment = Braintree.Environment.Sandbox

if process.env.METEOR_ENVIRONMENT == 'production'
  environment = Braintree.Environment.Production

gateway = BrainTreeConnect
  environment: environment
  merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID
  publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY
  privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY


Meteor.methods
  generateClientToken: (userId) ->
    # check(userId, String)
    # check(@userId, String)
    config = {}

    # use customerId only if the user is registered with us
    if userId
      if userId != @userId and not Roles.userIsInRole(@userId, "admin")
        throw new Meteor.Error 'FORBIDDEN', 'can\'t generate the client token'

      user = Meteor.users.findOne _id: userId

      if user.customerId?
        config.customerId = user.customerId

      else
        config.customerId = Meteor.call 'registerCustomer', user

    getToken = gateway.clientToken.generate config
    unless getToken.success == true
      console.log getToken
    getToken.clientToken

  registerCustomer: (user) ->
    config =
      {
        #paymentMethodNonce: data.paymentMethodNonce
        email: user.emails[0].address
        firstName: user.profile.name.split(" ").slice(0,-1).join(" ")
        lastName: user.profile.name.split(" ").slice(-1).join(" ")
        phone: if /^[0-9\.\(\)\-]{10, 14}$/.test(user.profile.phone) then user.profile.phone else undefined
      }

    result = gateway.customer.create config
    update =
      $set:
        'customerId': result.customer.id

    Meteor.users.update user._id, update, ->
      console.log "braintree customer created"

    return result.customer.id

  findPlanId: (price) ->
    # Needs tests as currently not working

    price = validCurrency price
    result = gateway.plan.all()
    check price, String
    plan = _.find result.plans, (plan) ->
      plan.price == price
    unless plan == undefined then return plan.id
    if plan == undefined
      throw new Meteor.Error 404, "no subscription plan found for that price"

  findUserPaymentMethods: ->
    user = Meteor.users.findOne _id: @userId
    if user.customerId?
      result = gateway.customer.find user.customerId
      if result.paymentMethods?
        result.paymentMethods
      else result
    else []

  makeDefaultPaymentMethod: (token) ->
    result = gateway.paymentMethod.update token,
      options: {makeDefault: yes}
    result
  deletePaymentMethod: (token) ->
    result = gateway.paymentMethod.delete token
    result
  braintreeTransaction: (data) ->
    new SimpleSchema({
      total: type: Number, decimal: true, min: 0
      payment_method_nonce: type: String
      customerId: type: String, optional: true
      fees: type: Boolean, optional: true
    }).validate(data)

    if data && data.total == 0
      return { success: true, transaction: id: 'no-card-charge-needed' }

    total = data.total

    if data.fees
      fee = Meteor.settings.public.fees.FIXED + data.total -
      (data.total * (1-Meteor.settings.public.fees.PERCENT))
      total += fee

    config = {
      amount: total.toFixed 2
      paymentMethodNonce: data.payment_method_nonce
      customerId: data.customerId
      options:
        submitForSettlement: true
        storeInVaultOnSuccess: true
    }

    result = gateway.transaction.sale config
    unless result.success
      console.log result
      if result.transaction?
        console.error result.transaction.processorResponseCode, result.transaction.processorResponseText
        throw new Meteor.Error result.transaction.processorResponseCode, result.transaction.processorResponseText
      else
        console.error result.message
        throw new Meteor.Error 500, result.message

    return result

  # braintreeSubscription: (data) ->
#     #does user have a braintree id? if not get them one. then update their id
#     id = Meteor.call 'findPlanId', data.price
#     user = Meteor.user()
#
#     subscriptionData =
#       planId: id
#       paymentMethodNonce: data.payment_method_nonce
#       neverExpires: true
#       options: startImmediately: true
#
#     if data.qty > 1
#       addOnId = if data.price == '41.66' then 'extra10' else 'extra20'
#       subscriptionData.addOns =
#         add: [
#           inheritedFromId: addOnId
#           qty: data.qty-1
#         ]
#
#
#     try
#       subscription = gateway.subscription.create subscriptionData
#
#       if subscription.success == true
#         data.subscription.transactionId = subscription.subscription.transactions[0].id
#         data.subscription.subscriptionId = subscription.subscription.id
#         data.subscription.status = 'active'
#
#         Subscriptions.insert data.subscription, (err, result) ->
#           if err
#             console.log err
#           else
#             console.log result
#
#         return {
#           status: subscription.success
#           price: subscription.subscription.price
#           planId: subscription.subscription.planId
#         }
#
#     catch e
#       throw new Meteor.Error 500, "Braintree Subscription Error", e.stack

  getTransaction: (transactionId) ->
    check transactionId, String
    result = gateway.transaction.find transactionId
    result

  cancelSubscription: (id) ->
    try
      result = gateway.subscription.cancel(id)
      console.log result
      result
    catch e
      throw new Meteor.Error 'Subscription Cancellation Failed', result.errors
