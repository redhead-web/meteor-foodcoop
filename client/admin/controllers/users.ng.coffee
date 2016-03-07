angular.module("food-coop").controller "UsersAdminCtrl", ($scope, $meteor, $stateParams) ->

  $scope.perPage = 25
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
        sort:  {
          createdAt: $scope.getReactively('sort.createdAt')
        }
      }, 
      $scope.getReactively 'searchstring'
    ]

  $scope.helpers
    users: () =>
      query = 
        createdAt: $lt: moment().add(1, 'month').toDate() # don't query users we aren't looking for right now.
        'profile.name':
          '$regex': ".*#{$scope.getReactively('searchstring')}" or '' + '.*'
          '$options': 'i'
      
      if $scope.getReactively 'balance'
        query['profile.balance'] = $gt: 0
      
      Meteor.users.find query,
        sort: {createdAt: $scope.getReactively('sort.createdAt')}
    filteredUserCount: () => Counts.get 'filteredUserCount'
    userCount: () => Counts.get 'userCount'



  $scope.pageChanged = (page) ->
    $scope.page = page
    return

  return
