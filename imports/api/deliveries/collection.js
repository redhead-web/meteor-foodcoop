import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { schema } from './schema.coffee';


export const Deliveries = new Mongo.Collection('deliveries');

Deliveries.allow({
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

Deliveries.attachSchema(schema);
