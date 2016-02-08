angular.module('food-coop').controller 'navCtrl', ($mdUtil, $mdSidenav, $log, $state) ->
  vm = this
  ###
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
  ###

  buildToggler = (navID) ->
    debounceFn =  $mdUtil.debounce ->
      $mdSidenav(navID)
        .toggle()
        .then ->
          $log.debug("toggle " + navID + " is done");
    , 200

    return debounceFn;

  vm.toggleRight = buildToggler 'right'

  vm.isProducer = (user) ->
    Roles.userIsInRole(user, 'producer')

  vm.goTo = (route, params) ->
    $state.go(route, params)
  return
