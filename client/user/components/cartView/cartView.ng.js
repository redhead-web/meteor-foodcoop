/* globals angular, GetNextDeliveryDay, Markup, Cart */

import { Meteor } from 'meteor/meteor';

class UserCartCtrl {
  constructor($scope, $reactive, $mdToast, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.nextDeliveryDay = GetNextDeliveryDay().format();
    this.priceWithMarkup = (item) => Markup(item).total();
    this.totalWithMarkup = (item) => Markup(item).cartTotal();

    this.$stateGo = $state.go;
    this.$mdToast = $mdToast;

    this.helpers({
      items() {
        return Cart.Items.find({ userId: Meteor.userId() });
      },
    });

    this.autorun(() => {
      const user = Meteor.user();
      const cartItems = Cart.Items.find({ userId: Meteor.userId() }).fetch();
      this.total = Markup(cartItems).cartTotal();
      if (this.getReactively('deliveryData.deliveryMethod')) {
        this.total += this.deliveryData.deliveryMethod.cost;
      }
      this.cartLength = Cart.Items.find({ userId: Meteor.userId() }).count();
      if (user && user.profile && user.profile.balance > 0) {
        if (user.profile.balance < this.total) {
          this.totalWithBalance = this.total - user.profile.balance;
        } else this.totalWithBalance = 0;
      }
    });
  }
  removeFromCart(id) {
    Cart.Items.remove(id);
  }

  changeQuantity(id, newQty, oldQty) {
    this.call('/cart/item/update', id, newQty, oldQty, (error) => {
      if (error) {
        console.log(error);
        this.$mdToast.show(
          this.$mdToast.simple()
          .content(error.message)
          .position('bottom left')
          .hideDelay(3000)
        );
      }
    });
  }

  checkoutSuccess(data) {
    console.log(data);
    if (data && data.nonce) {
      const deliveryData = this.deliveryData;
      if (deliveryData && deliveryData.deliveryMethod && deliveryData.deliveryMethod.$$hashKey) {
        delete deliveryData.deliveryMethod.$$hashKey;
        delete deliveryData.deliveryMethod.$$mdSelectId;
      }
      this.call('checkoutItems', data,
      this.deliveryData, Meteor.userId(), 'undelivered',
      (err, result) => {
        if (result && result.success) {
          this.$stateGo('checkoutSuccess');
        } else {
          console.log(err);
        }
      });
    } else {
      this.$stateGo('checkoutSuccess');
    }
  }
  addDelivery(data) {
    console.log(data);
    if (data.deliveryMethod !== '') {
      this.deliveryData = data;
    }
  }
}

angular.module('food-coop').component('cartView', {
  controller: UserCartCtrl,
  controllerAs: 'cart',
  templateUrl: 'client/user/components/cartView/cart-view.ng.html',
});
