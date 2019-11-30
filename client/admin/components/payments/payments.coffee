import template from './payments.ng.html'

paymentsController = ($scope, $reactive) ->
  "ngInject"
  $reactive(this).attach($scope)

  @subscribe 'payments'

  @sort = dateCreated: -1

  @helpers
    payments: ->
      Payments.find {}, sort: @getReactively('sort')

  @autorun =>
    @total = _.reduce @payments, 'amount'

  return


angular.module('food-coop').component 'fcPayments',
  template: template
  controller: paymentsController
