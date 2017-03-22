import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.users.find({
    'profile.deliveryAddress.formatted_address': { $exists: 0 }, 'profile.deliveryAddress.formattedAddress': { $exists: 1 },
  }).map(user => Meteor.users.update(user._id, {
    $set: {
      'profile.deliveryAddress.formatted_address': user.profile.deliveryAddress.formattedAddress,
    },
  }));
});
