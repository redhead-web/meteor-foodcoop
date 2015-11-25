Meteor.publish "categories", ->
  Categories.find {},
    sort: [["name", "asc"]]
