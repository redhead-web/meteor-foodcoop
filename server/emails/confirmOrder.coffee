Meteor.methods
  confirmOrder: (items, data)->
    user = Meteor.users.findOne(@userId)
    invoiceNumber = Random.id(6)
    dataObject =
      order: data
      customerNumber: user.profile.customerNumber
      items: items
      recipient: user.profile.name
      number: invoiceNumber
      date: moment().format('dddd, MMMM Do YYYY')

    Mailer.send
      to: "#{user.profile.name} <#{user.emails[0].address}>"
      subject: "Kai kohekohe Food Co-op Order Confirmation"
      template: "confirmOrderEmail"
      data: dataObject
    
