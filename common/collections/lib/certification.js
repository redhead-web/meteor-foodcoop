Certifications = new Mongo.Collection("certifications");

Certifications.deny({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
