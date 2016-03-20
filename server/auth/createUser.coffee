


Accounts.onCreateUser (options, user) ->
  # add email from facebook
  if user.services? and user.services.facebook? and user.services.facebook.email?
    email = user.services.facebook.email
    existingUser = Accounts.findUserByEmail email
    if existingUser?
      throw new Meteor.Error 401, "an account with that email address already exists, please sign in instead"
    else  
      user.emails = [{address: email, verified: true}]
  
  if options.profile
    user.profile = options.profile
  user

# ---