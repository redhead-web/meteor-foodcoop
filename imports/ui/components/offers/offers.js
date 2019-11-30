import ngMaterial from 'angular-material'
import {name as offerItem} from "../offerItem/offerItem"

import { Offers } from "../../../api/offers"

import template from "./offers.html"
import './style.scss'

class OffersController {
  constructor($scope, $reactive) {
    "ngInject";
    $reactive(this).attach($scope)

    this.subscribe("request-offers", () => [this.request._id])

    this.helpers({
      offers() {
        return Offers.find({request: this.request._id}, {sort: {dateCreated: 1}})
      }
    })
  }

  update(offer, modifier) {
    // var idx = _.indexOf(this.offers, offer);
    // _.merge(this.offers[idx], modifier.$set)
    Offers.update(offer._id, modifier);
  }

  reqUpdate(modifier) {
    this.requestUpdate({request: this.request, modifier: modifier});
  }
}


export const name = "offers"

export default angular.module(name, ['angular-meteor', ngMaterial, offerItem]).component(name, {
  template,
  controller: OffersController,
  bindings: {
    request: '<',
    requestUpdate: '&'
  }
})
