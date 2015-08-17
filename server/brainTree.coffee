

gateway = BrainTreeConnect {
  environment: Braintree.Environment.Sandbox,
  merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
  publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
  privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
}

Meteor.methods
  generateClientToken: (customerId) ->
    this.unblock()
    config = {}
    if customerId
      config.customerId = customerId
    getToken = gateway.clientToken.generate config

    getToken.clientToken

  findPlanId: (price) ->
    price = validCurrency price
    result = gateway.plan.all

    id = _.find result, (plan) ->
      plan.price == price

    id

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
      options:
        submitForSettlement: true
    }

    unless user.customerId?

      config.options.storeInVaultOnSuccess = true
      config.customer =
        email: user.emails[0].address
        firstName: user.profile.name.split(" ").slice(0,-1).join(" ")
        lastName: user.profile.name.split(" ").slice(-1).join(" ")
        phone: if /^[0-9\.\(\)\-]{10, 14}$/.test(user.profile.phone) then user.profile.phone else undefined

    result = gateway.transaction.sale config

    new Meteor.Error('Transaction failed', result.errors) if not result.success

    if result.success and not user.customerId
      update = storeBraintreeData user, result.transaction
      if update
        Meteor.users.update user._id, update, (err) ->
          new Meteor.Error('update failed', err) if err


    if result.success
      resultUpdate = Meteor.call('addToSubscriptions', user.profile.cart)
      console.log resultUpdate
    result

  braintreeSubscription: (data) ->
    #does user have a braintree id? if not get them one. then update their id
    this.unblock()
    id = Meteor.call 'findPlanId', data.price

    user = Meteor.user
    unless user.customerId?
      #create them
      config =
        {
          paymentMethodNonce: data.paymentMethodNonce
          email: user.emails[0].address
          firstName: user.profile.name.split(" ").slice(0,-1).join(" ")
          lastName: user.profile.name.split(" ").slice(-1).join(" ")
          phone: if /^[0-9\.\(\)\-]{10, 14}$/.test(user.profile.phone) then user.profile.phone else undefined
        }

      customer = gateway.customer.create config
      update =
        $set:
          'customerId': result.id

      Meteor.users.update this.userId, update, ->
        console.log "braintree customer created"
    subscription = gateway.subscription.create {
      planId: id
      id: customer.id or Meteor.user.customerId
      paymentMethodNonce: data.payment_method_nonce
      neverExpires: true
    }

    Meteor.call('addToSubscriptions')

    {
      status: subscriptions.status
      price: subscription.price
      planId: subscription.planId
    }



storeBraintreeData = (user, transaction) ->
  unless user.customerId?
  # must be the first time so save everything without checking
    update =
      $set:
        'customerId' : transaction.customer.id

    console.log update
  update


validCurrency = (amount) ->
  if typeof amount == "number"
    amount.toFixed 2
  if typeof amount != "number" and not /^\d+(\.)?(\d{0,2})?/.test(amount)
    throw new Meteor.Error('invalid amount format', 'invalid amount to be transacted', 'validCurrency function')
  amount
