angular.module("food-coop").controller("ProductsListCtrl", function($scope, $rootScope, $meteor, $mdDialog, $mdToast, $state){

  $scope.products = $scope.$meteorCollection(Products);

  $scope.markup = Meteor.settings.public.markup/100 + 1;

});
