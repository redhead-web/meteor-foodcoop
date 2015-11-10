Orders = new Mongo.Collection('orders');


Orders.allow({
  insert: function (userId, order) {
    // you can only order something for yourself
    if (isAdmin(userId)) {return true}
    return userId && order.user == userId
  },
  fetch: ['user', 'status'],
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

Orders.deny({
  fetch: ['user', 'status'],
  update: function(userId, subscription, fields, modifier) {
    if (_.contains(fields, 'user') {
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
