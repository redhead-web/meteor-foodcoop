
Templates = {}


item1 = {
  qty: 3
  productId: Random.id()
  productName: "Chinese Cabbage"
  producerCompanyName: "TRANZ4M"
  price: 2
  unitOfMeasure: 'head'
}
item2 = {
  qty: 3
  productId: Random.id()
  productName: "Tomatoes"
  producerName: "John Smith"
  price: 4
  unitOfMeasure: 'kg bag'
}

mockData =
  event:
    title: "Winter Banquet"
    date: moment().add(14, 'days').hour(18).minute(0).toDate()
    venue:
      url: "https://maps.google.com/?q=116+Bank+St,+Whangarei,+Whangarei+0110,+New+Zealand&ftid=0x6d0b7ee676f0c53f:0xc24b489cac7be538"
      formatted_address: "116 Bank St, Whangarei, Whangarei 0110, New Zealand"
    ticketPrice: 30
    fbEventId: "test"
    img:
      result: "kaikohe/baker-858401_640_kvne9r"
      url: "https://res.cloudinary.com/foodcoop/image/upload/v1463684961/kaikohe/baker-858401_640_kvne9r.jpg"
  # [ [ 'Tue Aug 09 2016 00:00:00 GMT+1200 (NZST)', [ [Object] ] ] ]
  items: [
    { deliveryDay: 'Tue Aug 09 2016 00:00:00 GMT+1200 (NZST)', sales: [ item1, item2 ] }
    { deliveryDay: 'Tue Aug 16 2016 00:00:00 GMT+1200 (NZST)', sales: [ item1, item2 ] }
  ]

Mailer.config
  from: 'Whangarei Food Co-op <sean@foodcoop.nz>'
  replyTo: 'Whangarei Food Co-op <sean@foodcoop.nz>'
  testEmail: "sean@maplekiwi.com"

Templates.eventReminder =
  path: 'events/eventReminder/eventReminder.html'
  css: 'events/eventReminder/eventReminder.css'
  route:
    path: '/event-reminder'
    data: ->
      event: mockData.event
      recipient:
        name: "Sean Stanley"

Templates.ticketSale =
  path: 'events/ticketSales/ticket-sales.html'
  css: "events/ticketSales/ticketSales.css"
  helpers:
    ticketLoop: () ->
      this.recipient.qty
      array = []
      for i in [1..this.recipient.qty]
        array.push i
      return array
  route:
    path: '/ticket-sale'
    data: ->
      event: mockData.event
      recipient:
        name: "Sean Stanley"
        qty: 4
        email: 'sean@maplekiwi.com'
        timestamp: moment().toDate()

Templates.newProduct =
  path: 'notifications/new-product.html'
  route: path: '/notification/new-product'

Templates.newMember =
  path: 'user/registration.html'
  route:
    path: '/new-user'
    data: ->
      {
        recipient: "Sean Stanley"
        userId: Meteor.users.findOne()._id
        producer: true
      }


Templates.earlyFavouritedShoppingReminder =
  path: 'notifications/early-favourited-shopping-reminder.html'
  route:
    path: '/notification/early-favourited-reminder'
    data: ->
      preview = "Quick reminder to order some products you care about from us."
      recipient =
        profile:
          name: 'sean stanley'
        emails:
          [address: 'sean@maplekiwi.com']
        products: Products.find({}, {
          limit: 7
          sort: dateCreated: -1
          fields:
            name:                   1
            producer:               1
            producerName:           1
            producerCompanyName:    1
            img:                    1
            price:                  1
            stocklevel:             1
            unitOfMeasure:          1
        }).fetch()

      return {
        recipient
        preview
      }

Templates.earlyLikesProducerShoppingReminder =
  path: 'notifications/early-likes-producer-shopping-reminder.html'
  route:
    path: '/notification/early-like-reminder'
    data: ->
      preview = "Please consider supporting your favourite producers this week"
      producers = []

      Products.find({producer: $in: ["W8JhypuXX9FvfdjtK", "3vvohDQRBsGo5a9Az", "tehFiajdgTsyF5JN8"]}, {
        limit: 10
        sort: dateCreated: -1
        fields:
          name:                   1
          producer:               1
          producerName:           1
          producerCompanyName:    1
          img:                    1
          price:                  1
          stocklevel:             1
          unitOfMeasure:          1
      }).forEach (product) ->
          producer = Meteor.users.findOne _id: product.producer, {fields: 'profile.name': 1, 'profile.companyName': 1}

          unless producer
            return
          idx = _.findIndex(producers, '_id', producer._id)
          if idx != -1
            producers[idx].products.push product
          else
            producer.products = [product]
            producer.name = producer.profile.name
            producer.companyName = producer.profile.companyName
            producers.push producer

          return

      console.log producers

      recipient =
        profile:
          name: 'sean stanley'
        emails:
          [address: 'sean@maplekiwi.com']
        producers: producers

      return {preview, recipient}

