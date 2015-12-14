Meteor.publish "producer", (producer) ->
  check producer, String

  Meteor.users.find _id: producer,
    limit: 1
    fields:
      'emails.address':1
      'profile.deliveryAddress': 1
      'profile.phone': 1
      'profile.name': 1
      'profile.companyName': 1
      'profile.summary': 1
      'profile.bio': 1
      'profile.shareAddress':1
      'profile.logo': 1
      'profile.banner': 1
      'profile.website': 1
      'profile.chemicals': 1
      'profile.certification': 1
      'profile.loveCount': 1