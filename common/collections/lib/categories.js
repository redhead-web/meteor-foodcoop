Categories = new Mongo.Collection("categories");

Categories.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});
