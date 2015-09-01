angular.module("food-collective").controller "OrderAdminCtrl", ($scope, $meteor, $stateParams) ->

  $scope.order = $scope.$meteorObject Subscriptions, $stateParams.orderId, false

  transactionId = $scope.order.getRawObject().transactionId

  getUser = (order) ->
    $scope.user = $meteor.object Meteor.users, order.user, false

  getUser($scope.order)

  $meteor.call('getTransaction', transactionId).then (transaction) ->
    $scope.transaction = transaction
    return
  , (e) ->
    console.log e

  return
