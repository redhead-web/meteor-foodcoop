//import {name as percentDisplay} from '../percentDisplay/percentDisplay'
import ngMaterial from 'angular-material'

import {Meteor} from 'meteor/meteor'
import { Questions } from '../../../api/questions';
import template from './qAndA.html'
import './style.scss'

import {name as question} from "../question/question"
import {name as qAndAItem} from "../qAndAItem/qAndAItem"

class QandAController {
  constructor($scope, $reactive) {
    "ngInject";
    $reactive(this).attach($scope)

    this.subscribe('item-questions', () => [this.item._id])

    this.helpers({
      questions() {
        return Questions.find({itemId: this.item._id}, {sort: { dateCreated: -1 }})
      }
    })
  }
  canAnswer() {
    let user = Meteor.userId()
    if (user && (user === this.item.user || user === this.item.creator.creatorId) ) {
      return true;
    }
    return false;
  }
  insert(question) {
    console.log(question);
    // vm.questions.push(question);
    question.itemId = this.item._id
    Questions.insert(question)
  }

  // restrictedQuestioner() {
  //   // only let a particular user ask questions about this item
  //   const user = Meteor.userId()
  //   if (!user) {
  //     return false;
  //   }
  //
  //   if ( this.item.user === user || this.item.creator.creatorId === user ) {
  //     return false;
  //   }
  //
  //   if (this.questioner && user === this.questioner) {
  //     return true;
  //   } else if (!this.questioner) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  update(question, modifier) {
    var keys, key1, key2;

    if (this.canAnswer(Meteor.userId())) {
      Questions.update(question._id, modifier);
    } else {
      console.log("canAnswer call returned falsey")
    }
  }
}

export const name = "qAndA"

export default angular.module(name, [
  'angular-meteor',
  question,
  qAndAItem,
  ngMaterial
]).component(name, {
  template,
  controller: QandAController,
  bindings: {
    item: '<',
    questioner: '<'
  }
});
