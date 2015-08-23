angular.module("food-collective").controller "subscribeCtrl", ($scope, $rootScope, $meteor, $state, subscription) ->
  $scope.name = "test"
  $scope.subscribe = subscribe
  $scope.subscription = subscription

  $meteor.call('generateClientToken').then (token) ->

    braintree.setup token, "dropin",
      container: "payment-form"
      onPaymentMethodReceived: $scope.subscribe
  , (err) ->
    console.log err

  subscribe = (obj) ->
  # start spinning wheel animation
  # confirm you will pay subscription.details.price * subscription.qty * 50/12
    $meteor.call('braintreeSubscription',
      price: $scope.subscription.details.price * 50 / 12
      qty: $scope.subscription.qty
      payment_method_nonce: obj.nonce
    ).then( (result) ->
      console.log result
      # Alert: everything went well!
      $state.go('.success')
    ), (err) ->

      console.log err
      $state.go('.failure')

    return
