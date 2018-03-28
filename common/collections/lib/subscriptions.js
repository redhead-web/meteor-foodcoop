import includes from 'lodash.includes';

Subscriptions = new Mongo.Collection('Subscriptions');


Subscriptions.allow({
  insert(userId, subscription) {
    // only the server can create non AP subscriptions
    if (subscription.ap == false) {
      return userId && isAdmin(userId);
    }
    // the client can create ap's for themselves.
    if (subscription.ap) {
      return userId && subscription.user == userId;
    }
  },
  fetch: ['user', 'status'],
  update(userId, subscription, fields, modifier) {
    console.log(fields);
    if (isAdmin(userId)) {
      // Admin's can update anything about a subscription
      return true;
    }

    // A user can cancel their own subscription
    if (subscription.status == 'active' && includes(fields, 'status') && subscription.user == userId) {
      return userId && subscription.user == userId;
    }
  },
  remove(userId, subscription) {
    return userId && isAdmin(userId);
  },
});

Subscriptions.deny({
  fetch: ['user', 'subscriptionId', 'productId', 'continuous', 'transactionId', 'status'],
  update(userId, subscription, fields, modifier) {
    if (includes(fields, 'user') || includes(fields, 'subscriptionId') || includes(fields, 'continuous') || includes(fields, 'transactionId') || includes(fields, 'productId')) {
      return true;
    }

    if (subscription.status === 'cancelled' && !isAdmin(userId)) {
      return true;
    }
  },
});

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}
