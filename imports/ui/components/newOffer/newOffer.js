import {Meteor} from "meteor/meteor"
import ngMaterial from 'angular-material'

import './style.scss'


import template from './newOffer.html'

import { Offers } from '../../../api/offers';

class NewOfferController {
  constructor($scope, $reactive) {
    "ngInject";

    this.offer = {
      request: this.request._id,
      user: Meteor.userId(),
      name: Meteor.user().profile.name,
      companyName: Meteor.user().profile.companyName
    };

    this.offerBase = angular.copy(this.offer);

    this.markup = Meteor.settings.public.markup
  }

  submit(valid) {
    Offers.insert(this.offer);
    this.discard()
  }

  discard() {
    this.offer = this.offerBase;
    this.hasFocus = false;
    this.form.$setPristine()
  }

  blur(event) {
    console.log(event)
    this.hasFocus = false;
  }

  changeBid() {
    this.offer.bid = Markup().withoutMarkup(this.bidWithMarkup)
  }

  changeBidWithMarkup() {
    this.bidWithMarkup = Markup().total(this.offer.bid)
  }


}

export const name = "newOffer"

export default angular.module(name, [ngMaterial]).component(name, {
  template,
  controller: NewOfferController,
  controllerAs: name,
  bindings: {
    request: '<'
  }
})
