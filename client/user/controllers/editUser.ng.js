angular.module("food-collective").controller("EditUserCtrl", function($scope, $rootScope, $meteor, $mdToast){
  $scope.hubs = $meteor.collection(Hubs).subscribe('hubs');

  $scope.validate = function(isValid) {
    if (isValid) {
      Meteor.users.update({_id:Meteor.user()._id}, {$set: {profile: $rootScope.currentUser.profile}}, function(error) {
        if (error) {
          $scope.error = error;
        } else {
          $mdToast.show($mdToast
            .simple().content('Saved Successfully')
            .position('bottom left')
            .hideDelay(3000))
        }
      })
    } else $scope.submitted = true;
  };

});
