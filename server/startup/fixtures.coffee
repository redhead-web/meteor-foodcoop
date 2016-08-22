Meteor.startup ->
  console.log "starting the app... :-)"

  if Categories.find().count() is 0
    categories = [
      {name: 'Seedlings'}
      {name: 'Baked Goods'}
      {name: 'Meat'}
      {name: 'Dairy & Eggs'}
      {name: 'Produce'}
      {name: 'Processed Goods'}
      {name: 'Tea & Beverages'}
      {name: 'Ready-made Meals'}
    ]
    for cat in categories
      Categories.insert cat

  if Certifications.find().count() is 0
    certifications = [
      {name: 'Assure Qual', img: 'certification/assure-quality.png'}
      {name: 'Biogro', img: 'certification/biogro.png'}
      {name: 'Demeter', img: 'certification/demgreen.gif'}
      {name: 'Organic Farm NZ', img: 'certification/organicfarmnz.png'}
      {name: 'In Transition'}
    ]
    for cert in certifications
      Certifications.insert cert

  if Meteor.users.find().count() is 0
    users = [
      { email: 'fake@yourdomain.com', name: 'Administrator', roles: ['admin', 'producer']}
      { email: 'admin2@yourdomain.com', name: 'Primary Producer', roles: ['producer', 'admin']}
    ]

    for user in users
      id = Accounts.createUser {
        email: user.email
        password: "password1234"
        createdAt: Date.now
        profile:
          name: user.name
          phone: '123'
      }

      Roles.addUsersToRoles id, user.roles unless user.roles.length is 0

    console.log "user fixtures added"

  if Products.find().count() is 0
    producer = Meteor.users.findOne {'profile.name': users[1].name}
    products = []

    products.push
      name: 'Plum Jam'
      producer: producer._id
      producerName: producer.profile.name
      price: 5
      unitOfMeasure: "400 g jar"
      category: "Processed Goods"
      stocklevel: 50
      description: 'delicious and tasty jam'
      published: true

    products.push
      name: 'Raw Milk'
      producer: producer._id
      producerName: producer.profile.name
      price: 2
      unitOfMeasure: "L"
      category: "Dairy & Eggs"
      published: true

    for product in products
      Products.insert product

