function UserCartCtrl ($scope, $reactive, $mdToast) {
  
  "ngInject";
  
  $reactive(this).attach($scope);
  
  var vm = this;

  vm.nextDeliveryDay = moment( GetDeliveryDay() ).format();
  vm.priceWithMarkup = (item) => Markup(item).total();
  vm.totalWithMarkup = (item) => Markup(item).cartTotal();
    
  vm.helpers({
    items() {
      return Cart.Items.find()
    }
  })
  
  vm.autorun(() => {
    let cartItems = Cart.Items.find().fetch()
    vm.total = Markup(cartItems).cartTotal()
    vm.cartLength = Cart.Items.find().count()
  });

  vm.removeFromCart = removeFromCart;
  vm.changeQuantity = changeQuantity;

  function removeFromCart(id) {
    Cart.Items.remove(id);
  }

  function changeQuantity (id, productId, new_qty, old_qty) {
    vm.call('/cart/item/update', id, new_qty, old_qty, function(error) {
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
