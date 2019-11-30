import angular from 'angular';
import template from './search.html';

import { name as productGridCard } from '../../components/productGridCard/productGridCard';

import { Products } from '../../../api/products';

class SearchContainerCtrl {
  constructor($scope, $rootScope, $reactive, $stateParams, $location) {
    'ngInject';

    $reactive(this).attach($scope);

    this.search = $stateParams.q;

    $scope.$watch(() => this.search, (newValue) => {
      $location.search('q', newValue);
    });

    const options = { limit: 30, sort: { name: 1, producerName: 1, price: 1 } };
    this.subscribe('product-search', () => [this.getReactively('search'), options]);

    this.helpers({
      products() {
        const searchString = this.getReactively('search');
        const query = { published: true };
        if (searchString && searchString.length) {
          query.$or = [
            { name: { $regex: `^${searchString}.*`, $options: 'i' } },
            { producerName: { $regex: `^${searchString}.*`, $options: 'i' } },
          ];
        }
        return Products.find(query, options);
      },
    });
  }
}

export const name = 'searchContainer';

export default angular.module(name, [productGridCard]).component(name, {
  controller: SearchContainerCtrl,
  controllerAs: '$ctrl',
  template,
}).config(($stateProvider) => {
  'ngInject';

  $stateProvider.state('search', {
    url: '/search?q',
    reloadOnSearch: false,
    template: '<search-container></search-container>',
  });
});
