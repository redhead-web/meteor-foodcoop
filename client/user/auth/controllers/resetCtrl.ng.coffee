angular.module('food-coop').controller 'ResetCtrl',
($reactive, $scope, $state, $mdToast) ->
    
  "ngInject";
  
  $reactive(this).attach($scope)
  vm = this
  vm.credentials = email: ''
  vm.error = ''

  vm.reset = ->
    $mdToast.show(
      $mdToast.simple()
      .content('Poof! Check your inbox for the email.')
      .position('top right')
      .hideDelay(3000)
    )
    Accounts.forgotPassword vm.credentials, vm.$bindToContext (err) ->
      if err
        vm.error = 'Error sending forgot password email - ' + err
        console.error err
      else 
        $state.go 'store'
      return
    return
  return


# ---
# generated by js2coffee 2.1.0
