Templates = {}

Mailer.config
  from: 'Whangarei Food Co-op <sean@foodcoop.nz>'
  replyTo: 'Whangarei Food Co-op <sean@foodcoop.nz>'
  testEmail: "sean@maplekiwi.com" 

Templates.newProduct =
  path: 'notifications/new-product.html'
  route: path: '/notification/new-product'

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
  route: path: '/contact'
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
  route: path: '/confirmation'

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
      deliveryDay: () ->
        GetNextDeliveryDay().calendar null,
          nextDay : '[Tomorrow]',
          sameDay : '[Today]',
          nextWeek : '[this] dddd',
          sameElse : 'dddd MMMM DD, YYYY'
      nextDeliveryDay: () ->
        GetNextDeliveryDay().calendar null,
          nextDay : '[Tomorrow]',
          sameDay : '[Today]',
          nextWeek : '[next] dddd',
          sameElse : 'dddd MMMM DD, YYYY'
      duration: () ->
        #similar to userCartCtrl weeksRemaining function
        end = moment(@end_date).startOf('day');
        weeks = Math.abs moment(end).diff(moment(@start_date).startOf('day'), 'weeks')
        if (weeks == 0)
          weeks++
        "#{weeks} weeks"
        
      currency: (amount) ->
        return "$#{amount.toFixed(2)}"

      totalPrice: () ->
          Markup(this).total()
          
      saleTotal: () ->
         Markup(this).saleTotal()
         


  # Mailer.send
  #   to: "nobody <nobody@nowhere.com"
  #   subject: "Collect your Order Today"
  #   template: "wholesaleInvoiceEmail"
  #   data: {recipient:"Sean"}
