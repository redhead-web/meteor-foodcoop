Accounts.onEnrollmentLink (token, done) ->
  console.log "fn I wrote"
  window.location= "/reset-password/#{token}"
  done()
