newPaymentController = ($scope, $reactive) ->
  "ngInject";
  $reactive(this).attach $scope
  
  @subscribe 'user-list'
  
  @options = ['cash', 'internet banking', 'bitcoin', 'other']
  
  @autorun =>
    @user = Meteor.users.findOne _id: @getReactively('userObject._id')
    
  @getUsers = (query) ->
    Meteor.users.find($or: [
      { 'profile.name':
        $regex: ".*#{query}"
        $options: 'i' }
      { 'profile.customerNumber': parseInt query }
    ]).fetch()
  
  @insert = =>
    if @user and @user._id?
      @payment.user = @user._id
    Payments.insert @payment, (error, result) =>
      if result
        @payment = {}
      else
        console.error = error
  
  return
  

angular.module('food-coop').component 'newPayment', 
  templateUrl: 'client/admin/components/new-payment/new-payment.ng.html'
  controller: newPaymentController
 