/* globals: angular, moment */
angular.module("food-coop").controller("OrdersAdminCtrl", function($scope, $reactive, $state){
  $reactive(this).attach($scope);

  this.cancel = cancel;

  this.deliveryDay = moment( GetDeliveryDay() ).format();

  this.helpers({
    sales: () => Sales.find(),
  });

  // this.customers = _.countBy(this.sales, function(sale) {return sale.customerName});
  // this.producers = _.countBy(this.sales, function(sale) {return sale.producerName});

  this.subscribe('orders', () => {
    return [this.getReactively('deliveryDay')]
  });

  this.autorun(() => {
    this.customers = _.countBy(this.sales, function(sale) {return sale.customerName})
    this.producers = _.countBy(this.sales, function(sale) {return sale.producerName})
  });

  this.user = (query) => {
      return Meteor.users.findOne(query);
  };

  this.lastweek = () => {
    this.deliveryDay = moment(this.deliveryDay).subtract(1, 'weeks').format();
  };
  this.nextweek = () => {
    this.deliveryDay = moment(this.deliveryDay).add(1, 'weeks').format();
  };

  this.occurences = productsCount;

  this.goTo = goTo;

  this.total = total;

  function cancel (sale) {
    Sales.remove(sale._id);
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
    var mk = markup ? Meteor.settings.public.markup / 100 + 1 : 1
    return _.reduce(array, function(total, sale) {
      return total + (sale.price * sale.qty * mk)
    }, 0)
  }

  return this


});
