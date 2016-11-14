import { Deliveries } from '../collection';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('deliveries', (deliveryDay) => {
  check(deliveryDay, String);
  return Deliveries.find({ deliveryDay: new Date(deliveryDay), archived: false });
});

Meteor.publish('myDeliveries', function myDeliveries() {
  const query = { userId: this.userId, archived: false };
  Counts.publish(this, 'myDeliveriesCount',
    Deliveries.find(query), { noReady: true });
  return Deliveries.find(query);
});

Meteor.publish('archivedDeliveries', () =>
  Deliveries.find({ archived: true })
);
