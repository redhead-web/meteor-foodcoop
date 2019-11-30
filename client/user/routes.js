import angular from 'angular';
import profileEditTemplate from './views/edit.html';
import balanceTemplate from './views/balance.ng.html';
import ordersTemplate from './views/orders.ng.html';
import salesTemplate from './views/sales.ng.html';
import gstTemplate from './views/gst.ng.html';

import loginTemplate from './auth/views/login.ng.html';
import registerTemplate from './auth/views/register.ng.html';
import resetPasswordTemplate from './auth/views/reset-password.ng.html';
import setPasswordTemplate from './auth/views/set-password.ng.html';
import inviteTemplate from './auth/views/invite.ng.html';
import welcomeTemplate from './auth/views/welcome.ng.html';
import paymentmethodsTemplate from './views/payment-methods.ng.html';

angular.module('food-coop').config(($stateProvider) => {
  $stateProvider
    .state('profile.edit', {
      url: '/edit',
      controller: 'EditUserCtrl',
      controllerAs: '$ctrl',
      template: profileEditTemplate, // 'client/user/views/edit.html',
    })
    .state('profile.balance', {
      url: '/balance',
      controller: 'UserBalanceCtrl',
      controllerAs: 'ctrl',
      template: balanceTemplate,
      resolve: {
        subscription($meteor) {
          return $meteor.subscribe('myOrders');
        },
      },
    })
    .state('profile.orders', {
      url: '/orders',
      controller: 'UserOrderCtrl',
      template: ordersTemplate,
    })
    .state('profile.sales', {
      url: '/sales',
      controller: 'UserSalesCtrl',
      controllerAs: 'sales',
      template: salesTemplate,
    })
    .state('profile.gstReceipt', {
      url: '/order/gst/:orderId',
      controller: 'gstReceiptCtrl',
      controllerAs: 'gst',
      template: gstTemplate,
    })
    .state('profile.paymentMethods', {
      url: '/payment-methods',
      controller: 'UserPaymentMethodCtrl',
      controllerAs: '$ctrl',
      template: paymentmethodsTemplate,
      resolve: {
        paymentMethods($meteor) {
          return $meteor.call('findUserPaymentMethods');
        },
      },
    })
    .state('login', {
      url: '/login',
      template: loginTemplate,
      controller: 'LoginCtrl',
      controllerAs: 'lc',
    })
    .state('register', {
      url: '/register',
      template: registerTemplate,
      controller: 'RegisterCtrl',
      controllerAs: 'rc',
    })
    .state('resetpw', {
      url: '/reset-password',
      template: resetPasswordTemplate,
      controller: 'ResetCtrl',
      controllerAs: 'rpc',
    })
    .state('setpw', {
      url: '/reset-password/:token',
      template: setPasswordTemplate,
      controller: 'ActivateCtrl',
      controllerAs: 'ctrl',
    })
    .state('invite', {
      url: '/invite/:token',
      template: inviteTemplate,
      controller: 'ActivateCtrl',
      controllerAs: 'vm',
    })
    .state('welcome', {
      url: '/welcome',
      template: welcomeTemplate,
    })
    .state('logout', {
      url: '/logout',
      resolve: {
        logout($meteor, $state) {
          return $meteor.logout().then(() => {
            $state.go('store');
          }, (err) => {
            console.log('logout error - ', err);
          });
        },
      },
    });
});
