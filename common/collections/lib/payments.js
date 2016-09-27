Payments = new Mongo.Collection('payments');


Payments.allow({
  insert: function (userId, paymentRecord) {
    // you can only order something for yourself
    if (isAdmin(userId)) {return true}
  },
  update: function (userId, paymentRecord, fields, modifier) {
    if (isAdmin(userId)) {
      // Admin's can update anything about a paymentRecord
      return true
    }
  },
  remove: function (userId, paymentRecord) {
    return userId && isAdmin(userId);
  }
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
