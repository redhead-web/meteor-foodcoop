import { Mongo } from 'meteor/mongo';
import {Roles} from 'meteor/alanning:roles'
import {Match} from 'meteor/check'

import {schema} from './schema'

export const Questions = new Mongo.Collection('questions');

Questions.allow({
  insert(userId) {
    return userId
  },
  update(userId, question, fields, modifier) {
    if (
      Match.test( modifier, {
        $set: {
          answer: {
            createdAt: Date,
            user: {
              name: String,
              // answerer must be user requesting update and not the questioner
              id: Match.Where(function(x) {return x == userId && question.question.user.id !== x})
            },
            body: String
          }
        }
      })
    ) {
      return true
    } else {
      // blanket permissions to data owners
      return question.question.user.id == userId || isAdmin(userId)
    }
  },
  remove(userId, question) {
    return question.question.user.id == userId || isAdmin(userId)
  }
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}

Questions.attachSchema(schema)
