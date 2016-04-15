angular.module("food-coop").controller("gstReceiptCtrl", function($scope, $reactive, $stateParams){
  $reactive(this).attach($scope);
  
  this.subscribe('gst', () => [$stateParams.orderId]);
  
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
  
  
  this.gstAmount = Meteor.settings.public.gst
    
  this.getGST = getGST;
  
  this.getMarkup = (amount) => Markup(amount).markup();
  
  this.getTotal = (amount) => Markup(amount).saleTotal()
  
  function getGST(amount, user) {
    if (user && Meteor.users.findOne(user).profile.gst == null) {
      return 0
    }
    if (_.isArray(amount)) {
      return _.reduce(amount, function (total, sale) {return total + (sale.price*sale.qty)}, 0) * (this.gstAmount)
    } else {
      return amount * (this.gstAmount / 100)
    }
  };
  
});
