import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { schema } from './schema.coffee';


export const DeliverySettings = new Mongo.Collection('deliverySettings');

DeliverySettings.allow({
  insert(userId) {
    return userId && Roles.userIsInRole(userId, 'admin');
  },
  update(userId) {
    return userId && Roles.userIsInRole(userId, 'admin');
  },
  remove(userId) {
    return userId && Roles.userIsInRole(userId, 'admin');
  },
});

DeliverySettings.attachSchema(schema);
