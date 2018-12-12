import angular from 'angular';

angular.module('food-coop').controller('AdminCtrl', function AdminCtrl($scope, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  this.subscribe('userCount');
  this.subscribe('orderCount');
  this.subscribe('product-count');
  this.subscribe('deliveryCount');

  this.helpers({
    userCount() {
      return Counts.get('userCount');
    },
    ordersCount() {
      return Counts.get('upcoming-ordersCount');
    },
    deliveriesCount() {
      return Counts.get('upcoming-deliveries');
    },
  });

  this.autorun(() => {
    this.productsCount = Products.find().count();
  });
});
