import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import cartSummary from '../cartSummary/cartSummary';
import { Roles } from 'meteor/alanning:roles';
import templateUrl from './navigation.html';

import './style.scss';

function navigationController($mdUtil, $mdSidenav, $log, $state) {
  'ngInject';
  function buildToggler(navID) {
    const debounceFn = $mdUtil.debounce(() => $mdSidenav(navID).toggle().then(
      () => $log.debug(`toggle ${navID} is done`)), 200);
    return debounceFn;
  }
  this.toggleRight = buildToggler('right');
  this.isProducer = user => Roles.userIsInRole(user, 'producer');
  this.goTo = (route, params) => $state.go(route, params);
}

const name = 'navigation';

export default angular.module(name, [ngMaterial, uiRouter, cartSummary.name]).component(name, {
  controller: navigationController,
  controllerAs: 'nav',
  templateUrl,
});
