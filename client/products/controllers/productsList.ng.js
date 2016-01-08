angular.module("food-coop").controller("ProductsListCtrl", function($scope, $state, $mdDialog, $mdToast, $stateParams, $log){

  $scope.go = $state.go;

  $scope.stateParams = angular.copy($stateParams);
  $log.info($stateParams);

  $scope.subscribe('categories');
  $scope.stateParams= $stateParams

  $scope.helpers({
    changeMe: "",
    sort: {name:1},

    products() {
      let change = $scope.changeMe;
      let query = {}
      options = {
        sort: $scope.sort
      };
      for(let key in $scope.stateParams) {
        if ($scope.stateParams[key] != null) {
          query[key] = $scope.stateParams[key]
        }
      }
      $log.info($scope.stateParams)
      return Products.find(query, options)
    },
    categories() {
      return Categories.find()
    }

  })

  $scope.markup = Meteor.settings.public.markup/100 + 1;

  $scope.querySearch   = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;

  function querySearch (query) {
    var results = query ? $scope.products.filter( createFilterFor(query) ) : $scope.products;
    $log.info(query);
    $log.info(results);
    return results;
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $state.go('productDetails', {productId: item._id})
  }
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(product) {
      return (product.name.toLowerCase().indexOf(lowercaseQuery) !== -1);
    };
  }

});
