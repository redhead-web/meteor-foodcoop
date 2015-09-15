Accounts.onEnrollmentLink (token, done) ->
  console.log "fn I wrote"
  window.location= "/resetpw/#{token}"
  done()
