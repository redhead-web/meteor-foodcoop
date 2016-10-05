import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/stevezhu:lodash';
import templateUrl from './productsList.html';

import { Categories } from '../../../api/categories';

import productCards from '../productCards/productCards';

function ProductsListCtrl($scope, $state, $stateParams, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  this.go = $state.go;

  this.showGST = true;

  this.subscribe('categories');
  this.subscribe('producer', () => [this.getReactively('stateParams.producer')]);


  this.stateParams = angular.copy($stateParams);

  this.query = {
    category: $stateParams.category,
    producer: $stateParams.producer,
    filter: '',
  };

  if ($stateParams.producer) {
    this.producer = Meteor.users.findOne($stateParams.producer);
  }


  this.helpers({
    categories() {
      return Categories.find();
    },
    // products() {
    //   return Products.find()
    // }
  });

  this.options = {
    sort: { dateCreated: -1 },
  };
  this.sortName = 'Newest';

  this.autorun(() => {
    if (this.stateParams.category) {
      this.selectedCategory = _.indexOf(_.pluck(Categories.find().fetch(), 'name'), this.stateParams.category) + 1;
    } else {
      this.selectedCategory = 0;
    }
  });
}
const name = 'productsList';

export default angular.module(name, [
  uiRouter,
  productCards.name,
]).component(name, {
  controller: ProductsListCtrl,
  controllerAs: 'store',
  templateUrl,
}).config(($stateProvider) => {
  'ngInject';
  $stateProvider
  .state('store', {
    url: '/?name&certification&producer&search&category',
    template: '<products-list></products-list>',
  });
});
