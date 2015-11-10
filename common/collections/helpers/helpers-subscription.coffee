if Meteor.isServer
  gateway = BrainTreeConnect {
    environment: Braintree.Environment.Sandbox,
    merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
    publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
    privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
  }

Subscriptions.helpers
  transaction: ->
    if Meteor.isServer
      gateway.transaction.find this.transactionId
    else
      this.transactionId
  getUser: ->
    Meteor.users.findOne this.user,
     {'emails': 1, 'profile': 1, 'profile.cart':0}


# Meteor.startup ->
#   if Subscriptions?
#     console.log Subscriptions.findOne().getUser().profile.name
