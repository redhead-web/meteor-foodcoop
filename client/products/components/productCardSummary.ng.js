function ProductCardSummaryCtrl() {

  "ngInject";
  
  let vm = this;

  vm.priceWithMarkup =  (product) => Markup(product).total();
  
  vm.save = function() {
    vm.onUpdate({
      product: vm.product, 
      modifier: {
        $set: {
          published: vm.product.published, 
          stocklevel: vm.product.stocklevel
        }
      }
    });
  }

}


angular.module('food-coop').component('productSummaryCard', {
  templateUrl: 'client/products/components/product-card-summary.ng.html',
  controller: ProductCardSummaryCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
    onUpdate: '&'
  }
})