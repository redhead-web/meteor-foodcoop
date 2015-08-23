Meteor.publish 'mySubscriptions', ->
  Subscriptions.find({user: this.userId}, {transactionId: 0})
