function OfferCtrl($scope, $reactive, $mdMedia, $mdDialog) {
  var vm = this;
  
  vm.markup = _.round( Meteor.settings.public.markup / 100, 2)
  
  vm.indentAvatar = $mdMedia('gt-xs');
  
  vm.percentage = percentage;
  
  vm.accept = accept;
  
  vm.withdraw = withdraw;
  
  function percentage(amount, total) {
    return _.round(amount/total*100)
  }
  
  function unaccept(ev, offer) {
    vm.onUpdate({offer: offer, modifier: {$set: {status: 'active'}}})
  }
  
  function accept(ev, offer) {
    if ( (offer.quantity && vm.request.quantity) && offer.quantity < vm.request.quantity) {
      
      vm.onUpdate({offer: offer, modifier: {$set: {status: 'aggregate'}}})
      
      if (vm.request.status !== 'partial') {
        vm.requestUpdate({request: vm.request, modifier: {$set: {status: 'partial'}}})
      }
    } else {
      console.log(offer.bid);
      $mdDialog.show({
        controller: 'CheckoutController',
        controllerAs: 'checkout',
        templateUrl: 'client/request/components/offers/accept.ng.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        bindToController: true,
        locals: {
          'offer': offer,
          'request': vm.request,
          'total': offer.bid
        }
        
      })
      .then(function(answer) {
        vm.onUpdate({offer: offer, modifier: {$set: {status: 'accepted'}}}) 
        if (answer) {
          vm.requestUpdate({request: vm.request, modifier: {$set: {status: 'closed'}}})
        }
      }, function() {
        console.log('cancelled acceptance of offer.')
      });
    }
        
  }
  
  function withdraw(offer) {
    var modifier = {
      $set: {status: 'withdrawn'}
    }
    vm.onUpdate({offer: offer, modifier: modifier});
  }
  
}

angular.module('food-coop').component('offerItem', {
  templateUrl: 'client/request/components/offers/offer-item.ng.html',
  controller: OfferCtrl,
  bindings: {
    request: '<',
    offer: '<',
    onUpdate: '&',
    requestUpdate: '&'
  }
});


