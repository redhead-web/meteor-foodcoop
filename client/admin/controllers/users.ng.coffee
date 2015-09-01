angular.module("food-collective").controller "usersAdminCtrl", ($scope, $meteor, $stateParams) ->

  $scope.users = $scope.$meteorCollection(Meteor.users).subscribe('admin-user-list')

  return
