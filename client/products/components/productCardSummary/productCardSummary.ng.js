function ProductCardSummaryCtrl() {

  "ngInject";
  

  this.priceWithMarkup =  (product) => Markup(product).total();
  
  this.save = () => {
    this.onUpdate({
      product: this.product, 
      modifier: {
        $set: {
          published: this.product.published, 
          stocklevel: this.product.stocklevel
        }
      }
    });
  }

}


angular.module('food-coop').component('productSummaryCard', {
  templateUrl: 'client/products/components/productCardSummary/product-card-summary.ng.html',
  controller: ProductCardSummaryCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
    onUpdate: '&'
  }
})