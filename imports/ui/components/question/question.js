import ngMaterial from 'angular-material';
import moment from 'moment';

import template from './question.html';

function QuestionCtrl($scope) {
  'ngInject';

  this.formName = 'Question';

  this.submit = () => {
    this.onSubmit({
      question: {
        question: {
          body: this.data,
          createdAt: moment().toDate(),
          user: {
            id: Meteor.userId(),
            name: Meteor.user().profile.name,
          },
        },
      },
    });
    this.data = null;
    this.form.$setPristine();
  };
}

export const name = 'question';

export default angular.module(name, [ngMaterial]).component(name, {
  template,
  controller: QuestionCtrl,
  bindings: {
    onSubmit: '&',
  },
});
