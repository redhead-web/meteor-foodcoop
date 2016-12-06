import {Roles} from 'meteor/alanning:roles'

angular.module("food-coop").controller("EditUserCtrl", function($scope, $mdToast){
  
  $scope.helpers({
    user() {
      return Meteor.user()
    }
  })
  
  $scope.email = Meteor.user().emails[0].address
  
  $scope.isProducer = (userId) => Roles.userIsInRole(userId, 'producer')
    
  
  $scope.validate = function() {
    if ($scope.email !== Meteor.user().emails[0].address) {
      $scope.call('addEmail', $scope.email, Meteor.user().emails[0].address, function(err, response) {
        if (err) {
          console.log (err)
          $scope.errorEmail = `Error: ${err.reason}`;
        } else {
          $scope.errorEmail = undefined
        }
      });
    }
      
    
    Meteor.users.update({_id:Meteor.userId()}, {$set: {profile: $scope.user.profile}}, function(error) {
      if (error) {
        $scope.error = error;
      } else {
        if (!error) {
          $scope.error = undefined;
          $mdToast.show($mdToast
            .simple().content('Poof! Saved Successfully!')
            .position('bottom right')
            .hideDelay(3000))
        }
      }
    })
  };
  
  $scope.resetPassword = function resetPassword() {
    Accounts.forgotPassword({ email: $scope.user.emails[0].address }, $scope.$bindToContext(function (err) {
      let content = 'Poof! Check your email for the link to reset your password';
      if (err) {
        content = err.message;
      }
      $mdToast.show($mdToast
        .simple().content(content)
        .position('bottom right')
        .hideDelay(3000));
    }));
  };
});
