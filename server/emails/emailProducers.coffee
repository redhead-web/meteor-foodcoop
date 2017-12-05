import moment from 'moment';


Meteor.methods
  "/email/producerSalesWeeklySummary": ->
    sales = Sales.find deliveryDay: GetNextDeliveryDay(moment().startOf('day').subtract('1', 'day')).toDate() # sales for last week
    console.log sales
    if sales.length > 0
      groupedSales = _.groupBy sales, 'producerId'

      for id, producerSales of groupedSales

        user = Meteor.users.findOne id

        result = Mailer.send
          to: "#{user.profile.name} <#{user.emails[0].address}>"
          replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
          subject: "Whangarei Food Co-op Sales Summary"
          template: "salesSummary"
          data:
            recipient: user.profile.name
            grandTotal: _.reduce(producerSales, ((total, sale) ->
              total + sale.price * sale.qty
            ), 0)
            productCount: _.sum _.pluck producerSales, 'qty'
            sales: producerSales
            products: _.map (_.groupBy producerSales, 'productName'), (array, name) ->
              name: name, count: _.sum _.pluck array, 'qty'

  '/email/producerOrder': ->

    deliveryDay = GetNextDeliveryDay()
    daysNotice = deliveryDay.diff(moment().startOf('day'), 'days') + 1 # +1 is to look for daysNotice from the day before since this happens at midnight.

    saleQuery =
      deliveryDay: GetNextDeliveryDay().toDate()
      daysNotice: daysNotice

    if daysNotice == Meteor.settings.public.shoppingThreshold # today shopping for the delivery day should be closed for the majority of products

      saleQuery.daysNotice = null


    sales = Sales.find saleQuery
    .fetch()

    if sales.length > 0

      groupedSales = _.groupBy sales, 'producerId'

      for id, producerSales of groupedSales

        user = Meteor.users.findOne id

        result = Mailer.send
          to: "#{user.profile.name} <#{user.emails[0].address}>"
          replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
          subject: "Sales Update"
          template: "salesNotification"
          data:
            recipient: user.profile.name
            grandTotal: _.reduce(producerSales, ((total, sale) ->
              total + sale.price * sale.qty
            ), 0)
            productCount: _.sum _.pluck producerSales, 'qty'
            sales: producerSales
            products: _.map (_.groupBy producerSales, 'productName'), (array, name) ->
              name: name, count: _.sum _.pluck array, 'qty'


    else
      console.log "No sales to send out emails for."
