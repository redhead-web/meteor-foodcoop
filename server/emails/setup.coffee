Templates = {
}

Mailer.config
  from: 'Laura <laura@freshfoodcollective.com>'
  replyTo: 'Laura <laura@freshfoodcollective.com>'
  testEmail: 'Sean Stanley <sean@maplekiwi.com>'
  logger: console

Templates.invoiceEmail =
  path: 'invoice/invoice-email.html'

Templates.confirmOrderEmail =
  path: 'order/confirmation-email.html'

Templates.subscriptionConfirmation =
  path: 'order/subscription-confirmation-email.html'

Templates.hubReminder =
  path: 'hub/hub-reminder.html'

Meteor.startup ->
  console.log Templates
	Mailer.init
    templates: Templates
    layout:
      name:'emailLayout'
      path: 'email-layout.html'
      scss: 'email-layout.scss'
    helpers:
      companyName: "Fresh Food Collective"
      bankAccount: "02-0000-000000-01"
      GSTNumber: "021-030-303"
      duration: () ->
        #similar to userCartCtrl weeksRemaining function
        end = moment(@end_date).startOf('day');
        weeks = Math.abs moment(end).diff(moment(@start_date).startOf('day'), 'weeks')
        if (weeks == 0)
          weeks++
        "#{weeks} weeks"

      price: () ->
          duration = Math.abs moment(@end_date).startOf('day').diff(moment(@start_date).startOf('day'), 'weeks')
          if duration == 0
            duration++
          price = @qty * @productDetails.price * duration
          return "$#{price.toFixed(2)}"

      total: () ->
        #enspired by userCartCtrl total function
        total = _.reduce @items, (t, item) ->
          duration = Math.abs moment(item.end_date).startOf('day').diff(moment(item.start_date).startOf('day'), 'weeks')

          if duration == 0
            duration++
          t += item.qty * item.productDetails.price * duration
        , 0
        total
