import angular from 'angular';

angular.module('food-coop').controller('requestFormCtrl', function requestFormCtrl($mdToast, $reactive, $scope) {
  'ngInject';

  $reactive(this).attach($scope);

  const vm = this;

  vm.disabled = false;

  vm.content = {};

  vm.send = () => {
    vm.disabled = true;
    vm.call('/email/contactForm', vm.content, (err) => {
      vm.disabled = false;
      if (err) {
        vm.error = err.message;
        return $mdToast.show(
          $mdToast.simple().content(err.message).position('bottom right').hideDelay(4000),
        );
      }
      vm.content.subject = '';
      vm.content.body = '';
      return $mdToast.show(
        $mdToast.simple().content('Poof! We will read your message shortly thank you.').position('bottom right').hideDelay(4000),
      );
    });
  };
});
