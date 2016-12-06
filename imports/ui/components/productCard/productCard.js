import angular from 'angular';
import templateUrl from './product-card.html';


function ProductCardCtrl() {
  'ngInject';
  this.priceWithMarkup = (product) => Markup(product).total();
}

const name = 'productCard';

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: ProductCardCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
  },
});
