import ngMaterial from 'angular-material'
import templateUrl from './answer.html'


function answerCtrl($scope) {

  "ngInject";

  this.formName = 'Answer';

  this.submit = () => {
    this.onSubmit({modifier: {$set: {'answer.body': this.data}}});
    this.form.$setPristine()
  };

}
const name = "answer"

export default angular.module(name, [ngMaterial]).component(name, {
  templateUrl,
  controller: answerCtrl,
  bindings: {
    onSubmit: '&'
  }
})
