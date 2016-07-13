angular.module("food-coop").controller("UserSalesCtrl", function($scope, $reactive, $mdDialog){
  let products, counts;
  
  $reactive(this).attach($scope);
  
  if ( moment().day() == Meteor.settings.public.deliveryDayOfWeek ) {
    this.deliveryDay = moment().startOf('day').format();
  } else {
    this.deliveryDay = GetNextDeliveryDay().format();
  }
  
  this.subscribe('mySales', () => [this.getReactively('deliveryDay')])

  this.helpers({
    sales() {
      return Sales.find()
    }
  })

  this.occurrences = productsCount;

  this.forward = forward;

  this.backward = backward;

  this.total = total;

  this.deliveryWording = '';
  
  this.totalSort = totalSort;



  $scope.$watch(() => this.deliveryDay, (newValue) => {
    var isAfter = moment().isBefore(moment(newValue)) || moment().isSame(moment(newValue), 'day');
    if (isAfter) {
      return this.deliveryWording = "to be"
    } else {
      return this.deliveryWording = ""
    }
  })

  function total(array) {
    return _.reduce(array, function(total, sale) {
      let price = 0;
      if (sale.status !== 'refunded') {
        price = sale.price * sale.qty
      }
      return total + price;
    }, 0)
  }

  function forward() {
    this.deliveryDay = moment( this.deliveryDay ).add(1, 'weeks').format();
  }

  function backward() {
    this.deliveryDay = moment( this.deliveryDay ).subtract(1, 'weeks').format();
  }

  function productsCount (sales) {
    var occurences = {};
    _.each(sales, function(sale) {
      var name = sale.productName;
      if (occurences.hasOwnProperty(name)) {
        occurences[name] += sale.qty
      } else {
        occurences[name] = sale.qty
      }
    });

    return occurences;
  }
  
  function totalSort(first) {
    return (first.qty * first.price)
  }

});
