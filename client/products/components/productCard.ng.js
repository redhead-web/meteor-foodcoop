function ProductCardCtrl($scope, $reactive) {

  "ngInject";

  this.markup =  Meteor.settings.public.markup/100 + 1;

}


angular.module('food-coop').component('productCard', {
  templateUrl: 'client/products/components/product-card.ng.html',
  controller: ProductCardCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
  }
})