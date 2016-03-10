var acceptedOffers = [
    {
      _id: Random.id(),
      // request: vm.request._id,
      user: Meteor.userId(),
      name: "Sean Stanley",
      // companyName: Meteor.user().profile.companyName,
      bid: 10,
      dateCreated: moment().subtract(1, 'days').toDate(),
      status: 'aggregate',
      quantity: 6,
      description: "I'd like to offer exactly what you're looking for and we can arrange delivery to suit you. Please call me at 0210409066 for details."
    }, {
      _id: Random.id(),
      // request: vm.request._id,
      user: Meteor.userId(),
      name: "Matt Stanley",
      // companyName: Meteor.user().profile.companyName,
      bid: 8,
      dateCreated: moment().subtract(9, 'hours').toDate(),
      quantity: 8,
      status: 'aggregate',
      description: "This is not spam I swear. I'd like to provide what you want. I'd like to offer exactly what you're looking for and we can arrange delivery to suit you. Please call me at 0210409066 for details."
    }
  ]
function AggregateCheckoutController($scope, $mdDialog, $reactive) {
  
  "ngInject";
  
  var vm = this;
  
  /*
    TODO set vm.offers with a helper
  */
  vm.offers = acceptedOffers;
  
  vm.checkout = function(ev) {
    
    $mdDialog.show({
      controller: 'CheckoutController',
      controllerAs: 'checkout',
      templateUrl: 'client/request/components/aggregate-utilities/checkout.ng.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      bindToController: true,
      locals: {
        'offers': vm.offers,
        'request': vm.request,
        'total': _.sum(_.pluck(vm.offers, 'bid'))
      }
    })
    .then(function(answer) {
      angular.forEach(vm.offers, function(offer) {
        offer.status = 'accepted';
        // Offers.update(offer._id, {$set: {status: 'accepted'}})
      });
      if (answer) {
        vm.onUpdate(vm.request._id, {$set: {status: 'closed'}})
      }
    }, function() {
      console.log('cancelled checkout of offers.')
    });
  }
  
  ;
  
}


angular.module('food-coop').component('aggregateCheckout', {
  templateUrl: 'client/request/components/aggregate-utilities/aggregate-checkout.ng.html',
  controller: AggregateCheckoutController,
  bindings: {
    request: '<',
    onUpdate: '&',
  }
});

function AggregatePercentageController($scope, $mdDialog, $reactive) {
  
  "ngInject";
  
  var vm = this;
  
  /*
    TODO set vm.offers with a helper
  */
  vm.offers = acceptedOffers;
  /*
    TODO Make reactive once database is hooked up
  */
  vm.offerQuantity = _.sum(_.pluck(vm.offers, 'quantity'));
  
  vm.percentage = function() {
    return _.round(vm.offerQuantity/vm.request.quantity*100)
  }
  
  
  
}

angular.module('food-coop').component('aggregatePercentage', {
  templateUrl: 'client/request/components/aggregate-utilities/aggregate-percentage.ng.html',
  controller: AggregatePercentageController,
  bindings: {
    request: '<',
    onUpdate: '&',
  }
});