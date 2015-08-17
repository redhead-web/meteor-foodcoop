Meteor.startup ->
  SimpleSchema.debug = true
  console.log "starting the app... :-)"
  if Products.find().count() is 0

    products = [
      {
        'name': 'Small Fruit & Veggie Box'
        'description': 'Get a great deal on all the best priced vegetables'
        published: true
        price: 10
      },
      {
        'name': 'Big Fruit & Veggie Box'
        'description': 'Get a great deal on all the best priced vegetables'
        published: true
        price: 20
      }
    ]

    for product in products
      Products.insert product

  if Hubs.find().count() is 0

    hubs = [
      {
        'location': 'Whau Valley'
        'dayOfTheWeek': 'Tuesday'
        'openHours': '2:30pm-3:30pm'
        'description': 'Pick up your box in Whau Valley now. Perfect if you live or work in Kamo or Kensington'
        'coords': {}
      },
      {
        'location': 'Rust Ave, The Old Library, Whangarei'
        'dayOfTheWeek': 'Tuesday'
        'openHours': '4pm-6:30pm'
        'description': 'Pick up your box in Central Whangarei. Perfect if you live or work in Whangarei CBD'
        'coords': {}
      }
    ]

    for hub in hubs
      Hubs.insert hub

  if Meteor.users.find().count() is 0
    users = [
      { email: 'sean@maplekiwi.com', name: 'Sean Stanley Master Role', roles: ['admin']}
      { email: 'sean@foodcoop.nz', name: 'Sean Stanley Customer Role', roles: []}
      { email: 'sean@corymbosa.me', name: 'Sean Stanley Big Customer Role', roles: ['wholesaleBuyer']}
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
