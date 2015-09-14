describe "validCurrency function used by findPlanId", ->
  it "should be able to determine if 10 is a number", ->
    result = true if typeof 10 == "number"
    expect(result).toBe true
    expect(10.toFixed 2).toBe('10.00')

  it "should be able to reformat 10 to be 10.00 using the function", ->
    validCurrency = (amount) ->
      if typeof amount == "number"
        amount = Number(amount).toFixed 2
      if typeof amount != "number" and not /^\d+(\.)?(\d{0,2})?/.test(amount)
        throw new Meteor.Error('invalid amount format', 'invalid amount to be transacted', 'validCurrency function')
      amount

    result = validCurrency 10

    expect(result).toBe('10.00')



describe "meteor method findPlanId", ->

  it "should be able to find a plan id with price $41.67", ->
    result = Meteor.call "findPlanId", 41.666666
    expect(result).toBe '5jc6'
  it "should be able to find a plan id with price $83.33", ->
    result = Meteor.call "findPlanId", 83.333333
    expect(result).toBe 'kgqg'
  it "should be able to not find a plan id with price $45.00", ->
    expect ->
      Meteor.call "findPlanId", 45
    .toThrow()
