import ngMaterial from 'angular-material'

import templateUrl from './qAndAItem.html'

import {name as answer} from "../answer/answer"


function qAndAItemController($scope) {

  "ngInject";

  this.$onInit = () => {
    this.canAnswer = this.QandAController.canAnswer()
  }

  this.updateQuestion = (modifier) => {
    this.onUpdate({item: this.item, modifier: modifier});
  }

}
const name = 'qAndAItem'

export default angular.module(name, [answer, ngMaterial]).component(name, {
  templateUrl,
  controller: qAndAItemController,
  bindings: {
    item: '<',
    onUpdate: '&'
  },
  require: {
    QandAController: '^qAndA'
  },
})
