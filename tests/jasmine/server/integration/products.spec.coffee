describe "Products Collection", ->

  it "should be able to insert a very simple product", (done) ->

    product =
      name: 'product'
      price: 20

    Products.insert product, (err, id) ->
      expect(err).toBeNull()

      expect(id).toBeDefined()

      p = Products.findOne id

      expect(p.published).toBe false
      expect(p.name).toBe 'product'
      expect(p.price).toBe 20
      done()
