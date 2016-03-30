function LikeHeartCtrl ($scope, $mdToast, $reactive) {
  
  "ngInject";
  
  $reactive(this).attach($scope)
  
  var vm = this;
  
  vm.likesTarget= likesTarget;
  
  vm.toggleLike = toggleLike;
  
  function toggleLike() {
    var like;
    if (Meteor.userId() == null) {
      $mdToast.show($mdToast.simple().content("Please login to like this").position('bottom left').hideDelay(4000));
      return;
    }
    like = Likes.findOne({
      liker: Meteor.userId(),
      likee: vm.targetId
    });
    if (like != null) {
      Likes.remove(like._id);
      if (vm.unlikeText) {
        $mdToast.show($mdToast.simple().content(vm.unlikeText).position('bottom left').hideDelay(4000));
      }
    } else {
      vm.call("/likes/add", vm.targetId, vm.category, function(err, response) {
        if (err) {
          return console.log(err);
        } else if (vm.likeText) {
          $mdToast.show($mdToast.simple().content(vm.likeText).position('bottom left').hideDelay(4000));
        }
        return 
      });
    }
  };
  
  function likesTarget() {
    var like;
    like = Likes.findOne({
      liker: Meteor.userId(),
      likee: vm.targetId
    });
    if (like) {
      return 'liked';
    } else {
      return 'not-liked';
    }
  }
}
        
angular.module('food-coop').component('likeHeart', {
  templateUrl: 'client/utilities/components/likes/like-heart.ng.html',
  controller: LikeHeartCtrl,
  bindings: {
    likeText: "@",
    unlikeText: "@",
    targetId: "<",
    category: "@"
  }
})


angular.module('food-coop').component('likeHeartButton', {
  templateUrl: 'client/utilities/components/likes/like-heart-button.ng.html',
  controller: LikeHeartCtrl,
  bindings: {
    likeText: "@",
    unlikeText: "@",
    targetId: "<",
    category: "@"
  }
})