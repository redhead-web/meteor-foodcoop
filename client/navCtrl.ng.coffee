angular.module("food-collective").controller('navCtrl', function ($scope, $timeout, $mdSidenav, $log, $state) {
    $scope.go = $state.go

    $scope.close = ->
      $mdSidenav('left').close()
        .then ->
          $log.debug "close LEFT is done"
