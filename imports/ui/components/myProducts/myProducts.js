/* globals GetNextDeliveryDay */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Products } from '../../../api/products';

import template from './myProducts.html';

class MyProductsCtrl {
  constructor($scope, $reactive, $mdDialog, $mdToast) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('my-products');

    const deliveryDay = GetNextDeliveryDay().format();

    this.subscribe('mySales', () => [deliveryDay]);

    this.sort = [['published', 'desc'], 'name', 'unitOfMeasure'];

    this.helpers({
      products() {
        return Products.find({ $or: [{ producer: Meteor.userId() }, { adminControl: true }] }, { sort: this.getReactively('sort') });
      },
    });

    this.save = (product, modifier) => {
      Products.update(product._id, modifier, (err, result) => {
        if (err) {
          console.error(err);
          $mdToast.simple().content(err.message).position('bottom right').hideDelay(3000);
        } else if (!result) {
          $mdToast.simple().content('sorry, update not saved. Check your connection and try again.').position('bottom right').hideDelay(3000);
        }
        console.log(result);
      });
    };
  }

}

export const name = 'myProducts';

export default angular.module(name, [])
.component(name, {
  controller: MyProductsCtrl,
  template,
})
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('myProducts', {
      url: '/my-products',
      template: '<my-products></my-products>',
    });
});
