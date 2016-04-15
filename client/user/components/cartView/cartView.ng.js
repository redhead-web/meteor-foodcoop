function UserCartCtrl ($scope, $reactive, $mdToast, $state) {
  
  "ngInject";
  
  $reactive(this).attach($scope);
  
  var vm = this;

  vm.nextDeliveryDay = moment( GetDeliveryDay() ).format();
  vm.priceWithMarkup = (item) => Markup(item).total();
  vm.totalWithMarkup = (item) => Markup(item).cartTotal();
    
  vm.helpers({
    items() {
      return Cart.Items.find({userId: Meteor.userId()})
    }
  })
  
  vm.autorun(() => {
    let user = Meteor.user();
    let cartItems = Cart.Items.find({userId: Meteor.userId()}).fetch();
    vm.total = Markup(cartItems).cartTotal()
    vm.cartLength = Cart.Items.find({userId: Meteor.userId()}).count()
    if (user && user.profile && user.profile.balance > 0) {
      if (user.profile.balance < vm.total) {
        vm.totalWithBalance = vm.total - user.profile.balance;
      } else vm.totalWithBalance = 0
    } 
  });

  vm.removeFromCart = removeFromCart;
  vm.changeQuantity = changeQuantity;
  vm.checkoutSuccess = checkoutSuccess;

  function removeFromCart(id) {
    Cart.Items.remove(id);
  }

  function changeQuantity (id, newQty, oldQty) {
    vm.call('/cart/item/update', id, newQty, oldQty, function(error) {
      if (error) {
        console.log(error);
        $mdToast.show(
          $mdToast.simple().content(error.message).position('bottom left').hideDelay(3000)
        );
      }
    });
  }
  
  function checkoutSuccess () {
    $state.go('checkoutSuccess');
  }
}

angular.module("food-coop").component('cartView', {
  controller: UserCartCtrl,
  controllerAs: 'cart',
  templateUrl: 'client/user/components/cartView/cart-view.ng.html'
});
