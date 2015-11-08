angular.module("food-coop").controller "subscribeCtrl", ($scope, $rootScope, $meteor, $state) ->

  unless $rootScope.subscription
    $state.go('store')

  $scope.subscription = $rootScope.subscription

  $scope.total = $scope.subscription.productDetails.price * 50 / 12

  $meteor.call('generateClientToken').then (token) ->
    braintree.setup token, "dropin",
      container: "payment-form"
      onPaymentMethodReceived: subscribe
  , (err) ->
    console.log err

  subscribe = (obj) ->
  # start spinning wheel animation
    $scope.spinner = true
  # confirm you will pay subscription.details.price * subscription.qty * 50/12
    $meteor.call('braintreeSubscription',
      price: $scope.subscription.productDetails.price * 50 / 12
      qty: $scope.subscription.qty
      payment_method_nonce: obj.nonce
      subscription: $scope.subscription
    ).then (result) ->
      $scope.spinner = false
      console.log result
      # Alert: everything went well!
      $state.go('.success')
    , (err) ->
      $scope.spinner = false
      console.log err
      $state.go('.failure')

    return
