angular.module("food-collective").controller("HubsListCtrl", function($scope, $meteor){
  $scope.hubs = $meteor.collection(Hubs);

  $scope.map = {
    center: {latitude:-35.7251117, longitude:174.323708},
    zoom: 10,
    mapOptions: {scrollwheel:false}
  };

  $scope.markerClick = markerClick;

  $scope.remove = function(product){
    $scope.hubs.remove(product);
  };
  $scope.removeAll = function(){
    $scope.hubs.remove();
  };

  function markerClick (mapMarker, event, markerObject) {
    markerObject.show = !markerObject.show;
    $scope.$apply()
  }
});
