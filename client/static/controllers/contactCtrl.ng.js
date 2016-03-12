angular.module('food-coop').controller('contactCtrl', function($mdToast, $reactive, $scope) {
  $reactive(this).attach($scope)
  
  var vm = this;
  
  vm.disabled = false;
  
  vm.content = {}
  
  vm.send = function () {
    vm.disabled = true;
    vm.call('/email/contactForm', vm.content, function (err, result) {
      vm.disabled = false;
      if (err) {
        vm.error = err.message
        return $mdToast.show(
          $mdToast.simple().content(err.message).position('bottom left').hideDelay(4000)
        );
      } 
      
      return $mdToast.show(
        $mdToast.simple().content("Poof! Message sent thank you.").position('bottom left').hideDelay(4000)
      );
    });
  };
  
  ;
})

