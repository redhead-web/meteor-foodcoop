angular.module("food-coop").controller("UserSalesCtrl", function($scope, $mdDialog, $meteor){
  var products, counts;
  $scope.deliveryDay = moment( GetDeliveryDay() ).format();

  $meteor.autorun($scope, function() {
    $meteor.subscribe('mySales', $scope.getReactively('deliveryDay'))
  });

  $scope.$meteorSubscribe('users').then(function() {
    $scope.user = function (sale) { return $meteor.object(Meteor.users, sale.customer, false); };
  });

  // $scope.product = function (product) { return $meteor.object(Products, product, false); };

  $scope.sales = $scope.$meteorCollection(Sales);


  $scope.occurrences = productsCount;

  $scope.forward = forward;

  $scope.backward = backward;

  $scope.total = total;

  $scope.deliveryWording = '';



  $scope.$watch('deliveryDay', function(newValue) {
    var isAfter = moment().isBefore(moment(newValue));
    if (isAfter) {
      return $scope.deliveryWording = "to be"
    } else {
      return $scope.deliveryWording = ""
    }
  })

  function total(array) {
    return _.reduce(array, function(total, sale) {
      return total + (sale.price * sale.qty);
    }, 0)
  }

  function forward() {
    $scope.deliveryDay = moment( $scope.deliveryDay ).add(1, 'weeks').format();
  }

  function backward() {
    $scope.deliveryDay = moment( $scope.deliveryDay ).subtract(1, 'weeks').format();
  }

  function productsCount (sales) {
    var occurences = {};
    _.each(sales, function(sale) {
      var name = sale.productName;
      if (occurences.hasOwnProperty(name)) {
        occurences[name] += sale.qty
      } else {
        occurences[name] = sale.qty
      }
    });

    return occurences;
  }

});
