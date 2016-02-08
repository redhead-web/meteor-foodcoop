angular.module('food-coop')
.directive("fcProducerBox", function() {
  return {
    restrict: 'E',
    // transclude: true,
    scope: {producerId:'=producer'},
    controller: function($scope, $element, $window) {
      $scope.subscribe('producer', () => {
        return [$scope.getReactively('producerId')]
      })
      $scope.helpers({
        producer() {
          return Meteor.users.findOne( $scope.getReactively('producerId') )
        }
      })
    },
    // replace: true,
    templateUrl: 'client/producer/template/producer-box.ng.html'
  }
})
