import ngMaterial from 'angular-material'
import template from './answer.html'


function answerCtrl($scope) {

  "ngInject";

  this.formName = 'Answer';

  this.submit = () => {
    this.onSubmit({modifier: {$set: {'answer.body': this.data}}});
    this.form.$setPristine()
  };

}
export const name = "answer"

export default angular.module(name, [ngMaterial]).component(name, {
  template,
  controller: answerCtrl,
  bindings: {
    onSubmit: '&'
  }
})
