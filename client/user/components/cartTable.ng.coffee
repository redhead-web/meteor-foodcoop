CartTableController = ($scope, $reactive, $mdDialog) ->
  "ngInject"

  $reactive(@).attach($scope)

  @priceWithMarkup = (item) => Markup(item).total()
  @totalWithMarkup = (item) => Markup(item).cartTotal()

  @delete = (id) =>
    @onRemove({id: id})
  @update = (id, newQty, oldQty) =>
    @onUpdate {id: id, newQty: newQty, oldQty: oldQty}

  @deliveryWarning = (daysNotice) =>
    d = daysNotice
    if daysNotice == null
      d = Meteor.settings.public.shoppingThreshold
    if d? and GetProductDeliveryDay(d).isAfter(GetNextDeliveryDay())
      return yes
    else
      return no

  @deliveryAlert = (ev, daysNotice) =>
    $mdDialog.show( $mdDialog.alert()
        .clickOutsideToClose(true)
        .title("This product is no longer available for #{GetNextDeliveryDay().format('MMMM D')}")
        .textContent("You will receive it on #{GetProductDeliveryDay(daysNotice).format("dddd, MMMM D")} instead")
        .ariaLabel('Delivery Alert')
        .ok('Got it!')
        .targetEvent(ev)
    )
    return

  return


angular.module('food-coop').component 'cartTable',
  controller: CartTableController
  templateUrl: 'client/user/components/cart-table.ng.html'
  controllerAs: 'cart'
  bindings:
    items: '<'
    user: '<'
    total: '<'
    shipping: '<'
    onRemove: '&'
    onUpdate: '&'
