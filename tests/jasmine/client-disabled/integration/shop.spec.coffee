describe "shopping in the co-op", ->
  it "should find two default products", ->
    expect Products.find().count()
    .toBe 2

  # it "should find a logged in user", (done) ->
  #   Meteor.call "isLoggedIn", (error, id) ->
  #     expect id
  #     .toBeDefined()
  #     expect error
  #     .toBeUndefined()
  #
  #     done()
      
  
  it "should be able to add a product to the user's cart and subtract that quantity from stocklevels", (done) ->
    product = Products.findOne name: 'Plum Jam'

    stocklevel = product.stocklevel

    expect stocklevel
    .toBe 50

    expect product.name
    .toBeDefined()
    
    expect product._id
    .toBeDefined()

    Meteor.call "/cart/insert", product, 10, (err, itemId) ->

      expect(err).toBeUndefined()
      expect(itemId).toBeDefined()

      expect Meteor.user().profile.cart.status
      .toBe 'active'
      
      expect Cart.Items.find().count()
      .toBe 1
      
      cartItem = Cart.Items.findOne 
        userId: Meteor.userId()
        productId: product._id
            
      expect Cart.Items.findOne(itemId).userId
      .toBe Meteor.userId()
      
      expect Cart.Items.findOne(itemId).productId
      .toBe product._id
      
      expect cartItem
      .toBeDefined()
      
      expect cartItem.qty
      .toBe 10

      expect stocklevel
      .toBe 50

      product = Products.findOne name: 'Plum Jam'

      expect product.carted[0].user
      .toBe Meteor.userId()

      expect product.stocklevel
      .toBe 40

      done()
      return

  it "should increment the amount in the cart if addToCart is called again", (done) ->
    product = Products.findOne name: 'Plum Jam'

    stocklevel = product.stocklevel

    expect stocklevel
    .toBe 40

    Meteor.call "/cart/insert", product, 1, (err, message) ->

      expect(err).toBeUndefined()
      expect(message).toBe "UPDATE SUCCESS"

      user = Meteor.users.findOne 'profile.name': "Sean Stanley Master Role"

      cartItem = Cart.Items.findOne 
        userId: Meteor.userId()
        productId: product._id
      
      expect cartItem
      .toBeDefined()
      
      expect cartItem.qty
      .toBe 11

      productUpdated = Products.findOne name: 'Plum Jam'

      expect productUpdated.stocklevel
      .toBe 39
      
      expect productUpdated.carted[0].qty
      .toBe 11

      done()
      return
      
  it "should be able to update the quantity of an item in the cart", (done) ->
    user = Meteor.users.findOne 'profile.name': "Sean Stanley Master Role"
    product = Products.findOne name: 'Plum Jam'
    
    expect product.stocklevel
    .toBe 39
    
    cartItem = Cart.Items.findOne 
      userId: Meteor.userId()
      productId: product._id
      
    expect cartItem
    .toBeDefined()
    
    expect cartItem.qty
    .toBe 11
    
    Meteor.call "/cart/item/update", cartItem._id, 4, 11, (err, result) ->
      expect(err).toBeUndefined()
      
      cartItem = Cart.Items.findOne 
        userId: Meteor.userId()
        productId: product._id
      
      expect cartItem.qty
      .toBe(4)
      
      product = Products.findOne name: 'Plum Jam'
      
      expect product.carted[0].qty
      .toBe 4
      
      expect product.stocklevel
      .toBe 46
            
      done()
      return
  
  it "should be able to remove an item from the cart", (done) ->
    product = Products.findOne name: 'Plum Jam'
    
    expect product.stocklevel
    .toBe 46
    
    cartItem = Cart.Items.findOne 
      userId: Meteor.userId()
      productId: product._id
      
    expect cartItem
    .toBeDefined()
    
    expect cartItem.qty
    .toBe(4)
    
    Cart.Items.remove cartItem._id, (err, result) ->
      expect(err).toBeUndefined()
      
      expect Cart.Items.find(userId: Meteor.userId()).count()
      .toBe 0
      
      product = Products.findOne name: 'Plum Jam'
      
      expect product.stocklevel
      .toBe 50
      
      expect product.carted.length
      .toBe 0
      
      done()
      
