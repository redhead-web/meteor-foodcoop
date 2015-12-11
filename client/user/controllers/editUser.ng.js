angular.module("food-coop").controller("EditUserCtrl", function($scope, $rootScope, $meteor, $mdToast){

  $scope.validate = function(isValid) {
    if (isValid) {
      Meteor.users.update({_id:Meteor.user()._id}, {$set: {profile: $rootScope.currentUser.profile}}, function(error) {
        if (error) {
          $scope.error = error;
        } else {
          $mdToast.show($mdToast
            .simple().content('Poof! Saved Successfully!')
            .position('bottom right')
            .hideDelay(3000))
        }
      })
    } else $scope.submitted = true;
  };

});
