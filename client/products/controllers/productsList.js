angular.module("food-coop").controller("ProductsListCtrl", function($scope, $rootScope, $meteor, $mdDialog, $mdToast, $stateParams){

  $scope.stateParams = $stateParams;
  console.log($stateParams)

  $scope.helpers({
    products() {
      let query = {}
      options = {
        sort: $scope.sort || {name:1}
      };
      for(let key in $scope.stateParams) {
        if ($scope.stateParams[key] != null) {
          query[key] = $scope.stateParams[key]
        }
      }
      console.log($scope.stateParams)
      console.log(query);
      return Products.find(query, options)
    }

  })

  $scope.markup = Meteor.settings.public.markup/100 + 1;

});
