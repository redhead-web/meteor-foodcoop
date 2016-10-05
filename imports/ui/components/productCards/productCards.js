import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/stevezhu:lodash';

import { Products } from '../../../api/products';
import { Likes } from 'meteor/redhead:like-useraccount';

import productCard from '../productCard/productCard';
import templateUrl from './productCards.html';

function productCardsController($scope, $state, $auth, $reactive, $mdMedia) {
  'ngInject';

  const pageSize = $mdMedia('xs') || $mdMedia('sm') ? 24 : 48;

  this.pageSize = pageSize;

  this.limit = pageSize;

  $reactive(this).attach($scope);

  this.subscribe('active-products', () => [{
    name: this.getReactively('query.filter'),
    category: this.getReactively('query.category'),
    producer: this.getReactively('query.producer'),
    favourites: this.getReactively('query.favourites'),
    lastOrder: this.getReactively('query.lastOrder'),
  }, this.getReactively('limit') + pageSize, this.getReactively('options.sort')], (err) => {
    if (err) console.log(err);
    this.productsReady = true;
  });

  this.productsReady = true;

  this.go = $state.go;

  this.helpers({
    products() {
      const q = { price: { $gt: 0 } };

      if (this.getReactively('query.category')) q.category = this.query.category;

      if (this.getReactively('query.producer')) q.producer = this.query.producer;

      if (Meteor.userId()) {
        let favourites;
        let lastOrder;

        if (this.getReactively('query.favourites') || this.getReactively('query.lastOrder')) {
          favourites = _.pluck(
            Likes.find({ liker: Meteor.userId(), category: 'products' }).fetch(), 'likee'
          );
          lastOrder = Meteor.users.findOne(Meteor.userId()).profile.lastOrder;
          if (this.query.favourites && this.query.lastOrder) {
            q._id = {
              $in: _.union(favourites, lastOrder),
            };
          }
          if (this.query.favourites) {
            q._id = {
              $in: favourites,
            };
          }
          if (this.query.lastOrder) {
            q._id = {
              $in: lastOrder,
            };
          }
        }
      }

      return Products.find(q, { sort: this.getReactively('options.sort') });
    },
  });

  this.loadMore = loadMore;

  function loadMore() {
    console.log(Products.find().count());
    if (this.limit <= Products.find().count()) {
      this.limit += pageSize;
      console.log(this.limit);
      // $timeout(()=>{}, 2000)
    }
  }
}
const name = 'productCards';

export default angular.module(name, [productCard.name]).component(name, {
  templateUrl,
  controller: productCardsController,
  controllerAs: name,
  bindings: {
    query: '<',
    options: '<',
  },
});
