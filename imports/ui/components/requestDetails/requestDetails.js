import ngMaterial from 'angular-material'
import './item.scss'

import template from './requestDetails.html'

import {name as aggregatePercentage} from "../aggregatePercentage/aggregatePercentage"
import {name as qAndA} from "../qAndA/qAndA"

class requestCtrl {
  constructor() {
    "ngInject";
  }
}

export const name = "requestDetails"

export default angular.module(name, [
  ngMaterial,
  aggregatePercentage,
  qAndA
]).component(name, {
  template,
  controller: requestCtrl,
  bindings: {
    request: '<',
    onUpdate: '&',
    priceCategory: '<'
  }
})
