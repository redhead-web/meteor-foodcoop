import angular from 'angular';

import template from './deliverySettingsAdminForm.html';

class deliverySettingsAdminFormController {
  save() {
    if (this.settings._id) {
      return this.onUpdate({ data: this.settings });
    }
    return this.onInsert({ data: this.settings });
  }
}
export const name = 'deliverySettingsAdminForm';

export default angular.module(name, []).component(name, {
  template,
  controller: deliverySettingsAdminFormController,
  controllerAs: name,
  bindings: {
    settings: '<',
    onInsert: '&',
    onUpdate: '&',
  },
});
