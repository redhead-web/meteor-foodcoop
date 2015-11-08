angular.module("food-coop").controller("UserCartCtrl", function($scope, $rootScope, $meteor){
  $scope.total = 0;
  $scope.countTotal = countTotal;
  $scope.removeFromCart = removeFromCart;
  $scope.weeksRemaining = weeksRemaining;
  $scope.timeRemaining = timeRemaining;
  $scope.changeQuantity = changeQuantity;

  function countTotal() {
    var start, end;
    $scope.total = 0;
    angular.forEach($rootScope.currentUser.profile.cart.products,
      function(item) {
        if ( moment().isBefore(item.end_date) || !item.indefinate ) {
          start = moment(item.start_date).startOf('day');
          end = moment(item.end_date).startOf('day');
          $scope.total += item.details.price * item.qty * weeksRemaining(item.end_date);
        } else if (item.indefinate) {
          //IDEA: charge each month for an indefinate item so when added to the
          // cart it should add on for 50 weeks / 12
          $scope.total += item.details.price * item.qty * (50/12); // 50 weeks a year / 12 payments
        }
      }
    );
  }

  function removeFromCart(id) {
    $meteor.call('removeFromCart', id)
    .then(countTotal);
  }

  function timeRemaining (end_date) {
    if (end_date) {
      return moment(end_date).fromNow(true);
    } else return "indefinate"
  }

  function weeksRemaining (end_date) {
    var end;
    if (end_date) {
      end = moment(end_date).startOf('day');
      var weeks = Math.abs(moment(end).diff(moment().startOf('day'), 'weeks'))
      if (weeks === 0) {
        weeks++;
      }
      return weeks;
    }
  }

  function changeQuantity (qty, id) {
    countTotal();
    $meteor.call('updateCartQty', qty, id)
    .then(countTotal, function(error) {
      console.log(error);
    });
  }

  countTotal();

});
