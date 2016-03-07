function requestCtrl($scope) {
  "ngInject";
  
  
}


angular.module('food-coop').component('requestDetails', {
  templateUrl: 'client/request/components/list/request.ng.html',
  controller: requestCtrl,
  bindings: {
    request: '<',
    onUpdate: '&',
    priceCategory: '<'
  }
})