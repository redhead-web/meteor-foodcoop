angular.module('food-collective').controller 'navCtrl', ($mdUtil, $mdSidenav, $log, $state) ->
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
    ,200

    return debounceFn;

  vm.toggleLeft = buildToggler 'left'

  vm.goTo = (route) ->
    $state.go(route)
  return