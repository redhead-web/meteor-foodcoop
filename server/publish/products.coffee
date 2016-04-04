Meteor.publish "active-products", (query, limit, sort)->
  if query
    check query, Object
  else
    query = {}
  if limit
    check limit, Number
  else
    limit = -1
  if sort
    check sort, Object
  else
    sort = {name: 1}
  
  options =
   fields:
     published: 1
     name: 1
     price: 1
     unitOfMeasure: 1
     stocklevel: 1
     img: 1
     producer: 1
     producerName: 1
     category: 1
     minimumOrder: 1
   limit: limit
   sort: sort 
  
  q = 
    published : true
  
  if query.producer
    q.producer = query.producer
  
  if query.favourites or query.lastOrder
    favourites = _.pluck(Likes.find(
      liker: @userId
      category: 'products').fetch(), 'likee')
    lastOrder = Meteor.users.findOne(@userId).profile.lastOrder
    if query.favourites and query.lastOrder
      q._id = $in: _.union(favourites, lastOrder)
    if query.favourites
      q._id = $in: favourites
    if query.lastOrder
      q._id = $in: lastOrder
  
  if limit == -1
    delete options.limit
    
  
  Products.find q, options
    
    
Meteor.publish "all-active-products", ()->
  Products.find
    published: true
    
      
Meteor.publish "product", (id) ->
  Products.find
    _id: id
  , limit: 1
    
Meteor.publish "my-products", ->
  Products.find
    producer: @userId

Meteor.publish "product-names", ->
  Products.find {},
    fields: 
      name: 1
      
Meteor.publish "product-names-search", ->
  Products.find {published: true},
    fields: 
      name: 1

Meteor.publish "all-products", ->
  Products.find {},
    fields: 
      published: 1
      name: 1
      price: 1
      unitOfMeasure: 1
      'img.result': 1
      stocklevel: 1
      producerCompanyName: 1
      producerName: 1