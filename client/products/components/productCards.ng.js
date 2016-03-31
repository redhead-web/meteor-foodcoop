
function productCardsController ($scope, $state, $auth, $reactive, $mdMedia, $timeout) {
  
  "ngInject";
  
  const pageSize = $mdMedia('xs') ? 12 : $mdMedia('sm') ? 24 : 36;
  
  this.pageSize = pageSize;
    
  this.limit = pageSize;
  
  $reactive(this).attach($scope)
  
  // this.subscribe('active-products', () => [this.getReactively('query', true), this.getReactively('limit'), this.getReactively('options.sort')])
  
  this.subscribe('all-active-products')

  this.go = $state.go;
  
  this.helpers({
    products() {
      let q = {price: {$gt: 0} }

      if (this.getReactively('query.category') ) q.category = this.query.category;

      if (this.getReactively('query.producer') ) q.producer = this.query.producer;

      if ( Meteor.userId() ) {
        let favourites, lastOrder;

        if (this.getReactively('query.favourites') || this.getReactively('query.lastOrder')) {
          //favourites = Meteor.users.findOne(Meteor.userId()).profile.favourites;
          favourites = _.pluck(Likes.find({liker: Meteor.userId(), category: 'products'}).fetch(), 'likee');
          lastOrder = Meteor.users.findOne(Meteor.userId()).profile.lastOrder;
          if (this.query.favourites && this.query.lastOrder) {
            q._id = {
              $in: _.union(favourites, lastOrder)
            };
          }
          if (this.query.favourites) {
            q._id = {
              $in: favourites
            };
          }
          if (this.query.lastOrder) {
            q._id = {
              $in: lastOrder
            };
          }
        }
      }

      // return Products.find(q, {limit: this.getReactively('limit'), sort: this.getReactively('options.sort') })
      return Products.find(q, {sort: this.getReactively('options.sort') })
    }
  });  
  
  this.loadMore = loadMore;
  
  function loadMore() {
    if (this.limit <= Products.find().count()) {
      this.limit += pageSize;
      console.log(this.limit)
      //$timeout(()=>{}, 2000)
    }
  }
}


angular.module('food-coop').component('productCards', {
  templateUrl: 'client/products/components/product-cards.ng.html',
  controller: productCardsController,
  bindings: {
    query: '<',
    options: '<',
  }
})