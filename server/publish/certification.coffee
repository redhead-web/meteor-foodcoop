Meteor.publish "certifications", ->
  Certifications.find {},
    sort: [["name", "asc"]]
