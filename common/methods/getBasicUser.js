import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getBasicUser(_id) {
    if (!_id) { return {}; }
    return Meteor.users.findOne({
      _id,
    }, {
      fields: {
        'emails.address': 1,
        'services.facebook.id': 1,
        'profile.name': 1,
        'profile.phone': 1,
      },
    });
  },
});
