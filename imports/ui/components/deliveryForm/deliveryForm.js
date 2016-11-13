import angular from 'angular';

import templateUrl from './deliveryForm.html';

class deliveryFormController {}
const name = 'deliveryForm';

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: deliveryFormController,
  controllerAs: name,
});

