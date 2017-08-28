/* globals GetNextDeliveryDay, Markup, Cart */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import templateUrl from './cart-view.ng.html';
import cartTable from '../cartTable/cartTable';
import checkoutFlow from '../checkoutFlow/checkoutFlow';
import { name as topUp } from '../topUp/topUp';

import { DeliverySettings } from '../../../api/deliverySettings';
import { Deliveries } from '../../../api/deliveries';

class CartViewCtrl {
  constructor($scope, $reactive, $mdToast, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.nextDeliveryDay = GetNextDeliveryDay().format();
    this.priceWithMarkup = item => Markup(item).total();
    this.totalWithMarkup = item => Markup(item).cartTotal();

    this.$stateGo = $state.go;
    this.$mdToast = $mdToast;

    // For deliveryForm
    this.subscribe('deliverySettings');
    this.subscribe('myDeliveries');

    this.helpers({
      deliveryOptions() {
        return DeliverySettings.find();
      },
      deliveries() {
        return Deliveries.find({ userId: Meteor.userId() });
      },
      // cart items
      items() {
        return Cart.Items.find({ userId: Meteor.userId() });
      },
    });

    this.autorun(() => {
      this.deliveryCount = Counts.get('myDeliveriesCount');
    });

    this.autorun(() => {
      const user = Meteor.user();
      const cartItems = Cart.Items.find({ userId: Meteor.userId() }).fetch();
      this.total = Markup(cartItems).cartTotal();
      if (this.getReactively('deliveryData.deliveryMethod')) {
        this.total += this.deliveryData.deliveryMethod.cost;
      }

      if (this.total) {
        let total = this.total;
        if (user.profile.balance > 0 && user.profile.balance < this.total) {
          total -= user.profile.balance;
        }
        this.fees = Meteor.settings.public.fees.FIXED + (total -
        (total * (1 - Meteor.settings.public.fees.PERCENT)));
      }

      this.cartLength = Cart.Items.find({ userId: Meteor.userId() }).count();
      if (user && user.profile && user.profile.balance > 0) {
        if (user.profile.balance < this.total) {
          this.totalWithBalance = (this.total + this.fees) - user.profile.balance;
        } else this.totalWithBalance = 0;
      }
    });
  }

  removeFromCart = (id) => {
    Cart.Items.remove(id);
  }

  changeQuantity(id, newQty, oldQty) {
    this.call('/cart/item/update', id, newQty, oldQty, (error) => {
      if (error) {
        console.log(error);
        this.$mdToast.show(
          this.$mdToast.simple()
          .content(error.message)
          .position('bottom right')
          .hideDelay(3000),
        );
      }
    });
  }

  checkoutSuccess() {
    this.$stateGo('checkoutSuccess');
  }
  addDelivery(data) {
    console.log(data);
    if (data.deliveryMethod !== '') {
      this.deliveryData = data;
    }
  }

  checkoutError(err) {
    this.err = err.message;
  }
}

const name = 'cartView';

export default angular.module(name, [cartTable.name, checkoutFlow.name, topUp]).component(name, {
  controller: CartViewCtrl,
  controllerAs: 'cart',
  templateUrl,
}).config(($stateProvider) => {
  'ngInject';

  $stateProvider.state('cart', {
    url: '/cart',
    template: '<cart-view></cart-view>',
  });
});
