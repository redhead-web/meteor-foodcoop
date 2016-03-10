angular.module("food-coop").controller("gstReceiptCtrl", function($scope, $reactive, $stateParams){
  $reactive(this).attach($scope);
  
  this.subscribe('gst', () => [$stateParams.orderId]);
  this.subscribe('producers')
  
  this.orderId = $stateParams.orderId;
  
  this.helpers({
    groupedItems() {
      let sales = Sales.find({orderId: $stateParams.orderId}, {sort: {'producerName': 1}}).fetch();
      return _.groupBy(sales, 'producerId')
    },
    items() {
      return Sales.find({orderId: $stateParams.orderId});
    } 
    
  });
  
  this.user = function (id) {
    return Meteor.users.findOne(id);
  };
  
  this.product = function (id) {
    return Products.findOne(id);
  };
  
  this.gstAmount = Meteor.settings.public.gst
  this.coopGST = "123-123-123-123"
  
  this.markup = Meteor.settings.public.markup / 100;
  
  this.getGST = getGST;
  
  this.getMarkup = getMarkup;
  
  this.getTotal = getTotal
  
  function getGST(amount, user) {
    if (user && Meteor.users.findOne(user).profile.gst == null) {
      return 0
    }
    
    if (_.isArray(amount)) {
    
      return _.reduce(amount, function (total, sale) {return total + (sale.price*sale.qty)}, 0) * (this.gstAmount / 100)
    } else {
      return amount * (this.gstAmount / 100)
    }
    
    
  };
  
  function getMarkup(amount) {
    if (_.isArray(amount)) {
      return _.reduce(amount, function (total, sale) {return total + (sale.price*sale.qty)}, 0) * (this.markup)
    } else {
      return amount * (this.markup / 100)
    }
  }
  
  function getTotal(amount) {
    if (_.isArray(amount)) {
      return _.reduce(amount, function (total, sale) {return total + (sale.price*sale.qty)}, 0) * (this.markup + 1)
    } else {
      return amount * (this.markup + 1)
    }
  }
  
  ;
  
});
