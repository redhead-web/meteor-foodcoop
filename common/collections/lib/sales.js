Sales = new Mongo.Collection('sales');


Sales.allow({
  insert: function (userId, sale) {
    // you can only order something for yourself
    if (isAdmin(userId)) {return true}
  },
  update: function (userId, sale, fields, modifier) {
    if (isAdmin(userId)) {
      // Admin's can update anything about a sale
      return true
    }


  },
  remove: function (userId, sale) {
    return userId && isAdmin(userId);
  }
});

Sales.deny({
  fetch: ['user', 'status'],
  update: function(userId, sale, fields, modifier) {
    if (_.contains(fields, 'orderId') ) {
      return true;
    }
  }
})

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
