class CartSummaryController {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope)

    this.autorun(() => {
      let cartItems = Cart.Items.find({userId: Meteor.userId()}).fetch()
      this.total = Markup(cartItems).cartTotal()
      this.cartLength = Cart.Items.find({userId: Meteor.userId()}).count()
    });
  }
}

angular.module('food-coop').component('cartSummary', {
  controller: CartSummaryController,
  controllerAs: 'cr',
  templateUrl: 'client/user/components/cartSummary/cart-summary.ng.html'
});
