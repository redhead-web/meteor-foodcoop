angular.module("food-collective").controller("ProductCreateCtrl", function($scope){
  $scope.product = {};

  Uploader.finished = imageUploadComplete;

  $scope.products = $scope.$meteorCollection(Products);


  $scope.publish = function() {
    $scope.product.publish = !$scope.product.publish;
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
