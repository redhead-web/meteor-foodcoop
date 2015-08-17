Products = new Mongo.Collection("products");

Products.allow({
  insert: function (userId, product) {
    return userId && isAdmin(userId);
  },
  update: function (userId, product, fields, modifier) {
    return userId && isAdmin(userId);
  },
  remove: function (userId, product) {
    return userId && isAdmin(userId);
  }
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
