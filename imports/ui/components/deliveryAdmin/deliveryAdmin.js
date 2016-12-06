import angular from 'angular';
import { Deliveries } from '../../../api/deliveries';
import { Roles } from 'meteor/alanning:roles';
import { moment } from 'meteor/momentjs:moment';

import templateUrl from './deliveryAdmin.html';

class deliverySettingsAdminController {
  constructor($scope, $reactive, $mdDialog) {
    'ngInject';
    $reactive(this).attach($scope);

    this.deliveryDay = GetNextDeliveryDay().format();

    this.subscribe('deliveries', () => [this.getReactively('deliveryDay')]);

    this.helpers({
      deliveries() {
        return Deliveries.find();
      },
    });
    this.prompt = $mdDialog.prompt;
    this.$mdDialogShow = $mdDialog.show;
  }

  lastweek() {
    this.deliveryDay = moment(this.deliveryDay).subtract(1, 'weeks').format();
  }

  nextweek() {
    this.deliveryDay = moment(this.deliveryDay).add(1, 'weeks').format();
  }

  changeStatus(delivery, status) {
    Deliveries.update(delivery._id, { $set: { status } });
  }
  assignCourier(event, delivery) {
    const courierPrompt = this.prompt()
    .title('Courier Name')
    .textContent('What is the courier\'s name?')
    .placeholder('Margaret')
    .ariaLabel('courier name')
    .targetEvent(event)
    .ok('save')
    .cancel('never mind');

    this.$mdDialogShow(courierPrompt).then((courierName) => {
      Deliveries.update(delivery._id, { $set: { courierName } });
    }, () => {
      console.log('no courier saved');
    });
  }
  archive(delivery) {
    Deliveries.update(delivery._id, { $set: { archived: true } });
  }
}
const name = 'deliveryAdmin';

// function isAdmin(user) {
//   Roles.userIsInRole(user, 'admin');
// }

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: deliverySettingsAdminController,
  controllerAs: name,
}).config(($stateProvider) => {
  'ngInject';
  $stateProvider.state('admin.deliveries', {
    url: '/deliveries',
    template: '<delivery-admin></delivery-admin>',
  });
});
