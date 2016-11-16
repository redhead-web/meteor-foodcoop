import angular from 'angular';

import templateUrl from './productDetails.html';

import fcImgUpload from '../fcImgUpload/fcImgUpload';

import { Products } from '../../../api/products';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/stevezhu:lodash';

class ProductDetailsController {
  constructor($scope, $stateParams, $mdConstant, $reactive, $mdToast) {
    'ngInject';
    $reactive(this).attach($scope);

    this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

    this.priceWithMarkup = (product) => Markup(product).total();

    this.edit = {
      name: false,
      price: false,
      unitOfMeasure: false,
      stocklevel: false,
      description: false,
      packagingDescription: false,
      packagingRefund: false,
    };

    this.subscribe('product', () => [$stateParams.productId]);

    this.helpers({
      product() {
        return Products.findOne($stateParams.productId);
      },
    });

    this.autorun(() => {
      if (Meteor.userId() && this.getReactively('product._id') != null) {
        if (Meteor.userId() === this.getReactively('product.producer')) {
          this.isOwner = Meteor.userId();
        } else if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
          this.isOwner = Meteor.userId();
        } else {
          this.isOwner = undefined;
        }
      }
    });

    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        default: 400,
        blur: 0,
      },
    };

    this.simpleToast = (message) => {
      $mdToast.simple().content(message).position('bottom left').hideDelay(3000);
    };

    this.daysNotice = [];

    for (let i = 0; i < 14; i++) {
      this.daysNotice.push({
        value: i,
        name: `${moment().day(Meteor.settings.public.deliveryDayOfWeek).subtract(i, 'days').format('dddd')} -- ${i} days notice`,
      });
    }
  }

  orderDate(cutoffDays) {
    return GetProductDeliveryDay(cutoffDays).format();
  }

  imgUploadSuccess(data) {
    this.product.img = {
      url: data.data.secure_url,
      result: data.data.public_id,
    };
    this.save('img', this.product.img, 'imgSaved');
  }

  imgUploadError(err) {
    console.log(err);
  }

  deleteImg() {
    Products.update(this.product._id, { $unset: { img: 1 } });
  }

  cartedCount() {
    return _.sum(this.product.carted, 'qty');
  }

  save(field, value, savedFlag) {
    const update = { $set: {} };
    update.$set[field] = value;
    Products.update(this.product._id, update, (err, result) => {
      if (err) {
        console.error(err);
        this.simpleToast(err.message);
      } else if (!result) {
        this.simpleToast('sorry, update not saved. Check your connection and try again.');
      }
      this[savedFlag] = true;
    });
  }

}
const name = 'productDetails';

export default angular.module(name, [fcImgUpload.name]).component(name, {
  templateUrl,
  controller: ProductDetailsController,
  controllerAs: name,
}).config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state('productDetails', {
    url: '/product/:productId',
    template: '<product-details></product-details>',
  });
});
