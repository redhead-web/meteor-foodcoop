# Kaikohe Delivery Days

describe "GetDeliveryDay Function for Kaikohe", ->
  it "should get the right delivery day on sunday", ->
    date = moment().day(0)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(4).startOf('day').format() # a week from Tuesday

  it "should get the right delivery day on monday", ->
    date = moment().day(1)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(4).startOf('day').format() # a week from Tuesday

  it "should get the right delivery day on tuesday", ->
    date = moment().day(2)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(4).startOf('day').format() # a week from Tuesday

  it "should get the right delivery day on wednesday", ->
    date = moment().day(3)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(11).startOf('day').format() # a week from Tuesday'

  it "should get the right delivery day on thursday", ->
    date = moment().day(4)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(11).startOf('day').format() # a week from Tuesday

  it "should get the right delivery day on friday", ->
    date = moment().day(5)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(4).add(1, 'weeks').startOf('day').format() # go back a Tuesday and add two tuesdays

  it "should get the right delivery day on saturday", ->
    date = moment().day(6)
    result = GetDeliveryDay(date)

    expect result
    .toEqual moment().day(4).add(1, 'weeks').startOf('day').format() # go back a Tuesday and add two tuesdays
    
    
# describe "GetDeliveryDay Function for Kaikohe", ->
#   it "should get the right delivery day on sunday", ->
#     date = moment().day(0)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(4).startOf('day').format() # a week from Tuesday
#
#   it "should get the right delivery day on monday", ->
#     date = moment().day(1)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(4).startOf('day').format() # a week from Tuesday
#
#   it "should get the right delivery day on tuesday", ->
#     date = moment().day(2)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(11).startOf('day').format() # a week from Tuesday
#
#   it "should get the right delivery day on wednesday", ->
#     date = moment().day(3)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(11).startOf('day').format() # a week from Tuesday'
#
#   it "should get the right delivery day on thursday", ->
#     date = moment().day(4)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(11).startOf('day').format() # a week from Tuesday
#
#   it "should get the right delivery day on friday", ->
#     date = moment().day(5)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(11).startOf('day').format() # go back a Tuesday and add two tuesdays
#
#   it "should get the right delivery day on saturday", ->
#     date = moment().day(6)
#     result = GetDeliveryDay(date)
#
#     expect result
#     .toEqual moment().day(11).startOf('day').format() # go back a Tuesday and add two tuesdays