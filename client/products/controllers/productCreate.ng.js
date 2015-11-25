angular.module("food-coop").controller("ProductCreateCtrl", function($scope, $rootScope, $mdConstant){
  var vm = this;

  vm.product = {
    producer: $rootScope.currentUser._id,
    published: true,
    producerName: $rootScope.currentUser.profile.name,
    producerCompanyName: $rootScope.currentUser.profile.companyName || undefined,
    categories: [],
    ingredients: [],
  };

  vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

  vm.products = $scope.$meteorCollection(Products);

  vm.categories = $scope.$meteorCollection(Categories, false).subscribe('categories');

  vm.certifications = $scope.$meteorCollection(Certifications, false).subscribe('certifications');

  vm.getUnitsOfMeasure = getUnitsOfMeasure;

  vm.categorySearch = categorySearch;

  vm.pluckChip = pluckChip;

  vm.unitsOfMeasure = "L,litre,ml,500ml,g,kg,500g,5kg,10kg,25kg,bag,150g bunch,bunch,head,each,can,jar,container,330ml Bottle,750ml Bottle".split(',')

  vm.addCategory = addCategory;

  vm.save = save;

  function save () {
    if (!vm.product.hasOwnProperty('_id')) {
      vm.products.save(vm.product);
    }
  };

  function addCategory (category) {
    vm.product.categories.push(category)
  }

  function getUnitsOfMeasure (query) {
    var results = query ? vm.unitsOfMeasure.filter( createFilterFor(query) ) : vm.unitsOfMeasure;
    return results;
  }

  function categorySearch (query) {
    var results = query ? vm.categories.filter(createFilterForCategory(query)) : vm.categories;
    return results;
  }

  function createFilterFor(query) {
    lowercaseQuery = angular.lowercase(query)
    return function filterFn(string) {
      return (string.toLowerCase().indexOf(lowercaseQuery) === 0);
    }
  }

  function createFilterForCategory(query) {
    lowercaseQuery = angular.lowercase(query)
    return function filterFn(object) {
      return (object.name.toLowerCase().indexOf(lowercaseQuery) === 0);
    }
  }

  function pluckChip (chip) {
    if (angular.isObject(chip)) {
      return chip.name
    } else return chip
  }

  return vm
});
