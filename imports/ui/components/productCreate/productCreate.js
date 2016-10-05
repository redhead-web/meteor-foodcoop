import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/stevezhu:lodash';
import { Roles } from 'meteor/alanning:roles';
import fcImgUpload from '../fcImgUpload/fcImgUpload';

import templateUrl from './productCreate.html';

import { Products } from '../../../api/products';
import { Categories } from '../../../api/categories';

class ProductCreateController {
  constructor($scope, $reactive, $mdConstant, $mdToast, $mdDialog) {
    'ngInject';
    $reactive(this).attach($scope);

    this.$mdToast = $mdToast;

    this.$mdDialog = $mdDialog;
    this.hasRole = Roles.userIsInRole;

    this.subscribe('categories-and-certifications');
    this.subscribe('list-of-producers');
    this.helpers({
      categories() {
        return Categories.find();
      },
      certifications() {
        return Certifications.find();
      },
      producers() {
        return Meteor.users.find();
      },
    });

    this.daysNotice = [];

    for (let i = 0; i < 14; i++) {
      this.daysNotice.push({
        value: i,
        name: `${moment()
        .day(Meteor.settings.public.deliveryDayOfWeek)
        .subtract(i, 'days')
        .format('dddd')} -- ${i} days notice`,
      });
    }

    this.markup = Meteor.settings.public.markup;

    // initialize product
    this.product = {
      producer: Meteor.userId(),
      published: true,
      producerName: Meteor.user().profile.name,
      producerCompanyName: Meteor.user().profile.companyName || undefined,
      category: '',
      ingredients: [],
    };

    this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

    this.unitsOfMeasure = 'L,litre,ml,500ml,g,kg,500g,5kg,10kg,25kg,bag,150g bunch,bunch,head,each,can,jar,container,330ml Bottle,750ml Bottle'.split(',');
  }

  getUnitsOfMeasure(query) {
    const results = query ? this.unitsOfMeasure.filter(this.createFilterFor(query)) : this.unitsOfMeasure;
    return results;
  }

  categorySearch(query) {
    const results = query ? this.categories.filter(this.createFilterForCategory(query)) : this.categories;
    return results;
  }

  pluckChip(chip) {
    if (angular.isObject(chip)) {
      return chip.name;
    } return chip;
  }

  getProducers(query) {
    return Meteor.users.find({
      $or: [
        { 'profile.name': { $regex: `.*${query}`, $options: 'i' } },
        { 'profile.companyName': { $regex: `.*${query}`, $options: 'i' } },
      ],
    }).fetch();
  }

  selectedItemChange(item) {
    if (Match.test(item, Object)) {
      this.product.producer = item._id;
      this.product.producerName = item.profile.name;
      this.product.producerCompanyName = item.profile.companyName;
    }
  }

  round(prop, value, model) {
    if (model === 'price' && !this.product.price) {
      this[prop] = undefined;
    } else if (model === 'priceWithMarkup' && !this[model]) {
      this.product.price = undefined;
    }

    if (!this[prop]) {
      this[prop] = 0;
    }
    if (value) {
      const val = _.round(value, 2);
      if (prop === 'price') {
        this.product[prop] = val;
      } else {
        this[prop] = val;
      }
    }
  }

  createFilterFor(query) {
    const lowercaseQuery = angular.lowercase(query);
    return function filterFn(string) {
      return (string.toLowerCase().indexOf(lowercaseQuery) === 0);
    };
  }

  createFilterForCategory(query) {
    const lowercaseQuery = angular.lowercase(query);
    return function filterFn(object) {
      return (object.name.toLowerCase().indexOf(lowercaseQuery) === 0);
    };
  }

  reset(product) {
    this.product = {
      producer: product.producer || Meteor.userId(),
      published: true,
      producerName: product.producerName || Meteor.user().profile.name,
      producerCompanyName: product.producerCompanyName || Meteor.user().profile.companyName || undefined,
      category: '',
      ingredients: [],
    };
  }

  insert() {
    Products.insert(this.product, (err, id) => {
      if (err) {
        console.error(err);
        return this.$mdToast.show(
          this.$mdToast
          .simple()
          .content(err.message)
          .position('bottom left')
          .hideDelay(4000)
        );
      }

      if (id) {
        this.productIdCopy = id;
      }

      this.$mdToast.show(
        this.$mdToast.simple()
        .content(`Thank you! ${this.product.name} successfully added to our store. Add another product?`)
        .action('YES')
        .highlightAction(false)
        .position('bottom left')
      ).then((response) => {
        if (response === 'ok') {
          this.reset(this.product);
        }
      });
      return null;
    });
  }

  save(ev) {
    if (this.productIdCopy) {
      const c = this.$mdDialog.confirm()
        .title('Create or Update?')
        .textContent('Would you like to make a new product?')
        .ariaLabel('create or update')
        .targetEvent(ev)
        .ok('Create New Product')
        .cancel('Update the product');
      this.$mdDialog.show(c).then(() => {
        this.insert();
      }, () => {
        Products.update(this.productIdCopy, { $set: this.product }, (err, count) => {
          if (err) {
            console.error(err);
          } if (count !== 1) {
            console.log('update failed');
          } else {
            this.$mdToast.show(
              this.$mdToast.simple()
              .content(`Thank you! ${this.product.name} successfully updated`)
              .position('bottom left')
            );
          }
        });
      });
    } else {
      this.insert();
    }
  }
}

const name = 'productCreate';

export default angular.module(name, [fcImgUpload.name])
.component(name, {
  templateUrl,
  controllerAs: 'ctrl',
  controller: ProductCreateController,
})
.config(($stateProvider) => {
  'ngInject';

  function rolePromise($q, r) {
    return $q((resolve, reject) => {
      const role = Roles.userIsInRole(Meteor.userId(), r);
      if (role) {
        resolve(role);
      } else {
        reject('FORBIDDEN');
      }
    });
  }

  $stateProvider
  .state('productCreate', {
    url: '/new-product',
    template: '<product-create></product-create>',
    controller: ProductCreateController,
    controllerAs: 'ctrl',
    resolve: {
      currentUser($q) {
        return rolePromise($q, 'producer');
      },
    },
  });
});
