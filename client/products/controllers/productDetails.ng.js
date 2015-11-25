angular.module("food-coop").controller("ProductDetailsCtrl", function($scope, $stateParams, $rootScope, $meteor){

  var vm = this;

  vm.markup = Meteor.settings.public.markup/100 + 1;

  vm.edit = {
    name: false,
    price: false,
    unitOfMeasure: false,
    stocklevel: false,
    description: false
  }

  vm.product = $scope.$meteorObject(Products, $stateParams.productId, false);
  if ($rootScope.currentUser) {
    vm.isOwner = $rootScope.currentUser._id === vm.product.producer || Roles.userIsInRole($rootScope.currentUser._id, 'admin');
  }

  vm.save = function() {
    vm.product.save().then(updateCarts, function(error) {
      console.warn(error);
    })
  };

  $scope.$watch( function() {
    return vm.product.img;
  }, function(n) {
    if (n && !!n.result) {
      vm.save();
    }
  });

  function updateCarts() {
    $meteor.call('editProduct', vm.product);
  };

  return vm;
});
