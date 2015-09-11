/* Globals: angular, moment */
angular.module("food-collective").controller("OrdersAdminCtrl", function($scope, $rootScope, $meteor, $state){
  self = this;
  self.orders = $scope.$meteorCollection(Subscriptions).subscribe('orders')

  self.user = function (order) { return $meteor.object(Meteor.users, order.user, false); }

  self.hubs = $scope.$meteorCollection(Hubs).subscribe('hubs')
  self.hubFilter = '';

  //self.search = search;
  self.filterByHub = filterByHub;
  self.filterByPresent = filterByPresent;

  self.occurences = productsCount;

  self.goTo = goTo;

  // function search (order) {
  //   if (!self.query) {
  //     return true;
  //   }
  //   if ( order.status.toLowerCase().indexOf(self.query) !=-1 || order.productDetails.name.toLowerCase().indexOf(self.query) !=-1 ) {
  //     return true;
  //   } return false;
  // }

// this filter may hurt performance significantly so may be better to have each
// hub have their own page and subscription using server-side helpers.

  function filterByHub (order) {
    if (!self.hubFilter) return true;
    if (self.user(order).profile.hub.location === self.hubFilter) {
      return true;
    } return false;
  }

  function filterByPresent (order) {
    if (!self.isPresent) return true;
    if (order.indefinate === true) return true;
    if ( moment().isAfter(order.end_date) || moment().isBefore(order.start_date)) return false;
    return true;
  }

  function productsCount (orders) {
    var occurences = {};
    _.each(orders, function(order) {
      var name = order.productDetails.name;
      if (occurences.hasOwnProperty(name)) {
        occurences[name] += order.qty
      } else {
        occurences[name] = order.qty
      }
    });

    return occurences;
  }

  function goTo (id) {
    $state.go('admin.order', {orderId: id});
  }


});
