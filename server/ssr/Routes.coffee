{Meteor} = require 'meteor/meteor'
{Picker} = require 'meteor/meteorhacks:picker'

css = Assets.getText('ssr/style.css')

defaultImage = "http://res.cloudinary.com/foodcoop/image/upload/OpenGraph_hdnjgg.png"

baseURL = process.env.ROOT_URL || Meteor.settings.ROOT_URL || "http://localhost:3000"

userAgentRegExps = [
  /^facebookexternalhit/i,
  /^Facebot/,
  /^linkedinbot/i,
  /^twitterbot/i,
  /^slackbot-linkexpanding/i
];

seoPicker = Picker.filter((req, res) ->
  escaped_fragment = /_escaped_fragment_/.test req.url
  socialBot = false
  for agent in userAgentRegExps
    socialBot = agent.test req.headers['user-agent']
    if socialBot
      break
  return escaped_fragment or socialBot
)

# oEmbedPicker = Picker.filter (req, res) ->
#   /services\/oembed/.test req.url
#
# oEmbedPicker.route '/', (params, req, res) ->
#   console.log req
#
#   query = req.params
#   if /product\/(\w+)/.test query.url
#     result = /product\/(\w+)/.exec query.url
#     _id = result[1]
#     product = Products.findOne _id
#     res.end
#       provider_name: "Kaikohekohe Food Co-op"
#       url: "https://foodcoop.nz/product/{_id}"
#       title: product.name
#       description: product.description.replace(/([^a-z0-9]+)/gi, "");
#       product_id: _id
#       price: Markup(product).total()
#       currency_code: "NZD"
#       brand: product.producerCompanyName || product.producerName
#       availability: if product.published then 'in stock' else 'out of stock'
#       quantity: product.stocklevel
      

seoPicker.route '/', (params, req, res) ->
  query = 
    published: true
  
  if params.query 
    if params.query.category
      query.category = params.query.category
    
    if params.query.producer
      query.producer = params.query.producer
    
  
  products = Products.find query,
    fields:
      published: 1
      name: 1
      price: 1
      unitOfMeasure: 1
      stocklevel: 1
      img: 1
      description: 1
      producer: 1
      producerName: 1
      producerCompanyName: 1
      category: 1
      daysNotice: 1
      extraMarkup: 1
      dateCreated: 1
    sort: {dateCreated: -1}
    limit: 24
  
  html = SSR.render('layout',
    css: css
    template: 'home'
    data: 
      title: "Fresh Local Quality | Kaikohekohe Food Co-op"
      description: "Kaikohekohe Food Co-op sells fresh, local, quality foods from Whangarei every Tuesday. Support local farmers, enjoy great tasting food."
      og: [
        {key: "title", value: "Kaikohekohe Food Co-op | Fresh Local Quality"}
        {key: "description", value: "Kaikohekohe Food Co-op sells fresh, local, quality foods from 1 Woods Road every Tuesday. Support local farmers, enjoy great tasting food." }
        {key: "url", value: baseURL }
        {key: "image", value: defaultImage }
      ]
      products: products)
  res.end html
  return

seoPicker.route '/product/:productId', (params, req, res) ->
  product = Products.findOne(params.productId)
  html = SSR.render('layout',
    css: css
    template: 'product'
    data: 
      title: product.name
      description: "#{product.name} from #{product.producerCompanyName || product.producerName} for $#{Markup(product).total().toFixed(2)} / #{product.unitOfMeasure}"
      og: [
        {key: 'title', value: "#{product.name} $#{Markup(product).total().toFixed(2)} / #{product.unitOfMeasure}"}
        {key: 'description', value: if product.description then product.description.replace(/(#+)/gi, "").substring(0, 149)}
        {key: 'type', value: 'product'}
        {key: 'url', value: "#{baseURL}product/#{product._id}"}
        {key: "image:width", value: 1200}
        {key: "image:height", value: 630}
        {key: "image",  value: if product.img then "http://res.cloudinary.com/foodcoop/image/upload/w_1200,h_630,c_fill,g_auto/" + product.img.result else defaultImage}
        {key: "brand",value: product.producerCompanyName || product.producerName}
        {key: 'price:amount',value: Markup(product).total()}
        {key: 'price:currency',value: "NZD"}
        {key: "upc",value: product._id}
        {key: "availability",value: 'instock'}
        {key: "category",value: product.category}
      ]
      product: product)
  res.end html
  return
  
  
seoPicker.route '/event/:eventId', (params, req, res) ->
  event = Events.findOne(params.eventId)
  
  
  html = SSR.render('layout',
    css: css
    template: 'event'
    data: 
      title: event.title
      description: "#{event.name} #{moment(event.date).format('dddd, MMMM Do YYYY, h:mm:ss a')} at #{event.venue.formatted_address}"
      ISODate: moment(event.date).toISOString()
      og: [
        {key: 'title', value: event.title}
        {key: 'description', value: if event.description then event.description.replace(/(#+)/gi, "").substring(0, 149)}
        {key: 'type', value: 'place'}
        {key: 'place:location:latitude', value: "-35.721332"}
        {key: 'place:location:longitude', value: '174.320889'}
        {key: 'url', value: "#{baseURL}event/#{event._id}"}
        {key: "image:width", value: 1200}
        {key: "image:height", value: 630}
        {key: "image",  value: if event.img then "http://res.cloudinary.com/foodcoop/image/upload/w_1200,h_630,c_fill,g_auto/" + event.img.result else defaultImage}
        {key: "brand",value: "Kaikohekohe Food Co-op"}
        {key: 'price:amount',value: event.ticketPrice}
        {key: 'price:currency',value: "NZD"}
        {key: "upc",value: event._id}
        {key: "availability",value: 'instock'}
      ]
      event: event.title)
  res.end html
  return
  
# seoPicker.route '/directory', (params, req, res) ->
#   users = Meteor.users.find(roles: 'producer')
#   html = SSR.render('layout',
#     css: css
#     template: 'directory'
#     data:
#       title: "Farmers, Growers and Foodies of the Kaikohekohe Food Co-op"
#       description: "Contact Farmers, Growers and Foodies about local food in Whangarei, Northland from our directory."
#       og: [
#         {key: "title", value: "Farmers, Growers and Foodies of the Kaikohekohe Food Co-op"}
#         {key: "description", value: "Contact Farmers, Growers and Foodies about local food in Whangarei, Northland from our directory." }
#         {key: "url", value: "#{baseURL}/directory" }
#         {key: "image", value: defaultImage }
#       ]
#       users: users)
#   res.end html
#   return
#
# seoPicker.route '/directory/:producerId', (params, req, res) ->
#   user = Meteor.users.findOne(params.productId)
#
#   html = SSR.render('layout',
#     css: css
#     template: 'producer'
#     data:
#       title: "#{user.profile.companyName || user.profile.name} at the Kaikohekohe Food Co-op"
#       description: user.profile.summary.substring(0, 99)
#       og:
#         type: 'profile'
#         title: "#{user.profile.companyName || user.profile.name} at the Kaikohekohe Food Co-op"
#         url: "#{baseURL}directory/#{user._id}"
#         image: if user.profile.logo then user.profile.logo.url else defaultImage
#       user: user)
#   res.end html
#   return

