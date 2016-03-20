angular.module('food-coop').controller 'ActivateCtrl',
($state, $scope, $stateParams, $reactive) ->
  $reactive(this).attach($scope)
  vm = this
  vm.password = ''
  vm.error = ''

  vm.set = ->
    Accounts.resetPassword $stateParams.token, vm.password, vm.$bindToContext (err) =>
      if err
        vm.error = 'Error reset password - ' + err
        console.error err
      else
        $state.go 'store'
      return
    return

  return

# ---
# generated by js2coffee 2.1.0
