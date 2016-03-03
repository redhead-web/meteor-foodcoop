function LikeHeartCtrl ($scope, $mdToast) {
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
      return $mdToast.show($mdToast.simple().content(vm.unlikeText).position('bottom left').hideDelay(4000));
    } else {
      Meteor.call("/likes/add", vm.targetId, vm.category, function(err, response) {
        if (err) {
          return console.log(err);
        }
        return $mdToast.show($mdToast.simple().content(vm.likeText).position('bottom left').hideDelay(4000));
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