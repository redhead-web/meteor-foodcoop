import angular from 'angular';
import template from './contact-list.ng.html';

const name = 'contactList';

angular.module('food-coop').component(name, {
  template,
});

export default name;
