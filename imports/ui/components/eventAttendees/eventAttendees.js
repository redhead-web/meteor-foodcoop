// import angular from 'angular'

import ngMaterial from 'angular-material'


import template from './eventAttendees.html'
// import './style.scss'


class EventAttendeesController {
  constructor() {
    'ngInject';
    
  }
}

export const name = 'eventAttendees';

// create a module
export default angular.module(name, [
  ngMaterial,
]).component(name, {
  template,
  controller: EventAttendeesController,
  bindings: {
    event: "<",
    onSuccess: "&"
  }
})
  
