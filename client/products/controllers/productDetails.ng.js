angular.module("food-coop").controller("ProductDetailsCtrl", function($scope, $stateParams, $auth, $reactive){
  $reactive(this).attach($scope);

  this.markup = Meteor.settings.public.markup/100 + 1;

  this.edit = {
    name: false,
    price: false,
    unitOfMeasure: false,
    stocklevel: false,
    description: false,
    packagingDescription: false,
    packagingRefund: false
  }
  
  this.subscribe('product', () => [$stateParams.productId])
  
  this.helpers({
    product() {
      return Products.findOne($stateParams.productId)
    },
    isOwner() {
      if ( Meteor.userId() ) {
        
        return Meteor.userId() === this.getReactively('product.producer') ? Meteor.userId() : false;
      }
    }
  })
  

  // vm.product = $scope.$meteorObject(Products, $stateParams.productId, false);
  this.autorun(() => {
    if (Meteor.userId() && this.product) {
      this.isOwner = Meteor.userId() === this.getReactively('product.producer') || Roles.userIsInRole(Meteor.userId(), 'admin');
    }
  });
  
  this.modelOptions = {
    updateOn: 'default blur',
    debounce: { 
      default: 400, 
      blur: 0 
    } 
  };
  

  this.save = (product, data) => {
    Products.update(this.product._id, {$set: this.product}, function(error) {
      if (error) {
        console.warn(error);
      }
    });
  };

  return this;
});
