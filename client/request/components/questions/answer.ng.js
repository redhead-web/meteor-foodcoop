function answerCtrl($scope) {
  
  "ngInject";
  
  var vm = this;
  vm.formName = 'Answer';
  
  vm.submit = function() {
    vm.onSubmit({modifier: {$set: {'answer.body': vm.data}}});
  };
  
}


angular.module('food-coop').component('answer', {
  templateUrl: 'client/request/components/questions/form.ng.html',
  controller: answerCtrl,
  bindings: {
    onSubmit: '&'
  }
})