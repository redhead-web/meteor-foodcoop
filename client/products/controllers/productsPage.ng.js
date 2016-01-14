angular.module("food-coop").controller("ProductsPageCtrl", function($scope, $state, $mdDialog, $mdToast, $stateParams, $log){

  $scope.go = $state.go;

  $scope.stateParams = angular.copy($stateParams);

  $scope.subscribe('categories');
  $scope.stateParams= $stateParams

  $scope.helpers({
    products() {
      return Products.find()
    },
    categories() {
      return Categories.find()
    }
  })


  $scope.markup = Meteor.settings.public.markup/100 + 1;

  $scope.querySearch   = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;

  $scope.show = show;

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

  function show(category) {
    if (category === 'all') {
      $state.go('store');
    } else $state.go('store.category', {category: category})
  }

});
