Hubs = new Mongo.Collection("hubs");

Hubs.allow({
  insert: function (userId, hub) {
    return userId && isAdmin(userId);
  },
  update: function (userId, hub, fields, modifier) {
    return userId && isAdmin(userId);
  },
  remove: function (userId, hub) {
    return userId && isAdmin(userId);
  }
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
