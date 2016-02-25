Meteor.methods
  '/email/producerOrder': ->
    
    deliveryDay = GetDeliveryDay()
    
    sales = Sales.find
      deliveryDay: new Date deliveryDay
    .fetch()
    
    if sales.length > 0
    
      groupedSales = _.groupBy sales, 'producerId'
      
      for id, producerSales of groupedSales
        
        user = Meteor.users.findOne id
        
        console.log _.sum _.pluck producerSales, 'qty'

        result = Mailer.send
          to: "#{user.profile.name} <#{user.emails[0].address}>"
          replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>>"
          subject: "Sales through Kai Kohekohe Food Co-op for next week"
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
      console.log "No sales to send out orders for."