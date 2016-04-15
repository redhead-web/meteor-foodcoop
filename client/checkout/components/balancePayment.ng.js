function BalancePaymentController($scope, $state, $reactive) {
  "ngInject";
  $reactive(this).attach($scope)
  
  this.invoice = () => {
    let userId = this.customer ? this.customer._id : Meteor.userId()
    this.call("balanceCheckout", userId, this.pos, (err, response) => {
      $scope.$apply(() => {
        if (err) {
          this.onError({error: err})
          return console.error(err)
        }
        console.log(response)
        this.onSuccess({response: response})
      })
    })
  }
  
}

angular.module('food-coop')
.component("fcBalancePayment", {
  templateUrl: 'client/checkout/components/balancePaymentTpl.ng.html',
  controller: BalancePaymentController,
  bindings: {
    customer: "<",
    pos: "@",
    onError: "&",
    onSuccess: "&"
  }
})
