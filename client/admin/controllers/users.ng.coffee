angular.module("food-collective").controller "UsersAdminCtrl", ($scope, $meteor, $stateParams) ->

  $scope.perPage = 25
  $scope.page = 1
  $scope.sort = "createdAt": -1
  $scope.orderProperty = '-1'
  $scope.searchstring = ''

  $scope.round = (num) ->
    result = Math.round(num)
    result = 1 if result == 0
    result

  $meteor.autorun $scope, ->
    $meteor.subscribe 'user-list',
      limit: parseInt $scope.getReactively 'perPage'
      skip:  parseInt ( ($scope.getReactively 'page') - 1) * $scope.getReactively 'perPage'
      sort:  $scope.getReactively 'sort'
    , $scope.getReactively 'searchstring'
    .then ->
      $scope.userCount = $meteor.object Counts, 'filteredUserCount', false

  $scope.users = $scope.$meteorCollection ->
    searchstring = $scope.getReactively 'searchstring'
    Meteor.users.find {
      'profile.name':
        '$regex': ".*#{searchstring}" or '' + '.*'
        '$options': 'i'
      },
      sort: $scope.getReactively 'sort'


  $scope.pageChanged = (page) ->
    $scope.page = page
    return

  $scope.$watch 'orderProperty', ->
    if $scope.orderProperty
      $scope.sort = { "createdAt": parseInt $scope.orderProperty }
    return

  return
