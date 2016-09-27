productPrice = ->
  Markup(this).total().toFixed(2)


SSR.compileTemplate('layout', Assets.getText('ssr/layout.html'));

Template.layout.helpers
  getDocType: ->
    "<!DOCTYPE html>"
  coopName: ->
    Meteor.settings.public.coopName


SSR.compileTemplate 'home', Assets.getText('ssr/home.html')

Template.home.helpers
  productPrice: productPrice
  
SSR.compileTemplate 'product', Assets.getText('ssr/product.html')

Template.product.helpers
  productPrice: productPrice
#
# SSR.compileTemplate 'directory', Assets.getText('ssr/directory.html')

SSR.compileTemplate 'event', Assets.getText('ssr/event.html')


#
# SSR.compileTemplate 'producer', Assets.getText('ssr/producer.html')

