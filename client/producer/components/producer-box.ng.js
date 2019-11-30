import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import template from './producer-box.ng.html';

function producerBoxController($scope, $reactive, $element, $window, $mdSidenav) {
  'ngInject';

  $reactive(this).attach($scope);

  this.subscribe('producer', () => [this.getReactively('producerId')]);
  this.helpers({
    producer() {
      return Meteor.users.findOne(this.getReactively('producerId'));
    },
  });
  this.toggleLeft = () => {
    $mdSidenav('left-contacts').toggle();
  };
}


angular.module('food-coop')
  .component('fcProducerBox', {
    bindings: {
      producerId: '<',
    },
    template,
    controller: producerBoxController,
  });
