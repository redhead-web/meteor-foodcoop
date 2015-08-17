angular.module("food-collective").controller("HubsListCtrl", function($scope, $meteor){
  $scope.hubs = $meteor.collection(Hubs);

  $scope.markerClick = markerClick;

  $scope.remove = function(product){
    $scope.hubs.remove(product);
  };
  $scope.removeAll = function(){
    $scope.hubs.remove();
  };

  function markerClick (mapMarker, event, markerObject) {
    markerObject.show = !markerObject.show;
  }
});
