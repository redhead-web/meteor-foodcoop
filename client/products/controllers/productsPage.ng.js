angular.module("food-coop").controller("ProductsPageCtrl", function($scope, $state, $mdDialog, $mdToast, $stateParams, $reactive){

  $reactive(this).attach($scope)

  this.go = $state.go;

  this.subscribe('categories');
  this.stateParams= $stateParams

  this.helpers({
    products() {
      return Products.find()
    },
    categories() {
      return Categories.find()
    }
  })

  this.markup = Meteor.settings.public.markup/100 + 1;

  this.querySearch   = querySearch;
  this.selectedItemChange = selectedItemChange;
  this.searchTextChange   = searchTextChange;

  this.show = show;

  function querySearch (query) {
    var results = query ? this.products.filter( createFilterFor(query) ) : this.products;
    return results;
  }
  function searchTextChange(text) {
    console.log('Text changed to ' + text);
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

  return this;

});