Templates.lastCallReminder =
  path: 'notifications/shopping-reminder.html'
  route: path: '/notification/shopping-reminder'

Templates.contactMessage =
  path: '/contact/contact-email.html'
  route:
    path: '/contact'
    data: ->

      return {
        email: 'rowan@corymbosa.me'

      }

Templates.soldOutMessage =
  path: 'products/sold-out.html'
  route: path: '/sold-out'

Templates.wholesaleInvoiceEmail =
  path: 'invoice/invoice-email.html'
  scss: 'invoice/invoice-email.scss'
  route: path: '/invoice'

Templates.orderReceiptPOS =
  path: 'order/receipt-email.html'
  route: path: '/receipt'

Templates.confirmOrderEmail =
  path: 'order/confirmation-email.html'
  helpers:
    producerTitle: () ->
      this.producerCompanyName || this.producerName
  route:
    path: '/confirmation'
    data: ->
      return {
        order: {}
        customerNumber: 1
        items: mockData.items
        recipient: 'Sean Stanley'
        number: 333
        date: moment().format('dddd, MMMM Do YYYY')
      }

Templates.subscriptionConfirmation =
  path: 'order/subscription-confirmation-email.html'
  route: path: 'subscribe-confirmation'

Templates.hubReminder =
  path: 'hub/hub-reminder.html'
  route: path: 'hub'

Templates.applications =
  path: 'apply/producer-application.html'
  route: path: 'producer-application'

Templates.salesNotification =
  path: 'order/sales-notification.html'
  route: path: 'sales-notification'

Templates.salesSummary =
  path: 'order/sales-summary-email.html'
  route: path: 'sales-notification'

calendarFormat =
  nextDay : '[Tomorrow]',
  sameDay : '[Today]',
  nextWeek : '[this] dddd',
  sameElse : 'dddd MMMM DD, YYYY'

Meteor.startup ->
  Mailer.init
    templates: Templates
    layout:
      name:'emailLayout'
      path: 'email-layout.html'
      scss: 'email-layout.scss'
    helpers:
      coopName: "Whangarei Food Co-op"
      bankAccount: Meteor.settings.public.bankAccount
      css: () ->
        """
          @media screen and (max-width: 600px) {
            .body {
              max-width: 90%;
            }
          }

        """
      rootUrl: () ->
        return process.env.ROOT_URL || Meteor.settings.ROOT_URL || "http://localhost:3000"
      # GSTNumber: "113-091-103"
      producerTitle: (companyName, name) ->
        if companyName?
          return companyName
        else
          return name
      productDeliveryDay: () ->
        if this.deliveryDay
          moment(this.deliveryDay).format()
        else
          GetProductDeliveryDay(this.details.daysNotice).format()
      calendar: (date) ->
        moment(date).calendar null, calendarFormat
      deliveryDay: () ->
        GetNextDeliveryDay().calendar null, calendarFormat
      nextDeliveryDay: () ->
        GetNextDeliveryDay().calendar null, calendarFormat
      duration: () ->
        #similar to userCartCtrl weeksRemaining function
        end = moment(@end_date).startOf('day');
        weeks = Math.abs moment(end).diff(moment(@start_date).startOf('day'), 'weeks')
        if (weeks == 0)
          weeks++
        "#{weeks} weeks"

      currency: (amount) ->
        return "$#{amount.toFixed(2)}"

      productPrice: () ->
        Markup(this).total()
      totalPrice: () ->
          Markup(this).total()

      saleTotal: () ->
         Markup(this).saleTotal()
      formatDate: (date, format) ->
        moment(date).format(format)



  # Mailer.send
  #   to: "nobody <nobody@nowhere.com"
  #   subject: "Collect your Order Today"
  #   template: "wholesaleInvoiceEmail"
  #   data: {recipient:"Sean"}
