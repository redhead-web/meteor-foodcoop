function QuestionCtrl($scope) {
  var vm = this;
  vm.formName = 'Question';
  
  vm.submit = function() {
    vm.onSubmit({
      question: {
        question: {
          body: vm.data,
          createdAt: moment().toDate(),
          user: {
            id: Meteor.userId(),
            name: Meteor.user().profile.name
          }
        }
      }
    });
  };
  
}


angular.module('food-coop').component('question', {
  templateUrl: 'client/request/components/questions/form.ng.html',
  controller: QuestionCtrl,
  bindings: {
    onSubmit: '&'
  }
})