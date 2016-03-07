function UserCartCtrl ($scope, $reactive, $auth) {
  
  "ngInject";
  
  $reactive(this).attach($scope);
  var vm = this;

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

  vm.removeFromCart = removeFromCart;
  vm.changeQuantity = changeQuantity;

  function removeFromCart(id) {
    Cart.Items.remove(id);
  }

  function changeQuantity (id, productId, new_qty, old_qty) {
    Meteor.call('/cart/item/update', id, new_qty, old_qty, function(error) {
      if (error) return console.log(error);
    });
  }

  return vm;

}


angular.module("food-coop").controller('UserCartCtrl', UserCartCtrl);
