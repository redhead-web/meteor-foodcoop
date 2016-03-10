angular.module('food-coop').controller 'directoryCtrl', ($scope, $state, $reactive, $stateParams, uiGmapGoogleMapApi, $mdToast) ->
  $reactive(this).attach($scope)
  vm = this
  
  vm.subscribe('allLikes')
  vm.subscribe('producers')
  
  vm.helpers
    producers: ->
      query = {}
      options = sort: 'profile.name': 1
      if vm.getReactively('townSearch')?
        query['profile.deliveryAddress.address_components.short_name'] =  vm.getReactively('townSearch')
      if vm.getReactively('sort')?
        options.sort = vm.getReactively('sort')
        
      Meteor.users.find query, options

    towns: ->
      _.uniq Meteor.users.find().map (producer) ->
        if producer.profile.deliveryAddress?
          label: producer.profile.deliveryAddress.address_components[2].short_name
          value: producer.profile.deliveryAddress.address_components[2].short_name
    
  
  
  
