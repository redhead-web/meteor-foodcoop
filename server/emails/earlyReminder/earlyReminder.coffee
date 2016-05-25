require 'meteor/meteor'

exports.earlyShoppingReminder = ->
  if this.connection
    throw new Meteor.Error 403, 'method can only be called from Server'
  # find products who's last day to shop is today
  deliveryDay = GetNextDeliveryDay()
  daysNotice = deliveryDay.diff(moment().startOf('day'), 'days')

  # don't send an early shopping reminder on the same day we send last call reminders
  if daysNotice == Meteor.settings.public.shoppingThreshold
    return

  @unblock()

  products = Products.find({
    daysNotice: daysNotice
    published: true
    stocklevel: $gt: 0
  }, fields:
    name: 1
    producer: 1
    producerName: 1
    producerCompanyName: 1
    img: 1
    price: 1
    unitOfMeasure: 1
    stocklevel: 1).fetch()

  # build recipient lists
  favouriteRecipients = []
  likeRecipients = []
  likedProducers = []

  console.log products

  for product in products
    productLikers = _.pluck(Likes.find(
      likee: product._id
      category: 'products').fetch(), 'liker')
    favouritedOrRecentUsers = Meteor.users.find({ $or: [
      { 'profile.lastOrder': product._id }
      { '_id': $in: productLikers }
    ] }, fields:
      'emails.address': 1
      'profile.name': 1).fetch()

    #likers
    likers = Likes.find likee: product.producer

    if likers.length > 0
      likedProducers = _.union(likedProducers, _.pluck(likers, 'liker'))

    likingUsers = Meteor.users.find(
      _id: $in: _.pluck(likers.fetch(), 'liker')
    , fields:
        'emails.address': 1
        'profile.name': 1
    ).fetch()

    for user in favouritedOrRecentUsers
      idx = _.findIndex favouriteRecipients, _id: user._id
      if idx != -1
        #recipient already exists, append data rather than creating a new recipient
        favouriteRecipients[idx].products.push(product)
      else
        favouriteRecipients.push _.merge user,
          products: [product]

    for user in _.difference(likingUsers, favouritedOrRecentUsers)
      idx = _.findIndex likeRecipients, _id: user._id
      if idx != -1
        #recipient already exists, append data rather than creating a new recipient
        producers = likeRecipients[idx].producers
        pidx= _.findIndex producers, _id: product.producer
        if pidx != -1
          likeRecipients[idx].producers[pidx].products.push product
        else
          likeRecipients[idx].producers.push
            _id: product._id
            name: product.producerName
            companyName: product.companyName
            products: [product]
      else
        likeRecipients.push _.merge user,
          producers: [
            _id: product._id
            name: product.producerName
            companyName: product.companyName
            products: [product]
          ]


  # liked producer emails

  for recipient in likeRecipients
    console.log recipient
    result = Mailer.send
      to: "#{recipient.profile.name} <#{recipient.emails[0].address}>"
      replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
      subject: "shop now for some products from Producers you like"
      template: "earlyLikesProducerShoppingReminder"
      data:
        recipient: recipient

  for recipient in favouriteRecipients

    result = Mailer.send
      to: "#{recipient.profile.name} <#{recipient.emails[0].address}>"
      replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
      subject: "Products recommended for you"
      template: "earlyFavouritedShoppingReminder"
      data:
        recipient: recipient

  return {likeRecipients, favouriteRecipients}


  # data I need

  ###

   -- recipient Object
  _id: 1
  profile.name: 1
  emails.address: 1
  producers: [{name: 1, companyName: 1, products: [
    name:                   1
    producer:               1
    producerName:           1
    producerCompanyName:    1
    img:                    1
    price:                  1
    stocklevel:             1
    unitOfMeasure:          1
  ]}]

  # favourited item data I need

  -- recipient Object
    _id: 1
    profile.name: 1
    emails.address: 1
    products: [{
      _id:                    1
      name:                   1
      producer:               1
      producerName:           1
      producerCompanyName:    1
      img:                    1
      price:                  1
      stocklevel:             1
      unitOfMeasure           1
    }]

  ###

Meteor.methods
  '/email/early-shopping-reminder': exports.earlyShoppingReminder
