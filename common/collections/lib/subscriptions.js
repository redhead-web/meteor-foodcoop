Subscriptions = new Mongo.Collection('Subscriptions');


Subscriptions.allow({
  insert: function (userId, subscription) {
    // only the server can create non AP subscriptions
    if (subscription.ap == false) {
      return userId && isAdmin(userId);
    }
    // the client can create ap's for themselves.
    if (subscription.ap) {
      return userId && subscription.user == userId
    }
  },
  fetch: ['user', 'status'],
  update: function (userId, subscription, fields, modifier) {
    console.log(fields);
    if (isAdmin(userId)) {
      // Admin's can update anything about a subscription
      return true
    }

    // A user can cancel their own subscription
    if (subscription.status == 'active' && _.contains(fields, 'status') && subscription.user == userId) {
      return userId && subscription.user == userId
    }


  },
  remove: function (userId, subscription) {
    return userId && isAdmin(userId);
  }
});

Subscriptions.deny({
  fetch: ['user', 'subscriptionId', 'productId', 'continuous', 'transactionId', 'status'],
  update: function(userId, subscription, fields, modifier) {
    if (_.contains(fields, 'user') || _.contains(fields, 'subscriptionId') || _.contains(fields, 'continuous') || _.contains(fields, 'transactionId') || _.contains(fields, 'productId')) {
      return true;
    }

    if (subscription.status === 'cancelled' && !isAdmin(userId)) {
      return true;
    }
  }
})

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
