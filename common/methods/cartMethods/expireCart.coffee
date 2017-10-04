import moment from 'moment-timezone';

# moment.tz.setDefault(Meteor.settings.public.tz);

Meteor.methods
  expireCart: ->
    duration = moment.duration(Meteor.settings.cartExpiryDays, 'days')
    threshold = moment().subtract(duration).toDate()

    if threshold < new Date()


      count = Meteor.users.update
        'profile.cart.status': 'active'
        'profile.cart.last_modified': $lt: threshold
      ,
        $set: 'profile.cart.status':'expiring'
      ,
        multi:yes

      Meteor.users.find 'profile.cart.status': 'expiring'
      .forEach (user) ->
        for product in user.profile.cart.products
          Products.update
            _id: product.productId
            'carted.user': user._id
            stocklevel: $exists: 1
          ,
            $inc: stocklevel: product.qty
            $pull: carted: user: user._id
        Meteor.users.update
          _id: user._id
        ,
          $set: 'profile.cart.products': []

Meteor.methods
  cleanup_inventory: ->
    duration = moment.duration(Meteor.settings.cartExpiryDays, 'days')
    threshold = moment().subtract(duration).toDate()
    if threshold < new Date()
      Products.find 'carted.timestamp': $lt : threshold
      .forEach (product) ->
        for cart in product.carted
          if cart.timestamp < threshold
            user = Meteor.users.findOne _id: cart.user
            if user.profile.cart.status == 'active'
              Products.update
                _id: product._id
                'carted.user': user._id
              ,
                'carted.timestamp': new Date()
            else
              Products.update
                _id: product.productId
              ,
                $inc: stocklevel: cart.qty
                $pull: carted: user: user._id
