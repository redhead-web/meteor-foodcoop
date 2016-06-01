// import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'
import {Roles} from 'meteor/alanning:roles'

import './navigation.html'
import './style.scss'

function navigationController($mdUtil, $mdSidenav, $log, $state) {
  "ngInject";
  var buildToggler, vm;
  vm = this;
  buildToggler = function(navID) {
    var debounceFn;
    debounceFn = $mdUtil.debounce(function() {
      return $mdSidenav(navID).toggle().then(function() {
        return $log.debug("toggle " + navID + " is done");
      });
    }, 200);
    return debounceFn;
  };
  vm.toggleRight = buildToggler('right');
  vm.isProducer = function(user) {
    return Roles.userIsInRole(user, 'producer');
  };
  vm.goTo = function(route, params) {
    return $state.go(route, params);
  };
}

const name = "navigation"

export default angular.module(name, [ngMaterial, uiRouter]).component(name, {
  controller: navigationController,
  controllerAs: 'nav',
  templateUrl: `imports/ui/components/${name}/${name}.html`
})
