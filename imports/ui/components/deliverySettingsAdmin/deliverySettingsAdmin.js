import angular from 'angular';
import { DeliverySettings } from '../../../api/deliverySettings';
import deliverySettingsAdminForm from '../deliverySettingsAdminForm/deliverySettingsAdminForm';
import { Roles } from 'meteor/alanning:roles';

import templateUrl from './deliverySettingsAdmin.html';

class deliverySettingsAdminController {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    this.subscribe('deliverySettings');

    this.helpers({
      deliverySettings() {
        return DeliverySettings.find();
      },
    });
  }

  insert(data) {
    DeliverySettings.insert(data);
  }
  update(dataId, dataField, dataValue) {
    DeliverySettings.update(dataId, { $set: { [dataField]: dataValue } });
  }
}
const name = 'deliverySettingsAdmin';

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

export default angular.module(name, [deliverySettingsAdminForm.name]).component(name, {
  templateUrl,
  controller: deliverySettingsAdminController,
  controllerAs: name,
}).config(($stateProvider) => {
  $stateProvider.state('admin.deliverySettings', {
    url: '/delivery-settings',
    template: '<delivery-settings-admin></delivery-settings-admin>',
    resolve: { admin($auth) {
      return $auth.requireValidUser(isAdmin);
    } },
  });
});
