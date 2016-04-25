

Meteor.methods
	"/cart/admin/insert": (customerId, product, qty) ->
		check customerId, String
		if Roles.userIsInRole @userId, 'admin'
			self = this
			self.userId = customerId
			Meteor.call.call self, '/cart/insert', product, qty
		else
			throw new Meteor.Error 401, 'only admin can call that method'
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

		if product.stocklevel? && qty > product.stocklevel
			throw new Meteor.Error 401, "Insufficient Stock Sorry!", product.stocklevel - qty

		cartItem = Cart.Items.findOne userId: @userId, productId: product._id
		
		if cartItem? and cartItem._id?

			result = Meteor.call "/cart/item/increment", cartItem._id, qty
			return result

		else
			result = Cart.Items.insert
				dateCreated: new Date()
				dateModified: new Date()
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
					extraMarkup: product.extraMarkup or undefined
					daysNotice: product.daysNotice

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
