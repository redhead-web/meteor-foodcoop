function UserCartCtrl ($scope, $reactive, $mdToast) {
  
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
    let cartItems = Cart.Items.find({userId: Meteor.userId()}).fetch()
    vm.total = Markup(cartItems).cartTotal()
    vm.cartLength = Cart.Items.find({userId: Meteor.userId()}).count()
  });

  vm.removeFromCart = removeFromCart;
  vm.changeQuantity = changeQuantity;

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
}

angular.module("food-coop").controller('UserCartCtrl', UserCartCtrl);
