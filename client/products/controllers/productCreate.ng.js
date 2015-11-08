angular.module("food-coop").controller("ProductCreateCtrl", function($scope){
  $scope.product = {};

  Uploader.finished = imageUploadComplete;

  $scope.products = $scope.$meteorCollection(Products).subscribe('products');


  $scope.save = function() {
    if (!$scope.hasOwnProperty('_id')) {
      $scope.products.save($scope.product);
    }
  };

  function imageUploadComplete (index, fileInfo, templateContext) {
    $scope.$apply( function() {
      $scope.product.img = fileInfo.thumbnailBigUrl;
      $scope.product.thumb = fileInfo.thumbnailSmallUrl;
    });
  }
});
