angular.module("food-coop").controller("ProductDetailsCtrl", function($scope, $stateParams, $meteor){
  $scope.product = $scope.$meteorObject(Products, $stateParams.productId, false).subscribe('products');

  Uploader.finished = imageUploadComplete;

  $scope.save = function() {
    $scope.product.save().then(updateCarts, function(error) {
      console.warn(error);
    })
  };

  $scope.reset = function() {
    $scope.product.reset();
  };

  function updateCarts() {
    $meteor.call('editProduct', $scope.product);
  };

  function imageUploadComplete (index, fileInfo, templateContext) {
    $scope.$apply( function() {
      $scope.product.img = fileInfo.thumbnailBigUrl;
      $scope.product.thumb = fileInfo.thumbnailSmallUrl;
    });
  }
});
