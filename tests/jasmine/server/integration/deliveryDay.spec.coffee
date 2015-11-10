describe "deliveryDay function", ->
  it "should be able to find the right deliveryDay", ->
    deliveryDay = GetDeliveryDay()

    expect deliveryDay
    .toBeDefined()

    expect moment(deliveryDay).isAfter moment()
    .toBe true
