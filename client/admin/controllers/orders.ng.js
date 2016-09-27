/* globals: angular, moment */
angular.module("food-coop").controller("OrdersAdminCtrl", function($scope, $reactive, $state){
  $reactive(this).attach($scope);

  this.changeStatus = changeStatus;

  this.deliveryDay = GetNextDeliveryDay().format();
  
  this.subscribe('orders', () => {
    return [this.getReactively('deliveryDay')]
  });
  
  this.helpers({
    sales: () => Sales.find()
  });
  
  this.autorun(() => {
    let sales = Sales.find().fetch();    
    this.customers = _.countBy(sales, function(sale) {return sale.customerName})
    
    this.producers = _.countBy(sales, function(sale) {return sale.producerCompanyName || sale.producerName})
  });

  this.lastweek = () => {
    this.deliveryDay = moment(this.deliveryDay).subtract(1, 'weeks').format();
  };
  this.nextweek = () => {
    this.deliveryDay = moment(this.deliveryDay).add(1, 'weeks').format();
  };

  this.occurences = productsCount;

  this.goTo = goTo;

  this.total = total;
  
  this.move = move;
  

  function changeStatus (sale, status) {
    Sales.update(sale._id, {$set: {'status': status} });
  }
  
  this.bulkChange = (status) => {
    let selectedSales = _.filter(this.sales, 'selected')
    
    for (var i = 0; i < selectedSales.length; i++) {
      this.changeStatus(selectedSales[i], status)
    }
  }
  
  function move (sale, week) {
    Sales.update(sale._id, {$set: {
      'deliveryDay': moment(sale.deliveryDay).add(week, 'weeks').toDate()
    }})
  }

  // function search (order) {
  //   if (!this.query) {
  //     return true;
  //   }
  //   if ( order.status.toLowerCase().indexOf(this.query) !=-1 || order.productDetails.name.toLowerCase().indexOf(this.query) !=-1 ) {
  //     return true;
  //   } return false;
  // }

// this filter may hurt performance significantly so may be better to have each
// hub have their own page and subscription using server-side helpers.

  function productsCount (orders) {
    var occurences = {};
    _.each(orders, function(order) {
      var name = order.productName;
      if (occurences.hasOwnProperty(name)) {
        occurences[name] += order.qty
      } else {
        occurences[name] = order.qty
      }
    });

    return occurences;
  }

  function goTo (id) {
    $state.go('admin.order', {orderId: id});
  }

  function total(array, markup) {
    if (markup) {
      return Markup(array).saleTotal()
    }
    
    return _.reduce(array, function(total, sale) {
      if (sale.status !== 'cancelled' && sale.status !== 'refunded') {
        return total + (sale.price * sale.qty)
      }
      return total;
    }, 0)
  }

});
