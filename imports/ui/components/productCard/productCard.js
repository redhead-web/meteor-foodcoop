import angular from 'angular';
import template from './product-card.html';


function ProductCardCtrl() {
  'ngInject';
  this.priceWithMarkup = (product) => Markup(product).total();
}

export const name = 'productCard';

export default angular.module(name, []).component(name, {
  template,
  controller: ProductCardCtrl,
  controllerAs: 'card',
  bindings: {
    product: '<',
  },
});
