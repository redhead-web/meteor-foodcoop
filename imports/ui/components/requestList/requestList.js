import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'

import templateUrl from './requestList.html'
import './style.scss'

import { Requests } from '../../../api/requests';

import {name as requestDetails} from "../requestDetails/requestDetails"
import {name as offers} from "../offers/offers"
import {name as newOffer} from "../newOffer/newOffer"

class RequestListController {
  constructor($reactive, $scope) {
    "ngInject";

    $reactive(this).attach($scope);
    this.subscribe('requests')
    this.helpers({
      requests() {
        return Requests.find({})
      }
    })

    this.priceCategory = [
      {icon: '$', title: "Budget Level", blurb: 'I am looking for the best price'},
      {icon: '$$', title: "Intermediate Quality", blurb: 'I am looking for a mix of quality and value'},
      {icon: '$$$', title: "Top Quality", blurb: 'I am willing to pay a higher price for the best product'}
    ]
  }

  update(request, modifier) {
    // console.log(modifier);
    // var idx = this.requests.indexOf(request);
    // _.merge(vm.requests[idx], modifier.$set)

    Requests.update(request._id, modifier);

  }

}

const name = 'requestList';

// create a module
export default angular.module(name, [
  'angular-meteor',
  requestDetails,
  newOffer,
  offers,
  uiRouter,
  ngMaterial
]).component(name, {
  templateUrl,
  controller: RequestListController
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('requests', {
      url: '/requests',
      template: '<request-list></request-list>'
    });
}
