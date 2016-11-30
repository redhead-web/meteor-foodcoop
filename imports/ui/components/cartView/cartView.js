/* globals GetNextDeliveryDay, Markup, Cart */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import templateUrl from './cart-view.ng.html';
import cartTable from '../cartTable/cartTable';
import checkoutFlow from '../checkoutFlow/checkoutFlow';

class CartViewCtrl {
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
    if (data) {
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

const name = 'cartView';

export default angular.module(name, [cartTable.name, checkoutFlow.name]).component(name, {
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
