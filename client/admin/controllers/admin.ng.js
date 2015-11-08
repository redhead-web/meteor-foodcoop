angular.module("food-coop").controller("AdminCtrl", function() {
  var self = this;
  self.userCount = Counts.get('userCount');
  self.ordersCount = Counts.get('upcoming-ordersCount');
  self.productsCount = Counts.get('product-count');
});
