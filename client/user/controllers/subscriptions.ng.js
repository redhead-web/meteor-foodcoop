angular.module("food-collective").controller("UserSubscriptionCtrl", function($scope, $mdDialog, $meteor){
  // TODO: not MVP feature
  // $scope.pause = pause;
  // $scope.resume = resume;
  $scope.cancel = cancel;
  $scope.weeksRemaining = weeksRemaining;
  $scope.duration = duration;

  $scope.$meteorSubscribe('mySubscriptions').then(function(subscriptionHanle) {
    $scope.subscriptions = $scope.$meteorCollection(Subscriptions)

    $scope.hasAP = _.pluck(_.where($scope.subscriptions, {ap:true}), 'ap')[0];

  });


  function cancel(item, ev) {

    $mdDialog.show({
      targetEvent: ev,
      templateUrl: 'client/user/views/cancel-subscription.ng.html',
      locals: {item: item},
      controller: cancelCtrl
    });
    // meteor.call('cancelSubscription', item._id)
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

  function duration (end_date, start_date) {
    var start = start_date || new Date();
    if (end_date) {
      return moment(start).to(end_date, true);
    } else return "continuous"
  }

  function cancelCtrl ($scope, $mdDialog, item) {
    $scope.item = item;
    $scope.now = new Date();

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.ok = function () {
      item.status = 'cancelled';
      item.cancelled_date = new Date();
      if (item.subscriptionId) {
        $meteor.call('cancelSubscription', item.subscriptionId).then(function(result) {
          console.log(result);
        }, function(err) {
          console.log(err);
        });
      }
      $mdDialog.hide();
    };

  }

});
