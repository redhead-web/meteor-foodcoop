angular.module("food-collective").controller("EditUserCtrl", function($scope, $rootScope, $meteor){
  $scope.hubs = $meteor.collection(Hubs);

  $scope.validate = function(isValid) {
    if (isValid) {
      Meteor.users.update({_id:Meteor.user()._id}, {$set: {profile: $rootScope.currentUser.profile}}, function(error) {
        if (error) {
          $scope.error = error;
        } else $scope.success = true;
      })
    } else $scope.submitted = true;
  };

});
