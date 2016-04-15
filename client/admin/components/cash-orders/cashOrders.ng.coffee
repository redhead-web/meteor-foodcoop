cashOrdersController = ($scope, $reactive) ->
  "ngInject";
  $reactive(this).attach($scope)
  
  @subscribe 'cash-orders'
  
  @sort = dateCreated: -1
  
  @helpers 
    orders: ->
      Orders.find {}, sort: @getReactively('sort')
      
  @autorun =>
    @totalNotDeposited = _.reduce @orders, (total, order) ->
      unless order.cashDeposited
        total += order
      return total
      
  @deposit = () =>
    @call 'depositMoneyForOrders', (result, error) ->
      if error
        console.error error
  @save = (order) =>
    Orders.update order.id, $set: cashDeposited: order.cashDeposited
  return
  

angular.module('food-coop').component 'cashOrders', 
  templateUrl: 'client/admin/components/cash-orders/cash-orders.ng.html'
  controller: cashOrdersController