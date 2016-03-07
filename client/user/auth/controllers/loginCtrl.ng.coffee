angular.module("food-coop").controller "LoginCtrl", ($state, $timeout) ->
  
  "ngInject";
  
  vm = this

  vm.credentials =
    email: ''
    password: ''

  vm.error = ''

  vm.login = ->
    Meteor.loginWithPassword vm.credentials.email, vm.credentials.password, (err) ->
      if err 
        vm.error = "Login Error: #{err}"
      else 
        console.log "logged in"
        $timeout ->
          $state.go('store')
        , 10
        return
    return

  vm.facebookLogin = ->
    Meteor.loginWithFacebook
      requestPermissions: ['email']
    , (err) ->
      if err 
        vm.error = "Login Error: #{err}"
      else 
        console.log "logged in"
        $timeout ->
          $state.go('store')
        , 10
        return
    return


  return
