// import angular from 'angular'
import ngMaterial from 'angular-material'
import templateUrl from './eventOrderForm.html'

class EventsOrderFormController {
  constructor($mdToast) {
    'ngInject';
    this.toastMaker = (message, duration=4000) =>
      $mdToast.show($mdToast.simple().content(message).position('bottom left').hideDelay(duration))
  }

  onSuccess(message, duration) {
    this.toastMaker(message, duration)
  }

  onError(error) {
    console.error(error)
    this.toastMaker("something went wrong!", duration)
  }

}

const name = 'eventOrderForm';

// create a module
export default angular.module(name, [
  ngMaterial
]).component(name, {
  bindings: {event: "<"},
  templateUrl,
  controller: EventsOrderFormController
})
