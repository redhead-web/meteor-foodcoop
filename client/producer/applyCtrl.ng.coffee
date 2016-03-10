angular.module('food-coop').controller 'ApplyCtrl', ($scope, $reactive, $state, $mdToast) ->
  $reactive(this).attach($scope)

  vm = this

  vm.application = {}
  
  vm.subscribe 'certifications'

  vm.helpers
    certifications: ->
      return Certifications.find()

  vm.apply = ->
    Meteor.call "apply", vm.application, (error, result) ->
      if error
        console.log "error", error
        $mdToast.show $mdToast.simple().content("something went wrong, please try again.").position('bottom left').hideDelay(4000)
      if result
        $state.go('store')

  
