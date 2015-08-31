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
    controller: 'OrderAdminCtrl',
    controllerAs: 'vm',
    resolve: {
      "admin": function($meteor) {
        return $meteor.requireValidUser(isAdmin);
      }
    }
  });
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin')
}
