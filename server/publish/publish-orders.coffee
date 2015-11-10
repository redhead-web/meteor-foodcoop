Meteor.publish 'mySubscriptions', ->
  Subscriptions.find({user: this.userId}, {transactionId: 0})

Meteor.publish 'myAutomaticPaymentSubscriptions', ->
  Subscriptions.find({user:this.userId, ap:true})
