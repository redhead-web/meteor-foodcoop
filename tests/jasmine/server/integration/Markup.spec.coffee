describe "Markup Object", ->
  it 'should be able to calculate markup for given prices', ->
    expect(Markup).toBeDefined()
    
    expect(Markup().total(1)).toEqual(1.1)
    
    expect Markup().total(50)
    .toEqual 55
    
    expect Markup().markup(1)
    .toEqual 0.1
    
  it 'should be able to calculate markup of a product', ->
    product = price: 1
    
    expect Markup(product).total()
    .toEqual 1.1
    
    expect Markup(product).markup()
    .toEqual 0.1
    
  it 'should be able to calculate markup of a product with extra markup', ->
    product = price: 1, extraMarkup: 0.1
    
    expect Markup(product).total()
    .toEqual 1.2
    
    expect Markup(product).markup()
    .toEqual 0.2
    
  it 'should be able to calculate markup for an array of products, some of which have extra markup', ->
    products = [
      {price: 1, extraMarkup: 0.1},
      {price: 10},
      {price: 20, extraMarkup: 0.1}
    ]
    
    expect Markup(products).total()
    .toEqual 36.2
    
    expect Markup(products).markup()
    .toEqual 5.2
    
  it 'should be able to calculate the markup on a cart item', ->
    cartItem = qty: 10, details: price: 10
    
    expect Markup(cartItem).cartTotal()
    .toEqual 110
    
    expect Markup(cartItem).total()
    .toBe 11
    
    expect Markup(cartItem).markup()
    .toEqual 10
    
  it 'should be able to calculate the markup on a cart item with extra markup', ->
    cartItem = qty: 10, details: {price: 10, extraMarkup: 0.1}
    
    expect Markup(cartItem).cartTotal()
    .toEqual 120
    
    expect Markup(cartItem).markup()
    .toEqual 20
    
  it 'should be able to calculate the markup on a cart with some items having extra markup', ->
    cart = [
      {qty: 10, details: {price: 1, extraMarkup: 0.1} }
      {qty: 1, details: {price: 10} }
      {qty: 2, details: {price: 20, extraMarkup: 0.1} }
    ] 
    
    expect Markup(cart).cartTotal()
    .toEqual 71
    
    expect Markup(cart).markup()
    .toEqual 11
  
  it 'should be able to calculate the markup of a sale item', ->
    sale = qty: 5, price: 5
    
    expect Markup(sale).saleTotal()
    .toEqual 27.5
    
    expect Markup(sale).total()
    .toBe 5.5
    
    expect Markup(sale).markup()
    .toEqual 2.5
    
  it 'should be able to calculate the markup of a sale with extra markup', ->
    sale = qty: 5, price: 5, extraMarkup: 0.1
    
    expect Markup(sale).saleTotal()
    .toEqual 30 
    
    expect Markup(sale).markup()
    .toEqual 5
    
  it 'should be able to calculate the sales total when some sales have extra markup', ->
    sales = [
      {qty: 5, price: 5, extraMarkup: 0.1}
      {qty: 5, price: 5, extraMarkup: 0.1}
      {qty: 5, price: 5, extraMarkup: 0.1}
      {qty: 2, price: 10}
    ]
    expect Markup(sales).saleTotal()
    .toEqual 112
    
    expect Markup(sales).markup()
    .toEqual 17
    
    