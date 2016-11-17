import { DeliverySettings } from '../collection';
import { Meteor } from 'meteor/meteor';

Meteor.publish('deliverySettings', () =>
  DeliverySettings.find({}, { sort: { deliveryId: 1 } })
);
