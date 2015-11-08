angular.module("food-coop").controller("HubsListCtrl", function($scope, $rootScope, $meteor, $mdToast){
  var mapProperties;
  $scope.hubs = $meteor.collection(Hubs, false);

  // $scope.hubs = angular.extend($scope.hubs, mapProperties);

  $scope.map = {
    center: {latitude:-35.7251117, longitude:174.323708},
    zoom: 10,
    mapOptions: {scrollwheel:false},
    markersEvents: {
      click: function(gMarker, eventName, model) {
        $scope.map.window.model = model;
        $scope.map.window.show = true;
      }
    },
    window: {
      templateUrl: 'client/hubs/views/map-window.ng.html',
      marker: {},
      show:false,
      closeClick: function() {
        this.show = false;
      },
      options: {
        pixelOffset: {width:0, height: -15}
      } // define when map is ready
    }
  };

  $scope.joinHub = joinHub

  $scope.remove = function(product){
    $scope.hubs.remove(product);
  };

  // TO DANGEROUS THIS CLOSE TO PRODUCTION
  // $scope.removeAll = function(){
  //   $scope.hubs.remove();
  // };

  function joinHub (hub) {
    var hubObject = {
      id: hub._id,
      title: hub.title,
      location: hub.location,
      dayOfTheWeek: hub.dayOfTheWeek,
      openHours: hub.openHours
    };
    Meteor.users.update({_id:Meteor.user()._id}, {$set: {'profile.hub': hubObject}}, function(error) {
      if (error) {
        $scope.error = error;
      } else {
        $mdToast.show($mdToast
          .simple().content('Joined Hub')
          .position('top right')
          .hideDelay(3000))
      }
    })
  }

})
