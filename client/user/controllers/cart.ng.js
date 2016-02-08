angular.module("food-coop").controller("UserCartCtrl", function($scope, $reactive, $auth){
  $reactive(this).attach($scope);
  var vm = this;
  // vm.total = 0;
 //  vm.cartLength = 0;
  vm.markup = Meteor.settings.public.markup / 100 + 1;

  vm.nextDeliveryDay = moment( GetDeliveryDay() ).format()
  
  vm.helpers({
    cartLength() {
      return Cart.Items.find().count()
    },
    total() {
      items = Cart.Items.find().fetch()
      return _.reduce(items, (total, item) => {
        return total + (item.details.price * vm.markup * item.qty)
      }, 0)
    },
    Items() {
      return Cart.Items.find()
    }
  })


  // vm.countTotal = countTotal;
  vm.removeFromCart = removeFromCart;
  vm.changeQuantity = changeQuantity;


  // function countTotal() {
  //   if ($auth.currentUser != null && _.isArray($auth.currentUser.profile.products) ) {
  //     vm.total = _.reduce($auth.currentUser.profile.cart.products, function(total, item) {
  //       return total + (item.details.price * vm.markup * item.qty)
  //     }, 0)
  //   } else return 0
  // }

  function removeFromCart(id) {
    Cart.Items.remove(id);
    // Meteor.call('removeFromCart', id, function(err) {
//       console.log(err)
//       // countTotal();
//     });
  }

  function changeQuantity (id, productId, new_qty, old_qty) {
    // countTotal();
    Meteor.call('/cart/item/update', id, new_qty, old_qty, function(error) {
      if (error) return console.log(error);
      // countTotal();
    });
  }

  // countTotal();

  return vm;

});
