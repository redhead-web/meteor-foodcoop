isAdmin = (user) ->
  Roles.userIsInRole user, 'admin'

angular.module('food-coop').config ($stateProvider) ->
  $stateProvider.state('admin',
    url: '/dashboard'
    templateUrl: 'client/admin/views/admin.ng.html'
    controllerAs: 'rt'
    controller: 'AdminCtrl'
    resolve:
      'admin': ($auth) ->
        $auth.requireValidUser isAdmin
  ).state('admin.products',
    url: '/products'
    templateUrl: 'client/admin/views/products.ng.html'
    controller: 'ProductsAdminCtrl'
  ).state('admin.users',
    url: '/users'
    templateUrl: 'client/admin/views/users.ng.html'
    controller: 'UsersAdminCtrl'
    resolve: 'admin': ($auth) ->
      $auth.requireValidUser isAdmin
  ).state('admin.createUser',
    url: '/user/new'
    templateUrl: 'client/admin/views/create-user.ng.html'
    controller: 'CreateUserAdminCtrl'
    resolve: 'admin': ($auth) ->
      $auth.requireValidUser isAdmin
  ).state('admin.user',
    url: '/user/:userId'
    templateUrl: 'client/admin/views/user.ng.html'
    controller: 'UserAdminCtrl'
    resolve: 'admin': ($auth) ->
      $auth.requireValidUser isAdmin
  ).state('admin.userOrders',
    url: '/user/:userId/orders'
    templateUrl: 'client/admin/views/user.ng.html'
    controller: 'UserOrdersAdminCtrl'
    controllerAs: 'vm'
    resolve: 'admin': ($auth) ->
      $auth.requireValidUser isAdmin
  ).state('admin.orders',
    url: '/orders'
    templateUrl: 'client/admin/views/orders.ng.html'
    controller: 'OrdersAdminCtrl'
    controllerAs: 'orders'
    resolve: 'admin': ($auth) ->
      $auth.requireValidUser isAdmin
  ).state 'admin.order',
    url: '/order/:orderId'
    templateUrl: 'client/admin/views/order.ng.html'
    controller: 'OrderAdminCtrl'
    controllerAs: 'vm'
    resolve:
      'admin': ($auth) ->
        $auth.requireValidUser isAdmin
  return

# ---
# generated by js2coffee 2.1.0
