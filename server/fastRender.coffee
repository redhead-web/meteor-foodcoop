
FastRender.route '/store', (params) ->
  this.subscribe('active-products', {}, -1, {name: 1})
  this.subscribe 'categories'
  
FastRender.route '/product/:productId', (params) ->
  this.subscribe 'product', params.productId
  this.subscribe 'producer', params.userId
  
FastRender.route '/directory/:userId', (params) ->
  this.subscribe 'producer', params.userId
  this.subscribe 'active-products', {producer: params.userId}, -1, {name: 1}

FastRender.onAllRoutes (path) ->
  this.subscribe('active-products', {}, -1, {name: 1})
  this.subscribe 'categories'
  this.subscribe 'Cart-userOrders'
  this.subscribe 'myLikes'