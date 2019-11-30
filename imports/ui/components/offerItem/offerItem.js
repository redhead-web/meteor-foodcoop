import ngMaterial from 'angular-material'
import template from './offerItem.html'
import modalTemplate from './modalTemplate.html'
import {name as qAndA} from "../qAndA/qAndA"

class OfferController {
  constructor($scope, $reactive, $mdMedia, $mdDialog) {
    "ngInject"

    this.indentAvatar = $mdMedia('gt-xs');

    this.accept = (ev, offer) => {
      if ( (offer.quantity && this.request.quantity) && offer.quantity < this.request.quantity) {

        this.onUpdate({offer: offer, modifier: {$set: {status: 'aggregate'}}})

        if (this.request.status !== 'partial') {
          this.requestUpdate({request: this.request, modifier: {$set: {status: 'partial'}}})
        }
      } else {
        console.log(offer.bid);
        $mdDialog.show({
          controller: 'CheckoutController',
          controllerAs: 'checkout',
          template: modalTemplate,
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          bindToController: true,
          locals: {
            'offer': offer,
            'request': this.request,
            'total': offer.bid
          }

        })
        .then(function(answer) {
          this.onUpdate({offer: offer, modifier: {$set: {status: 'accepted'}}})
          if (answer) {
            this.requestUpdate({request: this.request, modifier: {$set: {status: 'closed'}}})
          }
        }, function() {
          console.log('cancelled acceptance of offer.')
        });
      }

    }

  }

  bidWithMarkup(bid) {
    return Markup().total(bid)
  }

  percentage(amount, total) {
    return _.round(amount/total*100)
  }

  unaccept(ev, offer) {
    this.onUpdate({offer: offer, modifier: {$set: {status: 'active'}}})
  }

  withdraw(offer) {
    this.onUpdate({offer: offer, modifier: {
      $set: {status: 'withdrawn'}
    } });
  }
}

export const name = "offerItem"

export default angular.module(name, [ngMaterial, qAndA]).component(name, {
  template,
  controller: OfferController,
  bindings: {
    request: '<',
    offer: '<',
    onUpdate: '&',
    requestUpdate: '&'
  }
}).controller("CheckoutController", CheckoutController);


function CheckoutController ($mdDialog, $reactive, $scope) {
  let vm = this;
  $reactive(this).attach($scope)

  vm.disablePaymentButton = true;

  var braintreeOptions = {
    container: "payment-form",
    onReady(obj) {
      teardown = obj.teardown;
      $scope.$apply( function () { vm.disablePaymentButton = false })
    },
    onPaymentMethodReceived: checkout,
    onError: function (err) {
      vm.error = "Error: " + err.type + ": " + err.message;
    },
  };

  function getClientToken () {
    vm.call("generateClientToken", function(err, token) {
      if (err || !token) {
        vm.error = "Sorry connection error occurred to payment provider. Please try again later";
        return console.log(err);
      }
      braintree.setup(token, "dropin", braintreeOptions);
    })
  }

  getClientToken()

  function checkout(obj) {
    console.log('checking out')
    console.log(vm.total)

    console.log(obj)
    var data = {};

    data.payment_method_nonce = obj.nonce

    // start spinning wheel animation
    // $scope.$apply( function () {
//       vm.spinner = true;
//     });
//
//     vm.call('braintreeAuthorization', data, function(err, result) {
//       if (result && result.success) {
//         vm.success = true;
//       } else {
//         console.log(err);
//         // display error details to the user and get them to try again
//         vm.error = "Sorry, something went wrong, please confirm your payment details and try again."
//         teardown(function() {
//           getClientToken()
//         });
//       }
//       // end spinning wheel animation
//       vm.spinner = false;
//       $scope.$apply()
//     });

    $scope.$apply(function() {
      vm.success = true;

    })
  };

  vm.cancel = function() {
    $mdDialog.cancel();
  };
  vm.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
