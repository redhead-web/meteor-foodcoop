Accounts.onCreateUser (options, user) ->
  console.log(options)
  # We still want the default hook's 'profile' behavior.
  if options.profile
    user.profile = options.profile
  user
