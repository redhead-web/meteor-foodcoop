

gateway = BrainTreeConnect {
  environment: Braintree.Environment.Sandbox,
  merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
  publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
  privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
}

Meteor.methods
  generateClientToken: (customerId) ->
    config = {}
    if customerId
      config.customerId = customerId
    else
      config.customerId = Meteor.call 'registerCustomer'

    getToken = gateway.clientToken.generate config

    getToken.clientToken

  registerCustomer: ->
    user = Meteor.user()
    config =
      {
        #paymentMethodNonce: data.paymentMethodNonce
        email: user.emails[0].address
        firstName: user.profile.name.split(" ").slice(0,-1).join(" ")
        lastName: user.profile.name.split(" ").slice(-1).join(" ")
        phone: if /^[0-9\.\(\)\-]{10, 14}$/.test(user.profile.phone) then user.profile.phone else undefined
      }

    result = gateway.customer.create config
    console.log result.customer
    update =
      $set:
        'profile.customerId': result.customer.id

    Meteor.users.update this.userId, update, ->
      console.log "braintree customer created"

    result.customer.id

  findPlanId: (price) ->
    # Needs tests as currently not working

    price = validCurrency price
    result = gateway.plan.all()
    check price, String
    plan = _.find result.plans, (plan) ->
      plan.price == price

    unless plan == undefined then return plan.id

  findUserPaymentMethods: ->
    if Meteor.user().customerId?
      result = gateway.customer.find Meteor.user().customerId
      if result.paymentMethods?
        result.paymentMethods
      else result
    else []

  makeDefaultPaymentMethod: (token) ->
    result = gateway.paymentMethod.update token,
      options: {makeDefault: yes}
    result

  braintreeTransaction: (data) ->
    ###
     data Object
     @total = total to be transacted either as a Number or String $100.00
     @paymentMethodNonce = payment nonce for once-off transaction or a new
     transaction with a saved payment method
     @user = used for mocking user data for integration tests

    ###

    user = data.user or Meteor.user()
    data.total = validCurrency(data.total)

    config = {
      amount: data.total
      paymentMethodNonce: data.payment_method_nonce
      customerId: user.profile.customerId
      options:
        submitForSettlement: true
        storeInVaultOnSuccess: true
    }

    result = gateway.transaction.sale config

    new Meteor.Error('Transaction failed', result.errors) if not result.success

    if result.success
      resultUpdate = Meteor.call('addToSubscriptions', user.profile.cart, result.transaction.id)
      console.log resultUpdate
    result

  braintreeSubscription: (data) ->
    #does user have a braintree id? if not get them one. then update their id
    id = Meteor.call 'findPlanId', data.price
    user = Meteor.user()

    subscriptionData =
      planId: id
      paymentMethodNonce: data.payment_method_nonce
      neverExpires: true
      options: startImmediately: true

    if data.qty > 1
      addOnId = if data.price == '41.66' then 'extra10' else 'extra20'
      subscriptionData.addOns =
        add: [
          inheritedFromId: addOnId
          qty: data.qty-1
        ]

    subscription = gateway.subscription.create subscriptionData
    console.log subscription
    if subscription.success
      Meteor.call('addToSubscriptions',
      user.profile.cart,
      subscription.subscription.transactions[0].id,
      subscription.subscription.id)

      {
        status: subscriptions.success
        price: subscription.subscription.price
        planId: subscription.subscription.planId
      }
    else
      # throw new Meteor.Error('subscription failed', subscription.errors)


validCurrency = (amount) ->
  if typeof amount == "number"
    amount = Number(amount).toFixed 2
  if typeof amount != "number" and not /^\d+(\.)?(\d{0,2})?/.test(amount)
    throw new Meteor.Error('invalid amount format', 'invalid amount to be transacted', 'validCurrency function')
  amount
