import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Products } from '../../../imports/api/products';

angular.module('food-coop').controller('MyProductsCtrl', function ($scope, $reactive, $mdDialog, $mdToast) {
  'ngInject';

  $reactive(this).attach($scope);

  this.subscribe('my-products');

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
        $mdToast.simple().content(err.message).position('bottom left').hideDelay(3000);
      } else if (!result) {
        $mdToast.simple().content('sorry, update not saved. Check your connection and try again.').position('bottom left').hideDelay(3000);
      }
      console.log(result);
    });
  };
});
