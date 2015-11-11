describe "shopping in the co-op", ->
  it "should find a logged in user", ->
    expect Meteor.user()
    .toBeDefined()
