import angular from 'angular';
import { DeliverySettings } from '../../../api/deliverySettings';
import { Deliveries } from '../../../api/deliveries';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { _ } from 'meteor/stevezhu:lodash';
import { moment } from 'meteor/momentjs:moment';

import templateUrl from './deliveryForm.html';

class deliveryFormController {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.deliveryAddress = Meteor.user().profile.deliveryAddress.formatted_address;
    this.deliveryDays = _.keys(_.groupBy(this.items, (item) => {
      let d = item.details.daysNotice;
      if (d === null) {
        d = Meteor.settings.public.shoppingThreshold;
      }
      return GetProductDeliveryDay(d).format();
    }));

    this.subscribe('deliverySettings');
    this.subscribe('myDeliveries');

    this.helpers({
      deliveryOptions() {
        return DeliverySettings.find();
      },
      deliveries() {
        return Deliveries.find({ userId: Meteor.userId() });
      },
    });
    this.autorun(() => {
      this.deliveryCount = Counts.get('myDeliveriesCount');
    });

    const added = (delivery) => {
      const clone = angular.copy(this.deliveryDays);
      for (let i = 0; i < clone.length; i++) {
        if (moment(clone[i]).isSame(moment(delivery.deliveryDay))) {
          _.remove(this.deliveryDays, (d) => d === moment(delivery.deliveryDay.toISOString()).format());
        }
      }
    };

    Deliveries.find({ userId: Meteor.userId() }).observe({
      added,
    });
  }

  getSelectedText() {
    if (this.selection && this.selection.title) {
      return this.selection.title;
    }
    return 'Select Delivery Option';
  }

  submit(isValid) {
    if (isValid) {
      this.addDelivery({ data: {
        deliveryMethod: this.selection,
        address: this.deliveryAddress,
        deliveryDays: this.deliveryDays,
      } });
      this.show = false;
    }
  }
}
const name = 'deliveryForm';

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: deliveryFormController,
  controllerAs: name,
  bindings: {
    addDelivery: '&',
    items: '<',
  },
});
