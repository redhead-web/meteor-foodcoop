angular.module('food-coop').controller 'RegisterCtrl', ($scope, $reactive, $state, $mdDialog, $mdMedia) ->
  
  $reactive(this).attach($scope)
  
  vm = this
  vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  vm.credentials =
    email: ''
    password: ''
    profile:
      name: ""
      deliveryAddress: ""
      phone: ""

  vm.error = ''

  vm.role = 'customer'

  vm.prices =
    customer: Meteor.settings.public.shares.customer
    producer: Meteor.settings.public.shares.producer
  
  vm.open = (ev) ->
    useFullScreen = ($mdMedia('sm') or $mdMedia('xs')) and vm.customFullscreen
    $mdDialog.show(
      controller: DialogController
      templateUrl: 'client/user/auth/views/membership.ng.html'
      parent: angular.element(document.body)
      targetEvent: ev
      clickOutsideToClose: true
      fullscreen: useFullScreen).then ((answer) ->
      vm.status = 'You said the information was "' + answer + '".'
      return
    ), ->
      vm.status = 'You cancelled the dialog.'
      return
    $scope.$watch (->
      $mdMedia('xs') or $mdMedia('sm')
    ), (wantsFullScreen) ->
      vm.customFullscreen = wantsFullScreen == true
      return
    return
    

  vm.register = ->
    Accounts.createUser vm.credentials, vm.$bindToContext (err) =>
      if err
        console.log result
      else
        if vm.role == 'producer'
          $state.go 'producer-application'
        else
          $state.go 'store'
      return

  vm.facebookLogin = ->
    Meteor.loginWithFacebook
      requestPermissions: ['email']
    , vm.$bindToContext (err) ->
      if err
        console.error err
        vm.error = "Login Error: #{err}"
      else
        if vm.role == 'producer'
          $state.go 'producer-application'
        else
          $state.go 'profile.edit'
        console.log(result)

  return
  
  
DialogController = ($scope, $mdDialog) ->
  "ngInject";
  
  $scope.prices =
    customer: Meteor.settings.public.shares.customer
    producer: Meteor.settings.public.shares.producer
  
  $scope.hide = ->
    $mdDialog.hide()
    
  $scope.cancel = ->
    $mdDialog.cancel()
  
  $scope.answer = (answer) ->
    $mdDialog.hide(answer)
  
  return


# ---
# generated by js2coffee 2.1.0
