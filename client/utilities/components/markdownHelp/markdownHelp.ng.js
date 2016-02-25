function markDownHelpCtrl ($scope, $mdDialog, $mdMedia) {
  var vm = this;
  vm.openMarkdownHints = function($event) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'client/utilities/components/markdownHelp/dialog.ng.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      vm.status = 'You said the information was "' + answer + '".';
    }, function() {
      vm.status = 'You cancelled the dialog.';
    });
    
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      vm.customFullscreen = (wantsFullScreen === true);
    });
  };
  return vm;
}

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}



angular.module('food-coop').component('markdownHelp', {
  templateUrl: 'client/utilities/components/markdownHelp/markdown-help.ng.html',
  controller: markDownHelpCtrl
})