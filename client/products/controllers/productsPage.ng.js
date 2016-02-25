angular.module("food-coop").controller("ProductsPageCtrl", function($scope, $state, $mdDialog, $mdToast, $stateParams, $reactive){

  $reactive(this).attach($scope)

  this.go = $state.go;
  
  this.showGST = true;

  this.subscribe('categories');
  this.stateParams = angular.copy($stateParams);
  
  this.query = {
    category: this.stateParams.category,
    producer: this.stateParams.producer
  };
    
  this.subscribe('producer', () => [this.getReactively('stateParams.producer')]);

  this.helpers({
    // producer() {
//       if (this.getReactively('stateParams.producer')) {
//         return Meteor.users.findOne($stateParams.producer)
//       }
//     },
    categories() {
      return Categories.find()
    }
  })

  this.markup =  Meteor.settings.public.markup/100 + 1;

  this.querySearch   = querySearch;
  this.selectedItemChange = selectedItemChange;
  this.searchTextChange   = searchTextChange;
  
  this.autorun( () => {
    if (this.stateParams.category) {
      this.selectedCategory = _.indexOf( _.pluck(Categories.find().fetch(), 'name'), this.stateParams.category) + 1;
    } else {
      this.selectedCategory = 0;
    }
  })
  
  
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

  return this;

});
