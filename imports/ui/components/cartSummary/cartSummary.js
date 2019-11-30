/* globals Cart, Markup */

import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import template from './cart-summary.ng.html';

class CartSummaryController {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    this.autorun(() => {
      const cartItems = Cart.Items.find({ userId: Meteor.userId() }).fetch();
      this.total = Markup(cartItems).cartTotal();
      this.cartLength = Cart.Items.find({ userId: Meteor.userId() }).count();
    });
  }
}

export const name = 'cartSummary';

export default angular.module(name, []).component(name, {
  controller: CartSummaryController,
  controllerAs: 'cr',
  template,
});
