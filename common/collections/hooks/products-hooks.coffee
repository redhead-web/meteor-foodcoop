Products.after.update (userId, doc, fieldNames, modifier, options) ->
  if doc.stocklevel <= 0
    if Meteor.isServer
      user = Meteor.users.findOne(doc.producer)
      
      Mailer.send
        to: 'sean@maplekiwi.com' #"#{user.profile.name} <#{user.emails[0].address}>"
        subject: "#{doc.name} is sold out online"
        template: "soldOutMessage"
        data: {product:doc, producer: user}