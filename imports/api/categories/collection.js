import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection("categories");

Categories.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});

