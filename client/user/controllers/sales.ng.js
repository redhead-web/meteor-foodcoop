angular.module("food-coop").controller("UserSalesCtrl", function($scope, $mdDialog){
  var products, counts;
  
  
  if ( moment().day() == Meteor.settings.public.deliveryDayOfWeek ) {
    $scope.deliveryDay = moment().startOf('day').format();
  } else {
    $scope.deliveryDay = GetNextDeliveryDay().format();
  }
  
  $scope.subscribe('mySales', () => [$scope.getReactively('deliveryDay')])

  $scope.helpers({
    sales() {
      return Sales.find()
    }
  })

  $scope.occurrences = productsCount;

  $scope.forward = forward;

  $scope.backward = backward;

  $scope.total = total;

  $scope.deliveryWording = '';



  $scope.$watch('deliveryDay', function(newValue) {
    var isAfter = moment().isBefore(moment(newValue)) || moment().isSame(moment(newValue), 'day');
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
