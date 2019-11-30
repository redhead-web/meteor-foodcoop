import angular from 'angular';
import template from './gst-list.ng.html';
import { Products } from '../../../api/products';

function gstListController($scope, $reactive) {
  'ngInject';
  $reactive(this).attach($scope);
  this.autorun(() => {
    this.product = Products.findOne(this.sale.productId);
  });
}

export const name = 'gstList';

export default angular.module(name, []).component(name, {
  template,
  controller: gstListController,
  bindings: {
    sale: '<',
  },
});
