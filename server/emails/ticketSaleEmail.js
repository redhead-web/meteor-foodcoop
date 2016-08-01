Meteor.methods({
  ticketSaleEmail: function(ticketData, event){
    sent = Mailer.send({
      to: `${ticketData.name} <${ticketData.email}>`,
      replyTo: `${Meteor.settings.email.name} <${Meteor.settings.email.address}>`,
      subject: `Your Tickets for the ${event.title}`,
      template: 'ticketSale',
      data: {
        event: event,
        recipient: {
          name: ticketData.name,
          qty: ticketData.qty,
          email: ticketData.email,
          timestamp: moment().toDate(),
        }
      }
    })

    return sent
  }
});
