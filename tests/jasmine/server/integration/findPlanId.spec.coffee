
describe "meteor method findPlanId" ->

  it "should be able to find a plan id with price $41.66" ->
    result = Meteor.call "findPlanId", 41.66
    expect(result).toBe 5jc6
  it "should be able to find a plan id with price $83.33" ->
    result = Meteor.call "findPlanId", 83.33
    expect(result).toBe kgqg
  it "should be able to not find a plan id with price $45.00" ->
    result = Meteor.call "findPlanId", 45
    expect(result).toBeUndefined
