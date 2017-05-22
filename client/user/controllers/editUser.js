import { Accounts } from 'meteor/accounts-base';
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

class EditUserCtrl {
  constructor($scope, $mdToast, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.autorun(() => {
      this.user = Meteor.user();
      if (this.user && angular.isArray(this.user.emails) && this.user.emails.length > 0) {
        this.email = this.user.emails[0].address;
      }
      this.isProducer = Roles.userIsInRole(Meteor.userId(), 'producer');
    });

    this.simpleToast = message => $mdToast.showSimple(message);
  }

  validate(isValid) {
    if (!isValid) {
      this.submitted = true;
      return;
    }
    const originalUser = Meteor.user();
    if (originalUser.emails === null ||
      this.email !== originalUser.emails[0].address) {
      this.call('addEmail', this.user._id, this.email, originalUser.emails[0].address, (err) => {
        if (err) {
          this.simpleToast(err.message);
        }
      });
    }
    Meteor.users.update(this.user._id, {
      $set: {
        profile: this.user.profile,
      },
    }, (err) => {
      if (err) {
        console.log(err);
      }
      this.simpleToast('Saved Successfully');
    });
  }

  resetPassword() {
    Accounts.forgotPassword({
      email: this.user.emails[0].address,
    }, this.$bindToContext((err) => {
      const content = err ? err.message : 'Poof! Check your email for the link to reset your password';
      this.simpleToast(content);
    }));
  }
}

angular.module('food-coop').controller('EditUserCtrl', EditUserCtrl);
