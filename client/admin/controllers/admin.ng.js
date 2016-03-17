angular.module("food-coop").controller("AdminCtrl", function($scope, $reactive) {
  $reactive(this).attach($scope);

  this.subscribe('userCount');
  this.subscribe('orderCount');
  this.subscribe('product-count');

  this.subscribe('user-basics'); // makes names available in all admin pages

  this.helpers({
    userCount: () => Counts.get('userCount'),
    ordersCount: () => Counts.get('upcoming-ordersCount'),
    productsCount: () => Counts.get('product-count')
  });
});
