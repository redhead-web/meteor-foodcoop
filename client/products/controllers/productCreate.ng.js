angular.module("food-coop").controller("ProductCreateCtrl", function($scope, $reactive, $mdConstant, $mdToast){
  $reactive(this).attach($scope);
	
	var vm = this;
	
	vm.subscribe('certifications');
	vm.subscribe('categories');
	
	vm.helpers({
		categories() {
			return Categories.find()
		},
		certifications() {
			return Certifications.find()
		}
	})
  
  vm.markup = Meteor.settings.public.markup / 100;
  
  vm.product = {
    producer: Meteor.userId(),
    published: true,
    producerName: Meteor.user().profile.name,
    producerCompanyName: Meteor.user().profile.companyName || undefined,
    category: '',
    ingredients: [],
  };

  $scope.$watch('vm.product.producer', (newName, oldName) => {
    if (!!newName) {
      let user = Meteor.users.findOne(newName);
      vm.product.producerName = user.profile.name;
      vm.product.producerCompanyName = user.profile.companyName || undefined;
    }
  })

  vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

  vm.getUnitsOfMeasure = getUnitsOfMeasure;

  vm.categorySearch = categorySearch;

  vm.pluckChip = pluckChip;

  vm.unitsOfMeasure = "L,litre,ml,500ml,g,kg,500g,5kg,10kg,25kg,bag,150g bunch,bunch,head,each,can,jar,container,330ml Bottle,750ml Bottle".split(',')

  vm.addCategory = addCategory;

  vm.save = save;
  
  vm.round = round;
  
  function round(prop, value, model) {
    if (model === 'price' && !vm.product.price) {
      vm[prop] = undefined;
    } else if (model === 'priceWithMarkup' && !vm[model]) {
      vm.product.price = undefined;
    }
    
    if (!vm[prop]) {
      vm[prop] = 0;
    }
    if (value) {
      let val = _.round(value, 2);
      if (prop === 'price') {
        vm.product[prop] = val;
      } else {
        vm[prop] = val;
      }
    }
  }
	
	function reset() {
	  vm.product = {
	    producer: Meteor.userId(),
	    published: true,
	    producerName: Meteor.user().profile.name,
	    producerCompanyName: Meteor.user().profile.companyName || undefined,
	    category: '',
	    ingredients: [],
	  };
	}

  function save () {
    if (!vm.product.hasOwnProperty('_id')) {
      Products.insert(vm.product, (err) => {
			  if (err) {
					console.error(err)
        	return $mdToast.show(
          	$mdToast.simple().content(err.message).position('bottom left').hideDelay(4000)
        	);
			  }
					
			  $mdToast.show(
					$mdToast.simple()
			      .content(`Thank you! ${vm.product.name} successfully added to our store. Add another product?`)
			      .action('YES')
			      .highlightAction(false)
			      .position('bottom left')
				).then(function(response) {
			    if ( response == 'ok' ) {
			      reset();
			    }
			  });
      });
		  
    }
  }

  function addCategory (category) {
    Categories.insert(category)
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

  
});
