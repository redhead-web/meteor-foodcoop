// import angular from 'angular'
import { Accounts } from 'meteor/accounts-base'

import ngMaterial from 'angular-material'


import templateUrl from './buyTicket.html'
import {name as braintreePayment} from '../braintreePayment/braintreePayment'
import {name as membershipBenefits} from '../membershipBenefits/membershipBenefits'
// import './style.scss'


class BuyTicketController {
  constructor($state, $reactive, $scope, $mdToast) {
    'ngInject';
    
    $reactive(this).attach($scope)
    
    const user = Meteor.user()
    
    this.ticketData = {
      name: user ? user.profile.name : "",
      email: user ? user.emails[0].address : ""
    }
        
    this.go = $state.go
  }
  
  registerUser(callback) {
    console.log('register user')
    
  }
  
  buyTickets(transactionData) {
    console.log(transactionData)
    
    this.call('buyTickets', this.event._id, this.ticketData, transactionData, (error, result) => {
      if (error) {
        console.log(error);
        this.error = error;
        return
      }
      console.log(result)
      $mdToast.show(
        $mdToast.simple().content("Payment handled. See you there!").position('bottom left').hideDelay(5000)
      );
      if (this.willRegister) {
        this.register.email = this.ticketData.email
        this.register.profile.name = this.ticketData.name
        Accounts.createUser(this.register, this.$bindToContext((error, id) => {
          console.log(error)
          console.log(id)
          console.log('registered')
          this.onSuccess({eventView: 'attendees'});
        }))
      } else {
        this.onSuccess({eventView: 'attendees'})
      }
    })
    
  }
}

const name = 'buyTicket';

// create a module
export default angular.module(name, [
  'angular-meteor',
  ngMaterial,
  braintreePayment,
  membershipBenefits
]).component(name, {
  templateUrl,
  controller: BuyTicketController,
  bindings: {
    event: "<",
    onSuccess: "&"
  }
})
  
