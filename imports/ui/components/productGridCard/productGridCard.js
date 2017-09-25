import angular from 'angular';
import templateUrl from './productGridCard.html';

const name = 'productGridCard';


export default angular.module(name, []).component(name, {
  templateUrl,
  bindings: {
    product: '<',
  },
});
