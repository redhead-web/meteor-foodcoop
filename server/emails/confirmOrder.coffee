import moment from 'moment'


Meteor.methods
  confirmOrder: (items, order)->
    user = Meteor.users.findOne(order.user)
    invoiceNumber = Random.id(6)
    dataObject =
      order: order
      customerNumber: user.profile.customerNumber
      items: items
      recipient: user.profile.name
      number: invoiceNumber
      date: moment().format('dddd, MMMM Do YYYY')

    # if order.deliveryDay #must have been from POS
    #   Mailer.send
    #     to: "#{user.profile.name} <#{user.emails[0].address}>"
    #     subject: "Receipt: Whangarei Food Co-op #{invoiceNumber}"
    #     template: "orderReceiptPOS"
    #     data: dataObject
    # else

    dataObject.items = _.map (_.groupBy items, 'deliveryDay'), (sales, deliveryDay) ->
      deliveryDay: deliveryDay,
      sales: sales

    console.log dataObject.items
      # [ [ 'Tue Aug 09 2016 00:00:00 GMT+1200 (NZST)', [ [Object] ] ] ]
      # { 'Tue Aug 09 2016 00:00:00 GMT+1200 (NZST)':
      #    [ { productId: 'sWxb8n8rQaGXXkmEp',
      #        qty: 1,
      #        producerId: 'tehFiajdgTsyF5JN8',
      #        producerName: 'Mike Shaw',
      #        producerNumber: 2,
      #        price: 4.55,
      #        productName: 'A grade Carrots',
      #        packagingDescription: null,
      #        packagingRefund: 0,
      #        unitOfMeasure: '250g',
      #        orderId: 'BxAkdhWgKeH9uWMNd',
      #        deliveryDay: Tue Aug 09 2016 00:00:00 GMT+1200 (NZST),
      #        customerId: 'KBDvra4z9F3iWea4Q',
      #        customerName: 'Sean and Rowan Stanley',
      #        customerNumber: 1,
      #        extraMarkup: null,
      #        daysNotice: 7,
      #        dateCreated: Wed Jul 27 2016 10:18:58 GMT+1200 (NZST),
      #        status: 'undelivered' } ] }

      #[{deliveryDay: Date, sales: [array]}]

    Mailer.send
      to: "#{user.profile.name} <#{user.emails[0].address}>"
      subject: "Whangarei Food Co-op Order Confirmation #{invoiceNumber}"
      template: "confirmOrderEmail"
      data: dataObject
