import { Mongo } from 'meteor/mongo';
import {Roles} from 'meteor/alanning:roles'

import {schema} from './schema'

export const Requests = new Mongo.Collection('requests');

Requests.allow({
  insert(userId, request) {
    return userId
  },
  update(userId, request, fields, modifier) {
    return request.creator.creatorId == userId || isAdmin(userId)
  },
  remove(userId, request) {
    return request.creator.creatorId == userId || isAdmin(userId);
  }
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}

Requests.attachSchema(schema)

