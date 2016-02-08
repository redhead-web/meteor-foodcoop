angular.module('food-coop').controller 'directoryCtrl', ($scope, $state, $reactive, $stateParams, uiGmapGoogleMapApi, $mdToast) ->
  $reactive(this).attach($scope)
  vm = this
  
  vm.subscribe('myLikes')
  vm.subscribe('allLikes')
  vm.subscribe('producers')
  
  vm.helpers
    producers: ->
      query = {}
      options = {}
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
    
    liker: ->
      Likes.find liker: Meteor.userId()
  
  
  vm.toggleLike = (likee) ->
    unless Meteor.userId()?
      $mdToast.show $mdToast.simple().content("Please login to endorse this producer").position('bottom left').hideDelay(4000)
      return
    like = Likes.findOne(liker: Meteor.userId(), likee: likee)
    if like?
      Likes.remove(like._id)
      $mdToast.show $mdToast.simple().content("Removed your endorsement").position('bottom left').hideDelay(4000)
    else
      Meteor.call "/likes/add", likee, (err, response) ->
        if (err)
          console.log(err)
        $mdToast.show $mdToast.simple().content("Clap clap! Thanks for your endorsement!").position('bottom left').hideDelay(4000)
        
  vm.likesProducer = (producerId) ->
    like = Likes.findOne(liker: Meteor.userId(), likee: producerId) 
    if like then return 'liked' else return 'not-liked'
    
    
  
  
  return vm
