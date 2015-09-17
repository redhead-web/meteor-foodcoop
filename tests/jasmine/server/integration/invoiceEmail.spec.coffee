describe 'Invoice Emails', ->

  it 'should have Mailer defined and initiated', ->
    expect(Mailer).toBeDefined()

  it 'should be able to send an invoice email with a valid data context', ->

    invoice =
      recipient: Meteor.users.findOne().profile.name
      number: Random.id(6)
      date: new Date()
      items: [
        {
          productId: Products.findOne()._id
          productDetails: Products.findOne()
          qty: 1
          start_date: new Date()
          end_date: moment().add(2, 'weeks').toDate()
        },
        {
          productId: Products.findOne()._id
          productDetails: Products.findOne()
          qty: 2
          start_date: new Date()
          end_date: moment().add(2, 'weeks').toDate()
        },
      ]

    expect(invoice.recipient).toBeDefined()

    expect(invoice.items[0].productId).toBeDefined()
    expect(invoice.items[0].productDetails.price).toBeDefined()
    expect(invoice.items[0].productDetails.price).toBeDefined()

    # result = Mailer.send
    #   to: "Sean Stanley <sean@maplekiwi.com>"
    #   subject: "Your invoice is here"
    #   template: "invoiceEmail"
    #   data: invoice

    result = Mailer.render('invoiceEmail', invoice)
    console.log result
    expect(result).toBeDefined()
