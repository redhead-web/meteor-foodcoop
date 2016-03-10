function UserCartCtrl ($scope, $reactive, $mdToast) {
  
  "ngInject";
  
  $reactive(this).attach($scope);
  
  var vm = this;

  vm.nextDeliveryDay = moment( GetDeliveryDay() ).format()
  vm.markup = Meteor.settings.public.markup / 100 + 1;
    
  vm.helpers({
    items() {
      console.log("cart items helper started")
      return Cart.Items.find()
    }
  })
  
  vm.autorun(() => {
    console.log('cart autorun started')
    let cartItems = Cart.Items.find().fetch()
    vm.total = _.reduce(cartItems, (total, item) => {
      return total + (item.details.price * vm.markup * item.qty)
    }, 0)
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
