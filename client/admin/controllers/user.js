import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

class UserAdminCtrl {
  constructor($scope, $reactive, $stateParams, $mdToast) {
    'ngInject';

    $reactive(this).attach($scope);
    this.$stateParams = $stateParams;

    this.subscribe('user', () => [$stateParams.userId]);

    this.autorun(() => {
      this.user = Meteor.users.findOne($stateParams.userId);
      if (this.user && angular.isArray(this.user.emails) && this.user.emails.length > 0) {
        this.email = this.user.emails[0].address;
      }
      this.producer = !!Roles.userIsInRole($stateParams.userId, 'producer');
    });

    this.simpleToast = message => $mdToast.show($mdToast.simple().content(message).position('bottom right').hideDelay(3000));
  }

  validate(isValid) {
    if (!isValid) {
      this.submitted = true;
      return;
    }
    if (Meteor.users
      .findOne(this.$stateParams.userId).emails === null ||
      this.email !== Meteor.users
      .findOne(this.$stateParams.userId).emails[0].address) {
      this.call('addEmail', this.user._id, this.email, Meteor.users.findOne(this.$stateParams.userId).emails[0].address, (err) => {
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

  changeRole() {
    if (this.producer === true) {
      Meteor.call('addRole', this.user._id, 'producer', () =>
        this.simpleToast('User is now a "Producer"'),
      );
    } else if (this.producer === false) {
      Meteor.call('removeRole', this.user._id, 'producer', () =>
        this.simpleToast('User is no longer a "Producer"'),
      );
    }
  }
}

angular.module('food-coop').controller('UserAdminCtrl', UserAdminCtrl);
