Meteor.publish "categories", ->
  Categories.find {},
    sort: [["name", "asc"]]
    
Meteor.publish "categories-and-certifications", ->
  [
    Categories.find({}, sort: {name: 1}),
    Certifications.find({}, sort: {name: 1})
  ]
