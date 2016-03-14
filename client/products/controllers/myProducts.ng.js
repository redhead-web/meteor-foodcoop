angular.module("food-coop").controller("MyProductsCtrl", function($scope, $mdDialog, $mdToast, $state){
	$scope.subscribe("my-products");
  
  $scope.helpers({
		products() {
			return Products.find({producer: Meteor.userId() })
		}
	});
  
  $scope.save = function (product, modifier) {
    Products.update(product._id, modifier)
  };
  
});