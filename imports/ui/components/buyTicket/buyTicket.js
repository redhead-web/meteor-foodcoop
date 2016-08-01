// import angular from 'angular'
import { Accounts } from 'meteor/accounts-base'

import ngMaterial from 'angular-material'


import templateUrl from './buyTicket.html'
import {name as braintreePayment} from '../braintreePayment/braintreePayment'
import {name as membershipBenefits} from '../membershipBenefits/membershipBenefits'
// import './style.scss'


class BuyTicketController {
  constructor($state, $reactive, $scope, $mdDialog) {
    'ngInject';

    $reactive(this).attach($scope)

    const user = Meteor.user()

    this.ticketData = {
      name: user ? user.profile.name : "",
      email: user ? user.emails[0].address : ""
    }

    this.go = $state.go

    this._showDialog = () => {
      $mdDialog.show($mdDialog.alert()
        .clickOutsideToClose(true)
        .title('You\'re all booked')
        .textContent('We look forward to meeting you at the event. Check your email for printable tickets.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!'))
      .finally(()=> {
        this.onSuccess({eventView: 'attendees'});
      });
    }
  }

  registerUser(callback) {
    console.log('register user')
  }

  showDialog() {
    this._showDialog()
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
      this.showDialog()
      if (this.willRegister) {
        this.register.email = this.ticketData.email
        this.register.profile.name = this.ticketData.name
        Accounts.createUser(this.register, this.$bindToContext((error, id) => {
          console.log(id)
          if (!error) {
            Meteor.call('newMemberEmail', this.register.role === 'producer')
          }
        }))
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
