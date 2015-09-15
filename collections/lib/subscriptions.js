Subscriptions = new Mongo.Collection('Subscriptions');


Subscriptions.allow({
  insert: function (userId, subscription) {
    return userId && isAdmin(userId);
  },
  update: function (userId, subscription, fields, modifier) {
    return userId && isAdmin(userId);
  },
  remove: function (userId, subscription) {
    return userId && isAdmin(userId);
  }
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
