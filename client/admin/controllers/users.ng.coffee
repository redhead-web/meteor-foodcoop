angular.module("food-coop").controller "UsersAdminCtrl", ($scope, $stateParams) ->

  $scope.sort = "createdAt": -1
  $scope.searchstring = ''

  $scope.subscribe 'user-list'

  $scope.helpers
    users: () ->
      sort = $scope.getReactively('sort')
      delete sort.$$mdSelectId
      query =
        'profile.name':
          '$regex': ".*#{$scope.getReactively('searchstring')}" or '' + '.*'
          '$options': 'i'

      if $scope.getReactively 'balance'
        query['profile.balance'] = $gt: 0
        query['roles'] = 'producer'
      
      Meteor.users.find query,
        sort: sort
    
  $scope.autorun ->
    $scope.filteredUserCount = Counts.get 'filteredUserCount'
    $scope.userCount = Counts.get 'userCount'

  $scope.zeroBalance = (id, balance) ->
    Payments.insert
      amount: balance
      user: id
      method: 'internet banking'
      updateBalance: true
    return

  return
