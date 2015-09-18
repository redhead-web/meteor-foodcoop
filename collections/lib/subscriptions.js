Subscriptions = new Mongo.Collection('Subscriptions');


Subscriptions.allow({
  insert: function (userId, subscription) {
    if (subscription.ap == false) {
      return userId && isAdmin(userId);
    }

    if (subscription.ap) {
      return userId && subscription.user == userId
    }
  },
  update: function (userId, subscription, fields, modifier) {
    console.log(fields);
    if (subscription.ap == false) {
      return userId && isAdmin(userId);
    }

    if (subscription.ap == true && !!fields.status) {
      return userId && subscription.user == userId
    }
  },
  remove: function (userId, subscription) {
    return userId && isAdmin(userId);
  }
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
