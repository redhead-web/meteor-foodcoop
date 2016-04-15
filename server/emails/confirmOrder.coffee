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
<<<<<<< HEAD

    Mailer.send
      to: "#{user.profile.name} <#{user.emails[0].address}>"
      subject: "Kai kohekohe Food Co-op Order Confirmation"
      template: "confirmOrderEmail"
      data: dataObject
=======
    
    if data.deliveryDay #must have been from POS
      Mailer.send
        to: "#{user.profile.name} <#{user.emails[0].address}>"
        subject: "Receipt: Whangarei Food Co-op #{invoiceNumber}"
        template: "orderReceiptPOS"
        data: dataObject
    else
    
      Mailer.send
        to: "#{user.profile.name} <#{user.emails[0].address}>"
        subject: "Whangarei Food Co-op Order Confirmation"
        template: "confirmOrderEmail"
        data: dataObject
>>>>>>> whangarei-co-op
    
