Meteor.startup ->
  SimpleSchema.debug = true
  console.log "starting the app... :-)"

  if Meteor.users.find().count() is 0
    users = [
      { email: 'sean@maplekiwi.com', name: 'Sean Stanley Master Role', roles: ['admin', 'producer']}
      { email: 'sean@foodcoop.nz', name: 'Sean Stanley Customer Role', roles: []}
      { email: 'sean@corymbosa.me', name: 'Sean Stanley Producer Role', roles: ['producer']}
    ]

    for user in users
      id = Accounts.createUser {
        email: user.email
        password: "12345678"
        createdAt: Date.now
        profile:
          name: user.name
          address: 'home'
          phone: '123'
      }

      Roles.addUsersToRoles id, user.roles unless user.roles.length is 0

    console.log "user fixtures added"

  if Products.find().count() is 0
    producer = Meteor.users.findOne {'profile.name': 'Sean Stanley Master Role'}
    products = []

    products.push
      name: 'Plum Jam'
      producer: producer._id
      producerName: producer.profile.name
      price: 5
      unitOfMeasure: "400 g jar"
      categories: ["processed goods", "jam", "fruit", "vegan"]
      stocklevel: 50
      published: true

    products.push
      name: 'Raw Milk'
      producer: producer._id
      producerName: producer.profile.name
      price: 2
      unitOfMeasure: "L"
      categories: ["Dairy", "Milk", "Raw"]
      published: true

    # modify addToCart functions to ignore products with no stocklevel
