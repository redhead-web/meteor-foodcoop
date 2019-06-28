import moment from 'moment'


Meteor.methods
  '/email/producerOrder': ->
    saleQuery =
      deliveryDay: GetNextDeliveryDay().toDate()

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
