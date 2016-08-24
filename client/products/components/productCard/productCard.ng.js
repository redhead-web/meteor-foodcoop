function ProductCardCtrl($scope, $reactive) {

  "ngInject";

  this.priceWithMarkup =  (product) => Markup(product).total();

}


angular.module('food-coop').component('productCard', {
  templateUrl: 'client/products/components/productCard/product-card.ng.html',
  controller: ProductCardCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
  }
})