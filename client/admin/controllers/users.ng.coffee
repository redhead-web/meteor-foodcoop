angular.module("food-coop").controller "UsersAdminCtrl", ($scope, $meteor, $stateParams) ->

  $scope.perPage = 2
  $scope.page = 1
  $scope.sort = "createdAt": -1
  $scope.orderProperty = '-1'
  $scope.searchstring = ''

  $scope.round = (num) ->
    result = Math.round(num)
    result = 1 if result == 0
    result

  $scope.subscribe 'user-list', =>
    return [{
        limit: parseInt $scope.getReactively 'perPage'
        skip:  parseInt($scope.getReactively('page') - 1) * $scope.getReactively 'perPage'
        sort:  {createdAt: $scope.getReactively('sort.createdAt')}
      }, $scope.getReactively 'searchstring']

  $scope.helpers
    users: () =>
      Meteor.users.find
        'profile.name':
          '$regex': ".*#{$scope.getReactively('searchstring')}" or '' + '.*'
          '$options': 'i'
      ,
        sort: {createdAt: $scope.getReactively('sort.createdAt')}
    filteredUserCount: () => Counts.get 'filteredUserCount'
    userCount: () => Counts.get 'userCount'



  $scope.pageChanged = (page) ->
    $scope.page = page
    return

  return
