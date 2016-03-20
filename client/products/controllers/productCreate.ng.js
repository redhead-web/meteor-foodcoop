angular.module("food-coop").controller("ProductCreateCtrl", function($scope, $reactive, $mdConstant, $mdToast){
  $reactive(this).attach($scope);
	
	var vm = this;
	
	vm.subscribe('certifications');
	vm.subscribe('categories');
  vm.subscribe('list-of-producers');
	
	vm.helpers({
		categories() {
			return Categories.find()
		},
		certifications() {
			return Certifications.find()
		},
    producers() {
      return Meteor.users.find()
    }
	})
  
  vm.markup = Meteor.settings.public.markup;
    
  vm.product = {
    producer: Meteor.userId(),
    published: true,
    producerName: Meteor.user().profile.name,
    producerCompanyName: Meteor.user().profile.companyName || undefined,
    category: '',
    ingredients: [],
  };

  vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

  vm.getUnitsOfMeasure = getUnitsOfMeasure;

  vm.categorySearch = categorySearch;

  vm.pluckChip = pluckChip;

  vm.unitsOfMeasure = "L,litre,ml,500ml,g,kg,500g,5kg,10kg,25kg,bag,150g bunch,bunch,head,each,can,jar,container,330ml Bottle,750ml Bottle".split(',')

  vm.addCategory = addCategory;

  vm.save = save;
  
  vm.round = round;
  
  vm.getProducers = getProducers;
  vm.selectedItemChange = selectedItemChange;
  
  function getProducers(query) {
    return Meteor.users.find({
      $or: [
        {'profile.name': {$regex: `.*${query}`, $options: 'i' }},
        {'profile.companyName': {$regex: `.*${query}`, $options: 'i' }}
      ]
    }).fetch()
  }
  
  function selectedItemChange(item) {
    if ( Match.test(item, Object) ) {
      vm.product.producer = item._id
      vm.product.producerName = item.profile.name
      vm.product.producerCompanyName = item.profile.companyName
    }
  }
  
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
