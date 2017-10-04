import angular from 'angular';
import moment from 'moment-timezone';
import { Meteor } from 'meteor/meteor';

;

angular.module('food-coop').controller('UserSubscriptionCtrl', ($scope, $mdDialog, $meteor) => {
  // TODO: not MVP feature
  // $scope.pause = pause;
  // $scope.resume = resume;
  $scope.cancel = cancel;
  $scope.weeksRemaining = weeksRemaining;
  $scope.duration = duration;

  $scope.$meteorSubscribe('mySubscriptions').then((subscriptionHanle) => {
    $scope.subscriptions = $scope.$meteorCollection(Subscriptions);

    $scope.hasAP = _.pluck(_.where($scope.subscriptions, { ap: true }), 'ap')[0];
  });


  function cancel(item, ev) {
    $mdDialog.show({
      targetEvent: ev,
      templateUrl: 'client/user/views/cancel-subscription.ng.html',
      locals: { item },
      controller: cancelCtrl,
    });
    // meteor.call('cancelSubscription', item._id)
  }

  function weeksRemaining(end_date) {
    let end;
    if (end_date) {
      end = moment(end_date).startOf('day');
      let weeks = Math.abs(moment(end).diff(moment().startOf('day'), 'weeks'));
      if (weeks === 0) {
        weeks++;
      }
      return weeks;
    }
  }

  function duration(end_date, start_date) {
    const start = start_date || new Date();
    if (end_date) {
      return moment(start).to(end_date, true);
    } return 'continuous';
  }

  function cancelCtrl($scope, $mdDialog, item) {
    $scope.item = item;
    $scope.now = new Date();

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.ok = function () {
      item.status = 'cancelled';
      item.cancelled_date = new Date();
      if (item.subscriptionId) {
        $meteor.call('cancelSubscription', item.subscriptionId).then((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        });
      }
      $mdDialog.hide();
    };
  }
});
