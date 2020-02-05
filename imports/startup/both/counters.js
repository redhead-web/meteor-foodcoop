/* globals Counters:writable */
/* eslint-disable camelcase */
import { Mongo } from 'meteor/mongo';

Counters = new Mongo.Collection('counters');

export const nextCount = (collection, _id) => {
  const { next_val } = collection.findOne(_id) || { next_val: 0 };
  if (next_val === 0) {
    collection.insert({ _id, next_val: 0 });
  }
  collection.update(_id, { $set: { next_val: next_val + 1 } });
  return next_val + 1;
};

export default Counters;
