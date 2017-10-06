
FastRender.route '/', () ->
  this.subscribe('active-products', {}, 96, {'dateCreated':-1})
  this.subscribe 'categories'
  return


FastRender.route '/product/:productId', (params) ->
  this.subscribe 'product', params.productId
  this.subscribe 'producer', params.userId
  return

FastRender.route '/directory/:userId', (params) ->
  this.subscribe 'producer', params.userId
  this.subscribe 'active-products', {producer: params.userId}, -1, {name: 1}
  return

# FastRender.onAllRoutes (path) ->
#   this.subscribe('active-products', {}, -1, {name: 1})
#   this.subscribe 'categories'
#   this.subscribe 'Cart-userOrders'
#   this.subscribe 'myLikes'
#   return
