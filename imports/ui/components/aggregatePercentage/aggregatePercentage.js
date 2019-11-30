import {name as percentDisplay} from '../percentDisplay/percentDisplay'

import "./percentage.scss"

import template from './aggregatePercentage.html'

import { Offers } from "../../../api/offers"

class AggregatePercentageController {
  constructor($scope, $reactive) {
    "ngInject";
    $reactive(this).attach($scope)
    this.subscribe("request-offers", () => [this.request._id])

    this.helpers({
      offers() {
        return Offers.find({request: this.request._id, status: 'aggregate'}, {sort: {dateCreated: 1}})
      }
    })

    /*
      TODO Make reactive once database is hooked up
    */
    this.autorun(() => {
      this.offerQuantity = _.sum(_.pluck(this.getReactively('offers'), 'quantity'));
    })

  }
  percentage() {
    return _.round(this.offerQuantity/this.request.quantity*100)
  }


}

export const name = "aggregatePercentage"

export default angular.module(name, [
  percentDisplay
]).component(name, {
  template,
  controller: AggregatePercentageController,
  bindings: {
    request: '<',
    onUpdate: '&',
  }
});
