/* globals Markup, Sales */
import angular from 'angular';
import templateUrl from './product-card-summary.html';

class ProductCardSummaryCtrl {
  constructor() {
    'ngInject';

    this.priceWithMarkup = product => Markup(product).total();

    this.save = () => {
      this.onUpdate({
        product: this.product,
        modifier: {
          $set: {
            published: this.product.published,
            stocklevel: this.product.stocklevel,
          },
        },
      });
    };

    this.cartedAmount = (cartedArray = []) =>
     cartedArray.reduce((total, carted) => total + carted.qty, 0);

    this.salesAmount = productId => Sales.find({ productId }).fetch()
      .reduce((total, sale) => total + sale.qty, 0);
  }
}

const name = 'productCardSummary';

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: ProductCardSummaryCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
    onUpdate: '&',
  },
});
