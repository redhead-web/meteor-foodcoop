/* globals: angular, moment */
angular.module("food-coop").controller("OrdersAdminCtrl", function($scope, $rootScope, $meteor, $state){

  $scope.deliveryDay = moment( GetDeliveryDay() ).format();

  $scope.isActive = 'active';

  $scope.subscribe('orders', () => {
    return [$scope.getReactively('deliveryDay')]
  })

  $scope.helpers({
    orders: () => Sales.find(),
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

  $scope.user = function (id) {
    return Meteor.users.findOne(id);
  };

  $scope.lastweek = function() {
    $scope.deliveryDay = moment($scope.deliveryDay).subtract(1, 'weeks').format();
  };
  $scope.nextweek = function() {
    $scope.deliveryDay = moment($scope.deliveryDay).add(1, 'weeks').format();
  };

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

  function productsCount (orders) {
    var occurences = {};
    _.each(orders, function(order) {
      var name = order.productName;
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
