angular.module("food-collective").controller "usersAdminCtrl", ($scope, $meteor, $stateParams) ->

  $scope.users = ->
    Meteor.users.find {},
      sort: $scope.sort

  $meteor.subscribe 'users-admin',
    limit: parseInt $scope.perPage
    skip: parseInt ($scope.page - 1) * $scope.perPage
    sort: parseInt $scope.sort


  return
