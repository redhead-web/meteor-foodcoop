angular.module("food-coop").controller("MyProductsCtrl", function($scope, $mdDialog, $mdToast, $state){
	$scope.helpers({
		products() {
			return Products.find({producer: Meteor.userId() })
		}
	});
});