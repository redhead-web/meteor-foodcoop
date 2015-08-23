angular.module("food-collective").controller("UserSubscriptionCtrl", function($scope){
  // TODO: not MVP feature
  // $scope.pause = pause;
  // $scope.resume = resume;
  $scope.cancel = cancel;
  $scope.weeksRemaining = weeksRemaining;
  $scope.duration = duration;

  $scope.subscriptions = $scope.$meteorCollection(Subscriptions).subscribe('mySubscriptions')

  function cancel(item) {
    meteor.call('cancelSubscription', item._id)
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
    if (end_date) {
      return moment(start_date).to(end_date, true);
    } else return "indefinate"
  }
});
