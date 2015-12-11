Meteor.users.allow({
  insert: function (userId, user) {
    return true;
  },
  update: function (userId, user, fields, modifier) {
    console.log('update request made by '+userId+" for " + user.profile.name)
    console.log(fields)
    return userId;
  },
  remove: function (userId, user) {
    return userId && isAdmin(userId);
  }
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}

function isProducer (user) {
  return Roles.userIsInRole(user, 'producer');
}
