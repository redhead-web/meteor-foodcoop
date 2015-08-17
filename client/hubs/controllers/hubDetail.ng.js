angular.module("food-collective").controller("HubDetailsCtrl", function($scope, $stateParams){
  $scope.hub = $scope.$meteorObject(Hubs, $stateParams.hubId);

});
