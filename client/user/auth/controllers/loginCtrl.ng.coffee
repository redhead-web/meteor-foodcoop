angular.module("food-coop").controller "LoginCtrl", ($meteor, $state) ->
  vm = this

  vm.credentials =
    email: ''
    password: ''

  vm.error = ''

  vm.login = ->
    $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then ->
      $state.go('store')
    , (err) ->
      vm.error = "Login Error: #{err}"

  vm.facebookLogin = ->
    $meteor.loginWithFacebook
      requestPermissions: ['email']
    .then (result) ->
      console.log(result)
    , (err) ->
      console.error err
      vm.error = "Login Error: #{err}"


  return
