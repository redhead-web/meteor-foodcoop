

Meteor.methods
	'/cart/item/increment': (cartId, qty) ->
		check cartId, String
		check qty, Number
				
		cartItem = Cart.Items.findOne(cartId)

		new_qty = cartItem.qty + qty

		result = Cart.Items.update cartItem._id,
			$inc: qty: qty

		try
			result = Products.update
				_id: cartItem.productId
				"carted.user": @userId
				stocklevel: $gte: qty
			,
				$inc: stocklevel: -qty
				$set:
					'carted.$.qty': new_qty,
					'carted.$.timestamp': new Date()
					
		catch error
			Cart.Items.update cartItem._id,
				$inc: qty: -qty
			throw new Meteor.Error 500, error.message, error.details
			
		
		return 'UPDATE SUCCESS'
		
	'/cart/insert': (product, qty) ->
		check product, Object
		check qty, Number

		if product.stocklevel && qty > product.stocklevel
			throw new Meteor.Error 401, "Insufficient Stock Sorry!", product.stocklevel - qty

		
		cartItem = Cart.Items.findOne userId: @userId, productId: product._id
		
		if cartItem? and cartItem._id?

			return Meteor.call "/cart/item/increment", cartItem._id, qty

		else
			result = Cart.Items.insert
				productId: product._id
				userId: @userId
				qty: qty
				details:
					producer: product.producer
					producerName: product.producerName
					producerCompanyName: product.producerCompanyName
					unitOfMeasure: product.unitOfMeasure
					name: product.name
					price: product.price
					img: product.img
					minimumOrder: product.minimumOrder or undefined
					packagingRefund: product.packagingRefund or 0
					packagingDescription: product.packagingDescription or undefined

		Meteor.users.update @userId,
			$set:
				'profile.cart.status' : 'active'

		productQuery =
			_id: product._id,
			stocklevel: $gte: qty

		productUpdate =
			$inc:
				stocklevel: -qty
			$push:
				carted:
					qty: qty
					user: @userId
					timestamp: new Date()
	
		try 
			Products.update productQuery, productUpdate
		catch error
			Cart.Items.remove(result)
			throw new Meteor.Error 500, error.message, error.details
		
		return result



	addToCart: (product, qty) ->

		userId = this.userId;

		check userId, String
		check product, Object
		check qty, Number

		if product.stocklevel && qty > product.stocklevel
			throw new Meteor.Error 401, "Insufficient Stock Sorry!", product.stocklevel - qty

		user = Meteor.users.findOne {_id: this.userId, 'profile.cart.products.productId': product._id}

		if user?

			cartProduct = _.find(user.profile.cart.products, (p) -> p.productId == product._id)
			console.log cartProduct.qty
			cartProduct.qty += qty
			console.log cartProduct.qty

			result = Meteor.users.update
				_id: userId
				'profile.cart.products.productId': product._id
			,
				$set:
					'profile.cart.status' : 'active'
					'profile.cart.products.$.qty': parseInt cartProduct.qty
		else
      result = Meteor.users.update
        _id: userId
      ,
        $set:
          'profile.cart.status' : 'active'
        $push:
          'profile.cart.products' :
            productId: product._id
            qty: qty
            details:
              producer: product.producer
              producerName: product.producerName
              producerCompanyName: product.producerCompanyName
              unitOfMeasure: product.unitOfMeasure
              name: product.name
              price: product.price
              img: product.img
              minimumOrder: product.minimumOrder or undefined
              packagingRefund: product.packagingRefund or 0
              packagingDescription: product.packagingDescription or undefined


		if result > 0 and product.stocklevel

			productQuery =
				_id: product._id,
				stocklevel: $gte: qty

			productUpdate =
				$inc:
					stocklevel: -qty
				$push:
					carted:
						qty: qty
						user: userId
						timestamp: new Date()

			if user? and product.stocklevel

				productQuery['carted.user'] = userId

				delete productUpdate.$push

				cartedObject = _.find Products.findOne(product._id).carted, (obj) ->
					return obj.user == userId

				cartedObject.qty += qty

				productUpdate.$set =
					'carted.$.qty': cartedObject.qty
					'carted.$.timestamp': new Date()

			Products.update productQuery, productUpdate, (error, num) ->
				if error
          console.log "could not add item to cart because Product stocklevels errored"
          console.error error.details
					undoCartAdd(userId, product, qty, user)
				if num is 0 and not product.stocklevel?
					console.log "Stocklevel not tracked on #{product.name}"
				else if num is 0 and product.stocklevel?
					undoCartAdd(userId, product, qty, user)
					throw new Meteor.Error 401, "Insufficient Stock Sorry!", product.stocklevel - qty
		if result == 0
			throw new Meteor.Error 400, "no cart to put that product in"

		if user?
			return 'UPDATE SUCCESS'
		else
			return 'ADD SUCCESS'


undoCartAdd = (userId, product, qty, userHasProduct) ->
	if userHasProduct?
		Meteor.users.update
			_id: userId
			'profile.cart.products.productId': product._id
		,
			$inc: 'profile.cart.products.$.qty': -qty

	else
    Meteor.users.update userId,
      $pull: 'profile.cart.products': productId: product._id
