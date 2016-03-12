Accounts.onEnrollmentLink (token, done) ->
  window.location= "/invite/#{token}"
  done()
