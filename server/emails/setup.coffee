Templates = {}

Mailer.config
  from: 'Whangarei Food Co-op <sean@foodcoop.nz>'
  replyTo: 'Whangarei Food Co-op <sean@foodcoop.nz>'

Templates.contactMessage = 
  path: 'contact/contact-email.html'
  route: path: 'contact'
  
Templates.soldOutMessage = 
  path: 'products/sold-out.html'
  route: path: 'sold-out'

Templates.wholesaleInvoiceEmail =
  path: 'invoice/invoice-email.html'
  scss: 'invoice/invoice-email.scss'
  route: path: 'invoice'

Templates.confirmOrderEmail =
  path: 'order/confirmation-email.html'
  route: path: 'confirmation'

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

Meteor.startup ->
  Mailer.init
    templates: Templates
    layout:
      name:'emailLayout'
      path: 'email-layout.html'
      scss: 'email-layout.scss'
    helpers:
      companyName: "Whangarei Food Co-op"
      bankAccount: Meteor.settings.public.bankAccount
      rootUrl: () ->
        return process.ROOT_URL || "http://localhost:3000"
      # GSTNumber: "113-091-103"
      deliveryDay: () ->
        day = GetDeliveryDay()
        moment(day).calendar null,
          nextDay : '[Tomorrow]',
          sameDay : '[Today]',
          nextWeek : '[this] dddd',
          sameElse : 'dddd MMMM dd, yyyy'
      duration: () ->
        #similar to userCartCtrl weeksRemaining function
        end = moment(@end_date).startOf('day');
        weeks = Math.abs moment(end).diff(moment(@start_date).startOf('day'), 'weeks')
        if (weeks == 0)
          weeks++
        "#{weeks} weeks"

      totalPrice: () ->
          Markup(this).total()
          
      saleTotal: () ->
         Markup(this).saleTotal()
         


  # Mailer.send
  #   to: "nobody <nobody@nowhere.com"
  #   subject: "Collect your Order Today"
  #   template: "wholesaleInvoiceEmail"
  #   data: {recipient:"Sean"}
