// subscription: myPurchases
import moment from 'moment';

angular.module('food-coop').controller('UserOrderCtrl', ($scope, $mdDialog, $meteor) => {
  if (moment().day() == Meteor.settings.public.deliveryDayOfWeek) {
    $scope.deliveryDay = moment().startOf('day').format();
  } else {
    $scope.deliveryDay = GetNextDeliveryDay().format();
  }

  $scope.subscribe('myPurchases', () => [$scope.getReactively('deliveryDay')]);

  $scope.totalWithMarkup = sale => Markup(sale).saleTotal();
  $scope.priceWithMarkup = sale => Markup(sale).total();


  $scope.helpers({
    orders: () => Sales.find(),
  });

  $scope.forward = forward;

  $scope.backward = backward;

  $scope.total = array => Markup(array).saleTotal();

  $scope.deliveryWording = '';

  $scope.$watch('deliveryDay', (newValue) => {
    const isAfter = moment().startOf('day').isBefore(moment(newValue)) || moment().isSame(moment(newValue), 'day');
    if (isAfter) {
      return $scope.deliveryWording = 'Pick up';
    }
    return $scope.deliveryWording = '';
  });

  function forward() {
    $scope.deliveryDay = moment($scope.deliveryDay).add(1, 'weeks').format();
  }

  function backward() {
    $scope.deliveryDay = moment($scope.deliveryDay).subtract(1, 'weeks').format();
  }
});
