angular.module("food-coop").controller("EditUserCtrl", function($scope, $meteor, $mdToast){
  
  $scope.helpers({
    user() {
      return Meteor.user()
    }
  })
  
  $scope.email = Meteor.user().emails[0].address
  
  $scope.validate = function() {
    if ($scope.email !== Meteor.user().emails[0].address) {
      Meteor.call('addEmail', $scope.email, Meteor.user().emails[0].address, function(err, response) {
        if (err) {
          console.log (err)
          $scope.error = `Error: ${err.reason}`;
        }
      });
    }
      
    
    Meteor.users.update({_id:Meteor.userId()}, {$set: {profile: $scope.user.profile}}, function(error) {
      if (error) {
        $scope.error = error;
      } else {
        if (!$scope.error) {
          $mdToast.show($mdToast
            .simple().content('Poof! Saved Successfully!')
            .position('bottom right')
            .hideDelay(3000))
        }
      }
    })
  };

});
