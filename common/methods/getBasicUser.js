import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  getBasicUser(_id) {
    if (!_id) { return {}; }
    let fields = {
      'emails.address': 1,
      'services.facebook.id': 1,
      'profile.name': 1,
      'profile.phone': 1,
    };
    if (Roles.userIsInRole(this.userId, 'admin')) {
      fields = { ...fields, 'profile.balance': 1 };
    }
    return Meteor.users.findOne({
      _id,
    }, {
      fields,
    });
  },
});
