import angular from 'angular';
import { Roles } from 'meteor/alanning:roles';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import moment from 'moment-timezone';
import { name as fcImgUpload } from '../fcImgUpload/fcImgUpload';
import { name as remarkable } from '../remarkable/remarkable';


import templateUrl from './eventCreate.html';

import { Events } from '../../../api/events';


class EventCreateController {
  constructor($scope, $reactive) {
    'ngInject';

    this.event = {};
    $reactive(this).attach($scope);
  }

  timeChange() {
    const timeMoment = moment(this.time);
    this.event.date = moment(this.event.date)
    .hour(timeMoment.hour())
    .minute(timeMoment.minute())
    .startOf('hour')
    .toDate();
  }

  imgSelected(data) {
    this.event.img = {
      result: data.data.public_id,
      url: data.data.secure_url,
    };
  }

  imgError(error) {
    this.errorMessage = error.message;
    console.log(error.message);
  }

  deleteImg() {
    this.event.img = undefined;
  }

  onSubmit() {
    Events.insert(this.event, this.$bindToContext((err) => {
      if (err) {
        this.errorMessage = err.message;
        console.error(err);
      } else {
        this.event = {}; // reset form
      }
    }));
  }
}

const name = 'eventCreate';

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('createEvent', {
      url: '/new-event',
      template: '<event-create></event-create>',
      resolve: {
        admin($auth) {
          $auth.requireValidUser(isAdmin);
        },
      },
    });
}


// create a module
export default angular.module(name, [
  'angular-meteor',
  'angular-meteor.auth',
  remarkable,
  fcImgUpload,
  uiRouter,
  ngMaterial,
]).component(name, {
  templateUrl,
  controller: EventCreateController,
})
  .config(config);
