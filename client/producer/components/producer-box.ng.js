angular.module('food-coop')
.directive("fcProducerBox", function($mdSidenav) {
  return {
    restrict: 'E',
    // transclude: true,
    scope: {producerId:'=producer'},
    controller: function($scope, $element, $window, $mdSidenav) {
      $scope.subscribe('producer', () => {
        return [$scope.getReactively('producerId')]
      })
      $scope.helpers({
        producer() {
          return Meteor.users.findOne( $scope.getReactively('producerId') )
        }
      })
			$scope.toggleLeft = function() {
				$mdSidenav('left-contacts').toggle()
			}
    },
    // replace: true,
    templateUrl: 'client/producer/template/producer-box.ng.html'
  }
})
