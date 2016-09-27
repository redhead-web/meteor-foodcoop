function producerBoxController($scope, $reactive, $element, $window, $mdSidenav) {
  "ngInject";
  $reactive(this).attach($scope)
  
  this.subscribe('producer', () => {
    return [this.getReactively('producerId')]
  })
  this.helpers({
    producer() {
      return Meteor.users.findOne( this.getReactively('producerId') )
    }
  })
  this.toggleLeft = function() {
    $mdSidenav('left-contacts').toggle()
  }
}


angular.module('food-coop')
.component("fcProducerBox", {
  bindings: {
    producerId: "<"
  },
  templateUrl: 'client/producer/template/producer-box.ng.html',
  controller: producerBoxController
});
