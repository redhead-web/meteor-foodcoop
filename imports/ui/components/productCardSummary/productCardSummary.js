import angular from 'angular';
import templateUrl from './product-card-summary.html';

class ProductCardSummaryCtrl {
  constructor() {
    'ngInject';

    this.priceWithMarkup = (product) => Markup(product).total();

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
