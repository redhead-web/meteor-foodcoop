
function productGalleryController ($scope, $state, $auth, $reactive) {
  $reactive(this).attach($scope)

  this.store = $scope.store

  this.go = $state.go;
  
  this.helpers({
    products() {
      let q = {}

      if (this.getReactively('query.category') ) q.category = this.query.category;
      
      if (this.getReactively('query.producer') ) q.producer = this.query.producer;

      if ( Meteor.userId() ) {
        let favourites, lastOrder;

        if (this.getReactively('query.favourites') || this.getReactively('query.lastOrder')) {
          favourites = Meteor.users.findOne(Meteor.userId()).profile.favourites;
          lastOrder = Meteor.users.findOne(Meteor.userId()).profile.lastOrder;
          if (this.store.favourites && this.store.lastOrder) {
            q._id = {
              $in: _.union(favourites, lastOrder)
            };
          }
          if (this.store.favourites) {
            q._id = {
              $in: favourites
            };
          }
          if (this.store.lastOrder) {
            q._id = {
              $in: lastOrder
            };
          }
        }
      }

      console.log(q)
      return Products.find(q)
    }
  });

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
    Meteor.users.update(Meteor.userId(), update)
  }
  
  function isFavourite(id) {
    if ( Meteor.userId() ) {
      return _.include(Meteor.user().profile.favourites, id) ? 'favourite' : 'not-favourite'
    }
  }

  return this;
}


angular.module('food-coop').component('productGallery', {
  templateUrl: 'client/products/components/product-cards.ng.html',
  controller: productGalleryController,
  controllerAs: 'card',
  bindings: {
    query: '<',
    options: '<',
    markup: '<'
  }
})