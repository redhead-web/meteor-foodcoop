PointOfSaleController = ($scope, $reactive, $mdToast) ->
  "ngInject"
  
  $reactive(@).attach($scope)
  
  @subscribe 'user-list'
  @subscribe 'all-active-products'
  @subscribe 'cart-any-user', () => [@getReactively('customer._id')]
  
  @priceWithMarkup = (item) => Markup(item).total()
  @totalWithMarkup = (item) => Markup(item).cartTotal()
  
  @qty = 1;
  
  @helpers
    # products: =>
    #   Products.find()
    items: =>
      Cart.Items.find {userId: @getReactively('customer._id')}
      
  
  @autorun =>
    cartItems = Cart.Items.find({userId: @getReactively('customer._id')})
    .fetch()
    @total = Markup(cartItems).cartTotal()
    
  @autorun =>
    @customer = Meteor.users.findOne _id: @getReactively('customerObject._id')
    
  
    
  @getCustomers = (query) ->
    Meteor.users.find($or: [
      { 'profile.name':
        $regex: ".*#{query}"
        $options: 'i' }
      { 'profile.customerNumber': parseInt query }
    ]).fetch()
    
  @getProducts = (query) ->
    Products.find(name: $regex: ".*#{query}", $options: 'i').fetch()
    
  @submitToCart = =>
    @call '/cart/admin/insert', @customer._id, @product, @qty, (err, success) =>
      unless err
        delete @product
        delete @productSearch
        @qty = 1
      if err
        console.error err
    return
        
    
  @deleteItem = (id) ->
   Meteor.call("removeFromCart", id)
   
  @balanceSuccess = () =>
    $mdToast.show $mdToast.simple().content("Balance Payment handled. Well done!").position('bottom left').hideDelay(4000)
    reset()
    
  reset = () =>
    delete @product
    delete @customerObject
    delete @customerSearch
    delete @productSearch
   
  @cashCheckout = () =>
    @cashError = undefined
    @change = undefined
    
    cashTotal = @total
    balanceTotal = 0
    
    if @customer.profile.balance
      cashTotal = @total - @customer.profile.balance
      if cashTotal < 0
        cashTotal = 0
        balanceTotal = @total
      else
        balanceTotal = @total - cashTotal
    
    if @cash < cashTotal
      @cashError = "That's not enough cash sorry."
      return
        
    #double check math
    if balanceTotal + cashTotal == @total
      
      Meteor.users.update @customer._id,
        $inc: 'profile.balance': -balanceTotal
    
      Meteor.call "/admin/addFromCartToOrder", @customer._id, @items, 
        deliveryDay: moment().day(Meteor.settings.public.deliveryDayOfWeek).startOf('day').toDate()
        orderTotal: @total
        cardAmount: 0
        cashAmount: cashTotal
        balanceAmount: balanceTotal || 0
      , (err, success) =>
        if err
          console.error err
          @cashError = err.message
        unless err
          @change = @cash - cashTotal
          $mdToast.show $mdToast.simple().content("Cash Payment handled. Well done!").position('bottom left').hideDelay(4000)
          reset()
    else
      console.log('bad math')
      
  return
  


angular.module('food-coop').component 'pointOfSale',
  controller: PointOfSaleController
  templateUrl: 'client/admin/components/pos.ng.html'