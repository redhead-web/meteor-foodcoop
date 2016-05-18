// import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'

import template from './eventList.html'

import { Events } from '../../../api/events';

class EventsController {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.limit = 5;
    this.sort = {
      eventDate: 1
    }

    this.subscribe('upcoming-events', () => [{
      limit: parseInt(this.limit),
      sort: this.getReactively('sort')
    }])

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
  uiRouter,
  ngMaterial
]).component(name, {
  template,
  controllerAs: name,
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
