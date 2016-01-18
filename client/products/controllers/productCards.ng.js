angular.module("food-coop").controller("ProductCardsCtrl", function($scope, $state, $auth, $stateParams, $reactive){
  $reactive(this).attach($scope)

  this.store = $scope.store

  this.go = $state.go;

  this.subscribe('categories');

  this.stateParams = $stateParams;

  this.helpers({
    products() {
      let query = {}

      if (this.getReactively('stateParams.category')) query.category = $stateParams.category;

      if ( Meteor.userId() ) {
        let favourites, lastOrder;

        if (this.getReactively('store.favourites') || this.getReactively('store.lastOrder')) {
          favourites = Meteor.users.findOne(Meteor.userId()).profile.favourites || [];
          lastOrder = Meteor.users.findOne(Meteor.userId()).profile.lastOrder || [];
          if (this.store.favourites && this.store.lastOrder) {
            query._id = {
              $in: _.union(favourites, lastOrder)
            };
          }
          if (this.store.favourites) {
            query._id = {
              $in: favourites
            };
          }
          if (this.store.lastOrder) {
            query._id = {
              $in: lastOrder
            };
          }
        }
      }

      console.log(query)
      return Products.find(query)
    }

  });

  this.markup = Meteor.settings.public.markup/100 + 1;

  this.toggleFavourite = toggleFavourite;

  this.isFavourite = isFavourite;

  function toggleFavourite (id) {
    var modifier = '$push'
    let hasFavourite = Meteor.users.findOne({_id: Meteor.userId(), 'profile.favourites': id})
    if (hasFavourite) {
      modifier = '$pull'
    }
    let update = {}
    update[modifier] = {'profile.favourites': id}
    Meteor.users.update({_id: Meteor.userId()}, update)
  }

  function isFavourite(id) {
		if ( Meteor.userId() ) {
			return _.include(Meteor.user().profile.favourites, id) ? 'favourite' : 'not-favourite'
		}
  }

  return this;

});
