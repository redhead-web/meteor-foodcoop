import angular from 'angular';
import templateUrl from './gst-list.ng.html';
import { Products } from '../../../api/products';

function gstListController($scope, $reactive) {
  'ngInject';
  $reactive(this).attach($scope);
  this.autorun(() => {
    this.product = Products.findOne(this.sale.productId);
  });
}

const name = 'gstList';

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: gstListController,
  bindings: {
    sale: '<',
  },
});
