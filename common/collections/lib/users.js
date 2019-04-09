import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

// function isProducer(user) {
//   return Roles.userIsInRole(user, 'producer');
// }

Meteor.users.allow({
  insert() {
    return true;
  },
  update(userId, user, fields) {
    console.log(`update request made by ${userId} for ${user.profile.name}`);
    console.log(fields);
    return userId;
  },
  remove(userId) {
    return userId && isAdmin(userId);
  },
});
