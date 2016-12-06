import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

import { schema } from './schema.coffee';

export const Events = new Mongo.Collection('events');

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

Events.allow({
  insert(userId) {
    return userId && isAdmin(userId);
  },
  update(userId) {
    return userId && isAdmin(userId);
  },
  remove(userId) {
    return userId && isAdmin(userId);
  },
});

Events.attachSchema(schema);
