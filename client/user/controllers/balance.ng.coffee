angular.module('food-coop').controller 'UserBalanceCtrl', ($scope) ->

  vm = this;

  vm.orders = $scope.$meteorCollection(Orders)

  vm.total = Counts.get('total')

  return vm;

# ---
# generated by js2coffee 2.1.0
