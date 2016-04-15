paymentController = ($scope, $reactive) ->
  "ngInject";
  $reactive(this).attach($scope)
      
  @autorun =>
    if @payment
      @recipient = Meteor.users.findOne @payment.user
    
  @icon = =>
    if @payment
      switch @payment.method
        when 'cash'
          result = 'editor:ic_attach_money_24px'
        when 'internet banking'
          result = 'file:ic_cloud_done'
        when 'bitcoin'
          result = 'file:ic_cloud_upload'
        else
          result = 'editor:ic_money_off_24px'
    result
    
  
  return
  

angular.module('food-coop').component 'fcPayment', 
  templateUrl: 'client/admin/components/payments/payment.ng.html'
  controller: paymentController
  bindings:
    payment: "<"