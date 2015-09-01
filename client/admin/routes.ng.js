angular.module('food-collective').config(function($stateProvider) {
  $stateProvider.state('admin', {
    url: '/dashboard',
    templateUrl: 'client/admin/views/admin.ng.html',
    controller: 'AdminCtrl',
    resolve: {
      "admin": function($meteor) {
        return $meteor.requireValidUser(isAdmin);
      },
      'userCount': function($meteor) {
          return $meteor.subscribe('userCount');
      },
      'orderCount': function($meteor) {
          return $meteor.subscribe('orderCount');
      },
      'productCount': function($meteor) {
          return $meteor.subscribe("product-count");
      }
    }
  }).state('admin.members', {
    url: '/users',
    templateUrl: 'client/admin/views/users.ng.html',
    controller: 'UserAdminCtrl',
    resolve: {
      "admin": function($meteor) {
        return $meteor.requireValidUser(isAdmin);
      }
    }
  }).state('admin.orders', {
    url: '/orders',
    templateUrl: 'client/admin/views/orders.ng.html',
    controller: 'OrdersAdminCtrl',
    controllerAs: 'vm',
    resolve: {
      "admin": function($meteor) {
        return $meteor.requireValidUser(isAdmin);
      }
    }
  }).state('admin.order', {
    url: '/order/:orderId',
    templateUrl: 'client/admin/views/order.ng.html',
    controller: 'OrderAdminCtrl',
    controllerAs: 'vm',
    resolve: {
      "admin": function($meteor) {
        return $meteor.requireValidUser(isAdmin);
      },
      "order": function($meteor, $stateParams) {
        return $meteor.subscribe('orders', $stateParams.orderId)
      }
    }
  });
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin')
}
