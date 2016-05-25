import ngMaterial from 'angular-material'
import './item.scss'

import templateUrl from './requestDetails.html'

import {name as aggregatePercentage} from "../aggregatePercentage/aggregatePercentage"
import {name as qAndA} from "../qAndA/qAndA"

class requestCtrl {
  constructor() {
    "ngInject";
  }
}

const name = "requestDetails"

export default angular.module(name, [
  ngMaterial,
  aggregatePercentage,
  qAndA
]).component(name, {
  templateUrl,
  controller: requestCtrl,
  bindings: {
    request: '<',
    onUpdate: '&',
    priceCategory: '<'
  }
})
