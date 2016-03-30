angular.module("food-coop").controller("MyProductsCtrl", function($scope, $mdDialog, $mdToast, $state){
	$scope.subscribe("my-products");
  
  $scope.helpers({
		products() {
			return Products.find({producer: Meteor.userId() })
		}
	});
  
  $scope.save = function (product, modifier) {
    Products.update(product._id, modifier, function(err, result) {
      if (err) {
        console.error(err);
        $mdToast.simple().content(err.message).position('bottom left').hideDelay(3000);
      } else if (!result) {
        $mdToast.simple().content("sorry, update not saved. Check your connection and try again.").position('bottom left').hideDelay(3000);
      }
      console.log(result)
    })
  };
  
});