saleReducer = (total, sale) ->
  return total + (sale.qty * sale.price)


salesStats = (startDate, endDate) ->
  producerAmount = Sales.find({
    producerId: @userId,
    dateCreated: {
      $lte: new Date(endDate),
      $gte: new Date(startDate),
    },
  }, {fields: {qty:1, price: 1}}).fetch()

  totalSales = Sales.find({
    dateCreated: {
      $lte: new Date(endDate),
      $gte: new Date(startDate),
    },
  }, {fields: {qty:1, price: 1}}).fetch()

  amount = producerAmount.reduce(saleReducer, 0)
  totalAmount = totalSales.reduce(saleReducer, 0)

  return {
    amount: amount,
    ratio: amount/totalAmount,
  }


Meteor.methods
  salesStats: salesStats,
