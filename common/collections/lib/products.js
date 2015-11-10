Products = new Mongo.Collection("products");

Products.allow({
  insert: function (userId, product) {
    return userId && Roles.userIsInRole(userId, 'producer') && (userId === product.producer || isAdmin(userId) );
  },
  update: function (userId, product, fields, modifier) {
    if (fields === ['qty'])) {
      return !!userId
    }
    return userId && isAdmin(userId);
  },
  remove: function (userId, product) {
    return userId && isAdmin(userId);
  }
});

Products.deny({
  update: function(userId, product, fields, modifier) {
    if (_.contains(fields, 'producer') || _.contains(fields, 'producerName') ||  _.contains(fields, 'producerCompanyName') || _.contains(fields, 'dateCreated')) {
      return true
    }
  }
})


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
