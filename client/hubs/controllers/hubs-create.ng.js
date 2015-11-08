angular.module("food-collective").controller("HubCreateCtrl", function($scope, $stateParams, $state){
  $scope.newHub = {}

  $scope.hubs = $scope.$meteorCollection(Hubs);

  $scope.save = save;

  function save(hub) {
    //TODO: confirm insert allow rules exist for hubs
    $scope.hubs.save(hub);
    $state.go('hubs')
  }

});
