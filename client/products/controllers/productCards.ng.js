angular.module("food-coop").controller("ProductCardsCtrl", function($scope, $state, $mdDialog, $mdToast, $stateParams, $log, $reactive){
  $reactive(this).attach($scope)

  var vm = this

  vm.go = $state.go;

  vm.stateParams = angular.copy($stateParams);
  $log.info($stateParams);

  vm.subscribe('categories');

  vm.helpers({

    user() {return Meteor.user()},

    products() {
      let query = {}
      options = {
        sort: vm.sort
      };
      for(let key in vm.stateParams) {
        if (vm.stateParams[key] != null) {
          query[key] = vm.stateParams[key]
        }
      }
      $log.info(vm.stateParams)
      return Products.find(query, options)
    },
    categories() {
      return Categories.find()
    }

  })

  vm.markup = Meteor.settings.public.markup/100 + 1;

  return vm;

});
