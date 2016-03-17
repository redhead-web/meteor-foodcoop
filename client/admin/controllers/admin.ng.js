angular.module("food-coop").controller("AdminCtrl", function($scope, $reactive) {
  $reactive(this).attach($scope);

  this.subscribe('userCount');
  this.subscribe('orderCount');
  this.subscribe('product-count');

  this.helpers({
    userCount: () => Counts.get('userCount'),
    ordersCount: () => Counts.get('upcoming-ordersCount'),
  });
  
  this.autorun(()=> {
    this.productsCount = Products.find().count()
  });
  
});
