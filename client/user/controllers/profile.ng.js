angular.module("food-collective").controller("ProfileCtrl", function($scope, $rootScope){
  $scope.upcomingSubscriptions = function(item) {
    if (item.status === 'active') {
      if (item.indefinate) return true
      return moment(item.end_date).startOf('day').isAfter(moment().startOf('day'))
    }
    return false
  };

  $scope.countdown = function () {
    var deliveryDay = moment().day($rootScope.currentUser.profile.hub.dayOfTheWeek)
    if (deliveryDay.isBefore(moment())) {
      deliveryDay.add(1, 'w')
    }
    return moment().to(deliveryDay);
  };
});
