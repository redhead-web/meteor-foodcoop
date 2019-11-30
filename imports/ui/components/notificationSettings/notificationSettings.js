import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import template from './notificationSettings.html';

class notificationSettingsController {
  constructor() {
    'ngInject';

    this.user = Meteor.user();
  }
  save(setting) {
    const update = { $set: {
      [`profile.notifications.${setting}`]: this.user.profile.notifications[setting],
    } };
    console.log(update);
    Meteor.users.update(Meteor.userId(), update);
  }
}
export const name = 'notificationSettings';

export default angular.module(name, []).component(name, {
  template,
  controller: notificationSettingsController,
  controllerAs: name,
});
