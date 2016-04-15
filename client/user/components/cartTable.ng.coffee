CartTableController = ($scope, $reactive) ->
  "ngInject"
  
  $reactive(@).attach($scope)
  
  @priceWithMarkup = (item) => Markup(item).total()
  @totalWithMarkup = (item) => Markup(item).cartTotal()

  @delete = (id) =>
    @onRemove({id: id})
  @update = (id, newQty, oldQty) =>
    @onUpdate {id: id, newQty: newQty, oldQty: oldQty}
  
  return


angular.module('food-coop').component 'cartTable',
  controller: CartTableController
  templateUrl: 'client/user/components/cart-table.ng.html'
  controllerAs: 'cart'
  bindings:
    items: '<'
    user: '<'
    total: '<'
    onRemove: '&'
    onUpdate: '&'