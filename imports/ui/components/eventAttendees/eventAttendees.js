// import angular from 'angular'

import ngMaterial from 'angular-material'


import templateUrl from './eventAttendees.html'
// import './style.scss'


class EventAttendeesController {
  constructor() {
    'ngInject';
    
  }
}

const name = 'eventAttendees';

// create a module
export default angular.module(name, [
  ngMaterial,
]).component(name, {
  templateUrl,
  controller: EventAttendeesController,
  bindings: {
    event: "<",
    onSuccess: "&"
  }
})
  
