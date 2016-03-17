  


angular.module('food-coop').component('directoryPage', {
  templateUrl: 'client/directory/views/page.ng.html',
  controller: 'pageCtrl',
  controllerAs: 'ctrl',
})


angular.module('food-coop').controller 'pageCtrl', ($scope, $reactive, $stateParams, uiGmapGoogleMapApi, $mdToast, $window, $timeout) ->
  
  $reactive(this).attach($scope)
  vm = this;
  
  vm.subscribe 'producer', -> 
    [$stateParams.producerId]
  , 
    onReady: ->
      console.log "subscribed to producer"
    onStop: ->
      console.log "stopped subscribing to producer"
  
  vm.subscribe 'active-products', -> [{producer: $stateParams.producerId}, -1, {name: 1}]

  vm.helpers
    likesCount: ->
      Likes.find(likee: $stateParams.producerId)
    products: ->
      Products.find({}, {sort: name: 1})
        
  
  vm.autorun ->
    vm.producer = Meteor.users.findOne $stateParams.producerId
    return
  
  vm.autorun ->
    vm.isOwner = Meteor.userId()? and (Meteor.userId() == $stateParams.producerId || Roles.userIsInRole(Meteor.userId(), 'admin') )
    return
  
  vm.autorun ->
    if Meteor.user()
      list = Meteor.user().profile.lovedProducers or []
      if Meteor.users.findOne($stateParams.producerId._id) in list
        vm.lovesProducer = true
        return
      else
        vm.lovesProducer = false
        return
      
  
  vm.toggleLike = ->
    unless Meteor.userId()?
      $mdToast.show $mdToast.simple().content("Please login to endorse this producer").position('bottom left').hideDelay(4000)
      return
    like = Likes.findOne(liker: Meteor.userId(), likee: vm.producer._id)
    if like?
      Likes.remove(like._id)
      $mdToast.show $mdToast.simple().content("Removed your endorsement").position('bottom left').hideDelay(4000)
    else
      vm.call "/likes/add", vm.producer._id, 'user', (err, response) ->
        if (err)
          console.log(err)
          $mdToast.show $mdToast.simple().content("Clap clap! Thanks for your endorsement!").position('bottom left').hideDelay(4000)
        
  vm.likesProducer = (producerId) ->
    if Likes.findOne(liker: Meteor.userId(), likee: producerId) then return 'liked' else return 'not-liked'

  vm.mapSettings =
    center: {latitude:-35.7251117, longitude: 174.323708}
    zoom: 10
    options: scrollwheel: false
    events: tilesloaded: (map) ->
      uiGmapGoogleMapApi.then (maps) ->
        if vm.producer.profile.deliveryAddress.latitude?
          
          vm.mapSettings.center =
            latitude: vm.producer.profile.deliveryAddress.latitude
            longitude: vm.producer.profile.deliveryAddress.longitude
          
          vm.markerSettings =
            id: $stateParams.producerId
            coords:
              latitude: vm.producer.profile.deliveryAddress.latitude
              longitude: vm.producer.profile.deliveryAddress.longitude
            options: {}
        
        if vm.producer.profile.deliveryAddress.place_id?
          service = new maps.places.PlacesService(map)
          service.getDetails
            placeId: vm.producer.profile.deliveryAddress.place_id
          , (result, status) ->
            $scope.$apply ->

              vm.mapSettings.center =
                latitude: result.geometry.location.lat()
                longitude: result.geometry.location.lng()

              vm.markerSettings =
                id: $stateParams.producerId
                coords:
                  latitude: result.geometry.location.lat()
                  longitude: result.geometry.location.lng()
                options: {}
              return
              
          return
        return


  vm.priceWithMarkup = (product) ->
    return Markup(product).total()
  
  vm.modelOptions = updateOn: 'default blur', debounce: { default: 200, blur: 0 }
  
  _timer = null
  
  vm.save = (profile, data) ->
    Meteor.users.update $stateParams.producerId,
      $set: 
        'profile.companyName': vm.producer.profile.companyName
        'profile.summary': vm.producer.profile.summary
        'profile.bio': vm.producer.profile.bio
        'profile.shareAddress': vm.producer.profile.shareAddress
        'profile.logo': vm.producer.profile.logo
        'profile.banner': vm.producer.profile.banner
        'profile.website': vm.producer.profile.website
        'profile.chemicals': vm.producer.profile.chemicals
    , (err, result) ->
      if err
        console.error err
        $mdToast.show $mdToast.simple().content("Connection Error: Failed to Save").position('bottom left').hideDelay(4000)
    return
  return 
      

# ---
# generated by js2coffee 2.1.0
