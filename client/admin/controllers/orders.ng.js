/* global GetNextDeliveryDay, angular, moment, Sales, _, Markup */
/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import includes from 'lodash.includes';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';

class OrdersAdminCtrl {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.deliveryDay = GetNextDeliveryDay().format();

    this.subscribe('orders', () => [this.getReactively('deliveryDay')]);
    this.subscribe('customers', () => [this.getReactively('deliveryDay')]);

    this.helpers({
      sales() {
        return Sales.find();
      },
      customerCollection() {
        return Meteor.users.find();
      },
    });

    this.autorun(() => {
      const sales = Sales.find().fetch();
      this.customers = _.groupBy(sales, sale => sale.customerName);

      this.producers = _.groupBy(sales, sale => sale.producerCompanyName || sale.producerName);
    });
  }

  findCustomer = id => this.customerCollection.find(c => c._id === id)

  changeStatus(sale, status) {
    const location = 'box';
    const locationList = ['fridge', 'freezer'];
    console.log(status);
    Sales.update(sale._id, { $set: { status } });
    if (status === 'sorted' && locationList.indexOf(sale.location) === -1) {
      Sales.update(sale._id, { $set: { location } });
    } else if (status === 'collected') {
      Sales.update(sale._id, { $set: { location } });
    }
  }

  changeLocation(sale, location) {
    const statusList = ['undelivered', 'delivered'];
    Sales.update(sale._id, { $set: { location } });
    if (location === 'box' && statusList.indexOf(sale.status) !== -1) {
      Sales.update(sale._id, { $set: { status: 'sorted' } });
    }
  }

  bulkChange(status) {
    const selectedSales = _.filter(this.sales, 'selected');

    for (let i = 0; i < selectedSales.length; i++) {
      this.changeStatus(selectedSales[i], status);
    }
  }

  move(sale, week) {
    Sales.update(sale._id, { $set: {
      deliveryDay: moment(sale.deliveryDay).add(week, 'weeks').toDate(),
    } });
  }
  allCollected(sales) {
    const doneStatuses = [
      'collected',
      'refunded',
      'cancelled',
    ];
    for (let i = 0; i < sales.length; i++) {
      if (!includes(doneStatuses, sales[i].status)) {
        return false;
      }
    }
    return true;
  }
  sortedCount(sales) {
    const sorted = _.filter(sales, { status: 'sorted' });
    return sorted.length;
  }

  lastweek() {
    this.deliveryDay = moment(this.deliveryDay).subtract(1, 'weeks').format();
  }

  nextweek() {
    this.deliveryDay = moment(this.deliveryDay).add(1, 'weeks').format();
  }

  occurences(orders) {
    const occurences = {};
    _.each(orders, (order) => {
      const name = order.productName;
      if (occurences.hasOwnProperty(name)) {
        occurences[name] += order.qty;
      } else {
        occurences[name] = order.qty;
      }
    });

    return occurences;
  }

  selectSales(sales, ignoreList) {
    for (let i = 0; i < sales.length; i++) {
      if (!includes(ignoreList, sales[i].status)) {
        sales[i].selected = true;
      }
    }
  }

  total(array, markup) {
    const filteredArray = _.filter(array, (sale) => {
      if (sale.status === 'refunded') {
        return false;
      } return true;
    });
    if (markup) {
      return Markup(filteredArray).saleTotal();
    }

    return _.sum(filteredArray, sale => sale.price * sale.qty, 0);
  }

  // getCustomerDetails = async id => new Promise((resolve, reject) => {
  //   const downloadedUser = Meteor.users.findOne(id);
  //   if (downloadedUser) resolve(downloadedUser);
  //   else {
  //     this.call('getBasicUser', id, (err, result) => {
  //       if (err) return reject(err);
  //       return resolve(result);
  //     });
  //   }
  // })
}
const name = 'adminOrders';
angular.module('food-coop').component(name, {
  controller: OrdersAdminCtrl,
  controllerAs: 'orders',
  templateUrl: '/client/admin/views/orders.ng.html',
}).config(($stateProvider) => {
  'ngInject';

  $stateProvider.state('admin.orders', {
    url: '/orders',
    template: '<admin-orders></admin-orders>',
    resolve: {
      admin($auth) {
        return $auth.requireValidUser(user =>
          Roles.userIsInRole(user, 'admin'),
        );
      },
    },
  });
});
