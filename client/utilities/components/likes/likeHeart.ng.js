import angular from 'angular';
import likeHeartTemplate from './like-heart.ng.html';
import buttonTemplate from './like-heart-button.ng.html';

function LikeHeartCtrl($scope, $mdToast, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  const vm = this;

  vm.likesTarget = likesTarget;

  vm.toggleLike = toggleLike;

  function toggleLike() {
    let like;
    if (Meteor.userId() == null) {
      $mdToast.show($mdToast.simple().content('Please login to like this').position('bottom right').hideDelay(4000));
      return;
    }
    like = Likes.findOne({
      liker: Meteor.userId(),
      likee: vm.targetId,
    });
    if (like != null) {
      Likes.remove(like._id);
      if (vm.unlikeText) {
        $mdToast.show($mdToast.simple().content(vm.unlikeText).position('bottom right').hideDelay(4000));
      }
    } else {
      vm.call('/likes/add', vm.targetId, vm.category, (err, response) => {
        if (err) {
          return console.log(err);
        } else if (vm.likeText) {
          $mdToast.show($mdToast.simple().content(vm.likeText).position('bottom right').hideDelay(4000));
        }
      });
    }
  }

  function likesTarget() {
    let like;
    like = Likes.findOne({
      liker: Meteor.userId(),
      likee: vm.targetId,
    });
    if (like) {
      return 'liked';
    }
    return 'not-liked';
  }
}

angular.module('food-coop').component('likeHeart', {
  template: likeHeartTemplate,
  controller: LikeHeartCtrl,
  bindings: {
    likeText: '@',
    unlikeText: '@',
    targetId: '<',
    category: '@',
  },
});


angular.module('food-coop').component('likeHeartButton', {
  template: buttonTemplate,
  controller: LikeHeartCtrl,
  bindings: {
    likeText: '@',
    unlikeText: '@',
    targetId: '<',
    category: '@',
  },
});
