angular.module("food-coop").controller("orderProductCtrl", function($scope, $mdDialog, $mdToast, $state, $reactive){
  $reactive(this).attach($scope);
  
  let vm = this;

  vm.addToCart = addToCart;
  
  vm.alreadyInCart = alreadyInCart;
  
  function alreadyInCart(productId) {
    let item = Cart.Items.findOne({productId: productId})
    return item != null ? "content:ic_add_24px" : "action:ic_shopping_cart_24px"
  }

  function showLoginAlert ($event) {
    $mdDialog.show(
      $mdDialog.alert()
      .title("Login or Sign up")
      .textContent("Whangarei Co-operative services are only available to members. Please login or sign up to shop with us.")
      .ok('Got it!')
      .targetEvent($event)
    );
  }
  
  function storeStockingAlert ($event) {
    $mdDialog.show(
      $mdDialog.alert()
      .title("Opening Soon")
      .textContent("Thank you for your interest in shopping with us. Our co-op store is brand new and still being filled with products. If you are a signed up member you'll get an email when our online store is ready to use.")
      .ok('Got it!')
      .targetEvent($event)
    );
  }

  function isOwnerAlert ($event, id) {
    $mdToast.show(
      $mdToast.simple().content("Sorry, you can't order your own items!").position('bottom left').hideDelay(3000)
    );
  }

  function addToCart ($event, product, qty) {
    var rawProduct;

    console.log('addToCart function called')

    if (typeof product.getRawObject === 'function') {
      rawProduct = product.getRawObject();
    } else rawProduct = product;

    if (!Meteor.userId()) {
      return showLoginAlert($event)
    }

    if (Meteor.userId() === product.producer) {
      return isOwnerAlert($event, product._id);
    }
    
    // Delete the below code when we are ready to enable shopping
    //return storeStockingAlert($event)


		vm.call('/cart/insert', rawProduct, qty, function(err, success) {
      if (err) {
        console.error(err);
        return $mdToast.show(
          $mdToast.simple().content(err.message).position('bottom left').hideDelay(4000)
        );
      }

      if (success !== "UPDATE SUCCESS") {
        let toast = $mdToast.simple()
            .content('Poof! Added to Cart!')
            .action('CHECKOUT')
            .highlightAction(false)
            .position('bottom left');
        $mdToast.show(toast).then(function(response) {
          if ( response == 'ok' ) {
            $state.go('cart.checkout');
          }
        });
      } else if (success === "UPDATE SUCCESS") {
        let toast = $mdToast.simple()
        .content(`Poof! +${qty}`)
        .action('CHECKOUT')
        .highlightAction(false)
        .position('bottom left');
        $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
              $state.go('cart.checkout');
            }
          });
      }
    });
  }
  return vm;

});
