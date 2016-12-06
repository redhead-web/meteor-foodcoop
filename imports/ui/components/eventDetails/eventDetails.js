// import angular from 'angular'
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import { name as buyTicket } from '../buyTicket/buyTicket';
import { name as mapLocation } from '../mapLocation/mapLocation';
import { name as eventAttendees } from '../eventAttendees/eventAttendees';

import templateUrl from './eventDetails.html';
import './style.scss';

import { Events } from '../../../api/events';

class EventDetailsController {
  constructor($scope, $reactive, $stateParams, $mdMedia) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('event', () => [$stateParams.eventId]);

    if ($stateParams.buy === '1') {
      this.eventView = 'buyTicket';
    }

    this.helpers({
      event() {
        return Events.findOne($stateParams.eventId);
      },
    });

    $scope.$watch(() => $mdMedia('xs'), (xs) => {
      this.xs = xs; // true
    });
  }

  onSuccess(eventView) {
    console.log('eventDetails onSuccess called');
    this.eventView = eventView;
  }

}

const name = 'eventDetails';

// create a module
export default angular.module(name, [
  'angular-meteor',
  'remarkable',
  buyTicket,
  mapLocation,
  eventAttendees,
  uiRouter,
  ngMaterial,
]).component(name, {
  templateUrl,
  controller: EventDetailsController,
})
  .config(($stateProvider, $mdThemingProvider) => {
    'ngInject';
    $mdThemingProvider.theme('darkTheme').primaryPalette('light-green').dark();

    $stateProvider
      .state('event', {
        url: '/event/:eventId?:buy',
        template: '<event-details></event-details>',
      });
  });
