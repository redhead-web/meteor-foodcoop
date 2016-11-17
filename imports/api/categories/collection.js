import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { schema } from './schema.coffee';

export const Categories = new Mongo.Collection('categories');

Categories.allow({
  insert(userId) {
    return userId && Roles.userIsInRole(userId, 'admin');
  },
  update() {
    return false;
  },
  remove() {
    return false;
  },
});

Categories.attachSchema(schema);
