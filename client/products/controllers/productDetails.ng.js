angular.module("food-collective").controller("ProductDetailsCtrl", function($scope, $stateParams, $meteor){
  $scope.product = $scope.$meteorObject(Products, $stateParams.productId, false);

  Uploader.finished = imageUploadComplete;

  $scope.publish = function() {
    $scope.product.published = !$scope.product.published;
    $scope.product.save().success(updateCarts).error(function(error) {
      console.warn(error);
    })
  };

  $scope.reset = function() {
    $scope.product.reset();
  };

  function updateCarts() {
    Meteor.users().update({'profile.cart.status': 'active', 'profile.cart.products._id': $scope.product._id}, {
      $set : {'profile.cart.products.$.details': {
        name: $scope.product.name,
        description: $scope.product.description,
        price: $scope.product.price,
        thumb: $scope.product.thumb
      } }
    })
  };

  function imageUploadComplete (index, fileInfo, templateContext) {
    $scope.$apply( function() {
      $scope.product.img = fileInfo.thumbnailBigUrl;
      $scope.product.thumb = fileInfo.thumbnailSmallUrl;
    });
  }
});
