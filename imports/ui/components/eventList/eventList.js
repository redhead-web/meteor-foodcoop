// import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'

import templateUrl from './eventList.html'

import { Events } from '../../../api/events';

import {name as eventCreate} from "../eventCreate/eventCreate"
import {name as eventDetails} from "../eventDetails/eventDetails"



class EventsController {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.limit = 7;
    this.sort = {
      date: 1
    }

    this.subscribe('upcoming-events', () => [{
      limit: parseInt(this.limit),
      sort: this.getReactively('sort')
    }, null])

    this.helpers({
      events() {
        return Events.find({}, {
          sort : this.getReactively('sort')
        });
      }
    })
  }

  pageChanged(limit) {
    this.limit = limit;
  }

  sortChanged(sort) {
    this.sort = sort;
  }

}

const name = 'eventList';

// create a module
export default angular.module(name, [
  'angular-meteor',
  eventCreate,
  eventDetails,
  uiRouter,
  ngMaterial
]).component(name, {
  templateUrl,
  controller: EventsController
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('events', {
      url: '/events',
      template: '<event-list></event-list>'
    });
}
