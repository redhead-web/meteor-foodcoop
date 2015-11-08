angular.module("food-coop").controller("HubDetailsCtrl", function($scope, $stateParams){
  $scope.hub = $scope.$meteorObject(Hubs, $stateParams.hubId);

});
