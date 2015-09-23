/* globals: angular, moment */
angular.module("food-collective").controller("OrdersAdminCtrl", function($scope, $rootScope, $meteor, $state){
  $scope.start = moment().startOf('week').format();
  $scope.end = moment().endOf('week').format();

  $scope.isActive = 'active';

  $meteor.autorun($scope, function() {
    $meteor.subscribe('orders', {
      sort: {'productDetails.name':1, status: -1}
    }, $scope.getReactively('start'), $scope.getReactively('end') )
    .then(function() {
      // $scope.orderCount = $meteor.object(Counts, 'filteredOrderCount',false);
    });
  });

  $scope.orders = $scope.$meteorCollection(function() {
    var query = {}
    , status = $scope.getReactively('isActive');

    if (status === 'active') {
      query = {status: $scope.getReactively('isActive')}
    }
    return Subscriptions.find(query, {
      sort: {'productDetails.name':1, status: -1}
    });
  });

  $scope.user = function (order) { return $meteor.object(Meteor.users, order.user, false); };

  $scope.hubs = $scope.$meteorCollection(Hubs).subscribe('hubs');
  $scope.hubFilter = '';

  $scope.lastweek = function() {
    $scope.start = moment($scope.start).subtract(1, 'weeks').format();
    $scope.end = moment($scope.end).subtract(1, 'weeks').format();
  };
  $scope.nextweek = function() {
    $scope.start = moment($scope.start).add(1, 'weeks').format();
    $scope.end = moment($scope.end).add(1, 'weeks').format();
  };

  $scope.filterByHub = filterByHub;

  $scope.occurences = productsCount;

  $scope.goTo = goTo;



  // function search (order) {
  //   if (!$scope.query) {
  //     return true;
  //   }
  //   if ( order.status.toLowerCase().indexOf($scope.query) !=-1 || order.productDetails.name.toLowerCase().indexOf($scope.query) !=-1 ) {
  //     return true;
  //   } return false;
  // }

// this filter may hurt performance significantly so may be better to have each
// hub have their own page and subscription using server-side helpers.

  function filterByHub (order) {
    if (!$scope.hubFilter) return true;
    if ($scope.user(order).profile.hub.location === $scope.hubFilter) {
      return true;
    } return false;
  }

  function productsCount (orders) {
    var occurences = {};
    _.each(orders, function(order) {
      var name = order.productDetails.name;
      if (occurences.hasOwnProperty(name)) {
        occurences[name] += order.qty
      } else {
        occurences[name] = order.qty
      }
    });

    return occurences;
  }

  function goTo (id) {
    $state.go('admin.order', {orderId: id});
  }


});
