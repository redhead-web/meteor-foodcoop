// import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'
import {name as eventOrderForm} from '../eventOrderForm/eventOrderForm'
import {name as mapLocation} from '../mapLocation/mapLocation'

import templateUrl from './eventDetails.html'
import './style.scss'

import { Events } from '../../../api/events';

class EventDetailsController {
  constructor($scope, $reactive, $stateParams) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('event', () => [$stateParams.eventId])

    this.helpers({
      event() {
        return Events.findOne($stateParams.eventId)
      }
    })
  }

}

const name = 'eventDetails';

// create a module
export default angular.module(name, [
  'angular-meteor',
  'remarkable',
  eventOrderForm,
  mapLocation,
  uiRouter,
  ngMaterial
]).component(name, {
  templateUrl,
  controller: EventDetailsController
})
  .config(config);

function config($stateProvider, $mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('darkTheme').dark()

  $stateProvider
    .state('event', {
      url: '/event/:eventId',
      template: '<event-details></event-details>'
    });
}
