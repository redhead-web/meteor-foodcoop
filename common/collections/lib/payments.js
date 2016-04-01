Payments = new Mongo.Collection('payments');


Payments.allow({
  insert: function (userId, order) {
    // you can only order something for yourself
    if (isAdmin(userId)) {return true}
  },
  update: function (userId, order, fields, modifier) {
    if (isAdmin(userId)) {
      // Admin's can update anything about a subscription
      return true
    }
  },
  remove: function (userId, subscription) {
    return userId && isAdmin(userId);
  }
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
