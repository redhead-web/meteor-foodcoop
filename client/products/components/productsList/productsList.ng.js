function ProductsListCtrl ($scope, $state, $stateParams, $reactive) {
  
  "ngInject";
  
  $reactive(this).attach($scope)

  this.go = $state.go;
  
  this.showGST = true;
  
  this.subscribe('categories');
  this.subscribe('producer', () => [this.getReactively('stateParams.producer')]);

  
  this.stateParams = angular.copy($stateParams);
  
  this.query = {
    category: $stateParams.category,
    producer: $stateParams.producer,
    filter: ''
  };
  
  if ($stateParams.producer) {
    this.producer = Meteor.users.findOne($stateParams.producer)
  }
  

  this.helpers({
    categories() {
      return Categories.find()
    },
    // products() {
    //   return Products.find()
    // }
  })
  
  this.options = {
    sort: {dateCreated: -1},
  };
  
  this.autorun( () => {
    if (this.stateParams.category) {
      this.selectedCategory = _.indexOf( _.pluck(Categories.find().fetch(), 'name'), this.stateParams.category) + 1;
    } else {
      this.selectedCategory = 0;
    }
  })
  

}


angular.module("food-coop").component("productsList", {
  controller: ProductsListCtrl,
  controllerAs: 'store',
  templateUrl: 'client/products/components/productsList/products-list.ng.html'
});
