angular.module("food-coop").controller "LoginCtrl", ($state, $reactive, $scope, $timeout) ->
    
  $reactive(this).attach($scope)
  
  vm = this

  vm.credentials =
    email: ''
    password: ''

  vm.error = ''

  vm.login = ->
    Meteor.loginWithPassword vm.credentials.email, vm.credentials.password, vm.$bindToContext (err) ->
      if err 
        vm.error = "Login Error: #{err}"
      else 
        console.log "logged in"
        $state.go('store')
        return
    return

  vm.facebookLogin = ->
    Meteor.loginWithFacebook
      requestPermissions: ['email']
    , vm.$bindToContext (err) ->
      
      if err 
        vm.error = "Login Error: #{err}"
      else 
        console.log "logged in"
        $state.go('store')
        return
    return


  return
