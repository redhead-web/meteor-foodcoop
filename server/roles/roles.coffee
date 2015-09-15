Meteor.methods
  addRole: (id, role) ->
    check role, String
    console.log id, role
    try
      Roles.addUsersToRoles id, role
    catch e
      console.error e

    if Roles.userIsInRole id, role
      console.log "YAY! User added to #{role}"
    return
  removeRole: (id, role) ->
    check role, String
    try
      Roles.removeUsersFromRoles id, role
    catch err
      console.error err

    unless Roles.userIsInRole id, role
      console.log "YAY! User removed from #{role}"
    return
