cashOrdersController = ($scope, $reactive) ->
  "ngInject";
  $reactive(this).attach($scope)
  
  @subscribe 'cash-orders'
  
  @sort = dateCreated: -1
  
  @helpers 
    orders: ->
      Orders.find {cashAmount: $gt: 0}, sort: @getReactively('sort')
      
  @autorun =>
    orders = Orders.find({cashAmount: $gt: 0}).fetch()
    @totalNotDeposited = _.reduce(orders, ((total, order) ->
      if !order.cashDeposited
        total += order.cashAmount
      total
    ), 0)
    return
      
  @deposit = () =>
    @call 'depositMoneyForOrders', (error, result) ->
      if error
        console.error error
  @save = (order) =>
    Orders.update order._id, $set: 
      cashDeposited: order.cashDeposited
      dateDeposited: new Date()
  return
  

angular.module('food-coop').component 'cashOrders', 
  templateUrl: 'client/admin/components/cash-orders/cash-orders.ng.html'
  controller: cashOrdersController