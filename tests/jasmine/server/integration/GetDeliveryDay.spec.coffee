
cutoffDays = [0..30]
deliveryDays = [0..6]

describe "GetProductDeliveryDay Function for Whangarei", ->
  
  
  it "should find delivery dates for all possible dates and cutoffs", ->

    for d in [0..6]
      date = moment().day(d).startOf('day')

      for c in cutoffDays

        for dd in deliveryDays

          result = GetProductDeliveryDay(c, date, dd)

          expect moment(result).isSameOrAfter(date)
          .toEqual yes # result is in the future or the same day

          expect moment(result).day()
          .toEqual moment(date).day(dd).day() # should be on the delivery day of the week

          weeks = 0
          ddc = dd


          while date.isAfter( moment(date).day(ddc).subtract(c, 'days') )
             weeks++
             ddc+=7


          expect result.format()
          .toEqual moment(date).day(dd).add(weeks, 'weeks').format()
          
    
  it "should get the right delivery day for ordering tuesday with a 0 day cutoff", ->
    date = moment().day(2).startOf('day')
    result = GetProductDeliveryDay(0, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).format()
    
  it "should get the right delivery day for ordering monday with a 1 day cutoff", ->
    date = moment().day(1).startOf('day')
    result = GetProductDeliveryDay(1, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).format()
    
  it "should get the right delivery day for ordering monday with a 2 day cutoff", ->
    date = moment().day(1).startOf('day')
    result = GetProductDeliveryDay(2, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(1, 'week').format()
    
  it "should get the right delivery day for ordering sunday with a 2 day cutoff", ->
    date = moment().day(0).startOf('day')
    result = GetProductDeliveryDay(2, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).format()
    
  it "should get the right delivery day for ordering saturday with a 2 day cutoff", ->
    date = moment().day(6).startOf('day')
    result = GetProductDeliveryDay(2, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(1, 'week').format()
  it "should get the right delivery day for ordering saturday with a 4 day cutoff", ->
    date = moment().day(6).startOf('day')
    result = GetProductDeliveryDay(4, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(2, 'weeks').format()
    
  it "should get the right delivery day for ordering friday with a 5 day cutoff", ->
    date = moment().day(5).startOf('day')
    result = GetProductDeliveryDay(5, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(2, 'weeks').format()
    
  it "should get the right delivery day for ordering thursday with a 5 day cutoff", ->
    date = moment().day(4).startOf('day')
    result = GetProductDeliveryDay(5, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(1, 'week').format()
    
  it "should get the right delivery day for ordering friday with a 5 day cutoff", ->
    date = moment().day(5).startOf('day')
    result = GetProductDeliveryDay(5, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(2, 'weeks').format()
    
  it "should get the right Thursday delivery day for ordering Tuesday with a 2 day cutoff", ->
    date = moment().day(2).startOf('day')
    result = GetProductDeliveryDay(2, date, 4)
    
    expect result.format()
    .toEqual moment(date).day(4).format()
    
  it "should get the right Thursday delivery day for ordering Tuesday with a 3 day cutoff", ->
    date = moment().day(2).startOf('day')
    result = GetProductDeliveryDay(3, date, 4)
    
    expect result.format()
    .toEqual moment(date).day(4).add(1, 'week').format()
  
  it "should get the right Tuesday delivery day for ordering Monday with a 7 day cutoff", ->
    date = moment().day(1).startOf('day')
    result = GetProductDeliveryDay(7, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(1, 'week').format()
    
  it "should get the right Tuesday delivery day for ordering Friday with a 7 day cutoff", ->
    date = moment().day(5).startOf('day')
    result = GetProductDeliveryDay(7, date, 2)
    
    expect result.format()
    .toEqual moment(date).day(2).add(2, 'weeks').format()
