import angular from 'angular';
import template from './productGridCard.html';

export const name = 'productGridCard';


export default angular.module(name, []).component(name, {
  template,
  bindings: {
    product: '<',
  },
});
