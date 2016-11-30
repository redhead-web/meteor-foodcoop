templateUrl = require('./pos.ng.html');
braintreePayment = require '../braintreePayment/braintreePayment'

PointOfSaleController = ($scope, $reactive, $mdToast) ->
  "ngInject"

  $reactive(@).attach($scope)

  @subscribe 'user-list'
  @subscribe 'all-active-products'
  @subscribe 'cart-any-user', () => [@getReactively('customer._id')]

  @priceWithMarkup = (item) => Markup(item).total()
  @totalWithMarkup = (item) => Markup(item).cartTotal()

  @qty = 1;
  @status = 'collected'

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

  @braintreePayment = (data) =>
    if data && data.nonce
      deliveryData = @delivery;
      if deliveryData && deliveryData.deliveryMethod && deliveryData.deliveryMethod.$$hashKey
        delete deliveryData.deliveryMethod.$$hashKey;
        delete deliveryData.deliveryMethod.$$mdSelectId;

      @call('checkoutItems', data,
      deliveryData, @customer._id, @status,
      (err, result) =>
        if result
          $mdToast.show $mdToast.simple().content("Card Payment handled. Well done!").position('bottom left').hideDelay(4000)
          reset()
        else
          @cardError = err.message;
      );
    return


  @cashCheckout = () =>
    @change = @cash - @total
    @call 'checkoutItems', {type: "cash"}, null, @customer._id, @status, (err, result) =>
      if result
        $mdToast.show $mdToast.simple().content("Cash Payment handled. Well done!").position('bottom left').hideDelay(4000)
        reset()
      else
        @cashError = err.message

  return

name = "pointOfSale"

exports.module = angular.module(name, [braintreePayment.name]).component name,
  controller: PointOfSaleController
  templateUrl: templateUrl.default
