import template from './membershipBenefits.html'
import dialogtemplate from './membershipDialog.html'
import ngMaterial from 'angular-material'

export const name = 'membershipBenefits';

function MembershipBenefitsController($scope, $mdDialog, $mdMedia) {
  "ngInject";
  this.open = function(ev) {
    let useFullScreen;
    useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: DialogController,
      template: dialogtemplate,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    }).then((answer) => {
      this.status = 'You said the information was "' + answer + '".';
    }, () => {
      this.status = 'You cancelled the dialog.';
    });
  }
}

function DialogController($scope, $mdDialog) {
  "ngInject";
  $scope.prices = {
    customer: Meteor.settings["public"].shares.customer,
    producer: Meteor.settings["public"].shares.producer
  };
  $scope.hide = function() {
    return $mdDialog.hide();
  };
  $scope.cancel = function() {
    return $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    return $mdDialog.hide(answer);
  };
};

// create a module
export default angular.module(name, [
  ngMaterial
]).component(name, {
  template,
  controller: MembershipBenefitsController
})



