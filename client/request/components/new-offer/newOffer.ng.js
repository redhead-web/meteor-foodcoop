function newOfferCtrl($scope, $reactive) {
  
  "ngInject";
  
  var vm = this;
  
  vm.markup = _.round( Meteor.settings.public.markup / 100, 2)
  
  vm.offer = {
    request: vm.request._id,
    user: Meteor.userId(),
    name: Meteor.user().profile.name,
    companyName: Meteor.user().profile.companyName
  };
  
  vm.submit = submit;
  vm.discard = discard;
  vm.blur = blur;
  vm.round = round;
  
  function round(prop, value, model) {
    if (!vm[model]) {
      vm[prop] = undefined;
    }
    
    if (!vm[prop]) {
      vm[prop] = 0;
    }
    if (value) {
      vm[prop] = _.round(value, 2);
    }
  }
  
  function submit(valid) {
    vm.offer.bid = vm.bid;
    /*
    Requests.insert(vm.offer);
    */
  }
  
  function discard() {
    vm.offer = {};
    vm.hasFocus = false;
  }
  
  function blur(event, model) {
    if (!vm.offer.description && !vm.offer.quantity && !vm.bid && !vm.earn) {
      vm.hasFocus = false;
    }
  }
  
  
}

angular.module('food-coop').component('newOffer', {
  templateUrl: 'client/request/components/new-offer/new-offer.ng.html',
  controller: newOfferCtrl,
  bindings: {
    request: '<'
  }
})