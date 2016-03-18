angular.module("food-coop").controller("ProductDetailsCtrl", function($scope, $stateParams, $mdConstant, $reactive){
  $reactive(this).attach($scope);
  
  this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

  this.priceWithMarkup =  (product) => Markup(product).total();

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
    // isOwner() {
//       if ( Meteor.userId() ) {
//
//         return Meteor.userId() === this.getReactively('product.producer') ? Meteor.userId() : false;
//       }
//     }
  });
  

  // vm.product = $scope.$meteorObject(Products, $stateParams.productId, false);
  this.autorun(() => {
    if (Meteor.userId() && this.getReactively('product._id') != null) {
			if (Meteor.userId() === this.getReactively('product.producer') ) {
				this.isOwner = Meteor.userId()
			} else if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
				this.isOwner = Meteor.userId()
			} else
				this.isOwner = undefined
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
    
    Products.update(this.product._id || $stateParams.productId, {$set: this.product}, function(error, num) {
      if (error) {
        console.warn(error);
      } else if (num != 1) {
        console.log('no product updated')
      }
    });
  };
  
  this.removeImg = (product) => {
    Products.update(this.product._id, {$unset: {img: 1}}, function(error) {
      if (error) {
        console.warn(error);
      }
    });
  };
  
  $scope.$watchCollection(()=> {
    if (this.product && this.product.ingredients) {
      return this.product.ingredients
    }
  }, (nv, ov) => {
    if (this.isOwner) {
      Products.update(this.product._id, {$set: {ingredients: nv}}, function(error, num) {
        if (error) {
          console.warn(error)
        } else if (num != 1) {
          console.log('no product updated')
        }
      })
    }
  })
  
});
