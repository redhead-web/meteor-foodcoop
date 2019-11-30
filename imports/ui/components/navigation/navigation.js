import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import { Roles } from 'meteor/alanning:roles';
import cartSummary from '../cartSummary/cartSummary';
import template from './navigation.html';

import './style.scss';

function navigationController($mdUtil, $mdSidenav, $log, $state) {
  'ngInject';

  this.name = Meteor.settings.public.coopName;

  function buildToggler(navID) {
    const debounceFn = $mdUtil.debounce(() => $mdSidenav(navID).toggle().then(
      () => $log.debug(`toggle ${navID} is done`)), 200);
    return debounceFn;
  }
  this.toggleLeft = buildToggler('left');
  this.isProducer = user => Roles.userIsInRole(user, 'producer');
  this.goTo = (route, params) => $state.go(route, params);
}

export const name = 'navigation';

export default angular.module(name, [ngMaterial, uiRouter, cartSummary.name]).component(name, {
  controller: navigationController,
  controllerAs: 'nav',
  template,
});
