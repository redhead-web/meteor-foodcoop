// salesStats.js
import angular from 'angular';
import ngMaterial from 'angular-material';
import moment from 'moment';

import template from './salesStats.html';

export const name = 'salesStats';


class SalesStatsController {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    // setup default GST cycle for stats
    this.amount = 0;
    this.ratio = 0;

    this.endDate = moment().endOf('day').toDate();
    this.startDate = moment().startOf('year').toDate();


    $scope.$watch(() => this.startDate, (newValue, oldValue) => {
      if (!moment(newValue).isSame(oldValue, 'day')) {
        this.getData(newValue, this.endDate);
      }
    });

    $scope.$watch(() => this.endDate, (newValue, oldValue) => {
      if (!moment(newValue).isSame(oldValue, 'day')) {
        this.getData(this.startDate, newValue);
      }
    });

    this.getData(this.startDate, this.endDate);
  }

  getData(startDate, endDate) {
    // TODO: write the salesStats Meteor method

    this.call('salesStats', startDate, endDate, (err, { amount, ratio }) => {
      if (err) {
        console.log(err);
      } else {
        this.amount = amount;
        this.ratio = ratio;
      }
    });
  }

}

export default angular.module(name, [
  ngMaterial,
  'angular-meteor',
]).component(name, {
  template,
  controller: SalesStatsController,
  controllerAs: name,
  bindings: {
    product: '<',
  },
});
