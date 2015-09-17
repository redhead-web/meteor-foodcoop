describe "User", ->

  afterEach ->
    Meteor.users.remove({})

  it "should be able to create a user", ->

    userObject =
      email: "test@test.com"
      password: "123456"
      profile:
        name: "Test User"

    expect ->
      Accounts.createUser userObject
    .not.toThrow()

  it "should automatically get a customer number", ->

    userObject =
      email: "test@test.com"
      password: "123456"
      profile:
        name: "Test User"

    id = Accounts.createUser userObject

    user = Meteor.users.findOne id

    expect(user.profile.name).toBe "Test User"

    expect(user.profile.customerNumber).toBeDefined()
