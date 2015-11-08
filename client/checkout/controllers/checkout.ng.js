angular.module("food-coop").controller("checkoutCtrl", function($scope, $rootScope, $meteor, $state, currentUser, token){
  var nonce = ""
  //Meteor.users.update({_id: Meteor.user()._id}, {$set: {'profile.cart.status':'pending'}}, {validate: false})
  $scope.total = 0;

  braintree.setup(token, "dropin", {
    container: "payment-form",
    onPaymentMethodReceived: checkout
  });

  function checkout (obj) {
    var subscriptions, items, data = {}, confirm;
    data.payment_method_nonce = nonce = obj.nonce
    //determine whether to create a subscription or just a regular transaction

    items = _.filter($rootScope.currentUser.profile.cart.products, function(product) {
      return moment().isBefore(moment(product.end_date).startOf('day')) && !product.indefinate;
    });

    if (items.length > 0) {
      data.total = _.reduce(items, function(total, item) {
        return total + (item.details.price * item.qty * weeksRemaining(item.end_date));
      }, 0);
      // start spinning wheel animation
      $meteor.call('braintreeTransaction', data).then(function(result) {
        if (result.success) {
          $state.go('.success')
        } else {
          console.log(result);
          // display error details to the user and get them to try again
        }
        // end spinning wheel animation
      })
    }
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

  (function countTotal() {
    var start, end;
    $scope.total = 0;
    angular.forEach($rootScope.currentUser.profile.cart.products,
      function(item) {
        if ( moment().isBefore(item.end_date) || !item.indefinate ) {
          start = moment(item.start_date).startOf('day');
          end = moment(item.end_date).startOf('day');
          $scope.total += item.details.price * item.qty * weeksRemaining(end);
        } else if (item.indefinate) {
          //IDEA: charge each month for an indefinate item so when added to the
          // cart it should add on for 50 weeks / 12
          $scope.total += item.details.price * item.qty * (50/12); // 50 weeks a year / 12 payments
        }
      }
    );
  })();



});
