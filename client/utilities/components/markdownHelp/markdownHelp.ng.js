import angular from 'angular';
import template from './markdown-help.ng.html';
import dialogTemplate from './dialog.ng.html';

function markDownHelpCtrl($scope, $mdDialog, $mdMedia) {
  'ngInject';

  const vm = this;
  vm.openMarkdownHints = function ($event) {
    const useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      template: dialogTemplate,
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: useFullScreen,
    })
      .then((answer) => {
        vm.status = `You said the information was "${answer}".`;
      }, () => {
        vm.status = 'You cancelled the dialog.';
      });

    $scope.$watch(() => $mdMedia('xs') || $mdMedia('sm'), (wantsFullScreen) => {
      vm.customFullscreen = (wantsFullScreen === true);
    });
  };
}

function DialogController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}


angular.module('food-coop').component('markdownHelp', {
  template,
  controller: markDownHelpCtrl,
});
