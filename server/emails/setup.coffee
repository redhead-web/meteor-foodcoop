Mailer.config
  from: 'Laura <laura@freshfoodcollective.com>'
  replyTo: 'Laura <laura@freshfoodcollective.com>'
  routePrefix: 'emails'
  testEmail: 'Sean Stanley <sean@maplekiwi.com>'
  logger: console

Templates = {}

Templates.invoiceEmail =
  path: 'invoice/invoice-email.html'
  scss: "invoice/invoice-email.scss"

  helpers:
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

Meteor.startup ->
	Mailer.init
    templates: Templates
    helpers:
      companyName: "Fresh Food Collective"
      bankAccount: "02-0000-000000-01"
      GSTNumber: "021-030-303"
