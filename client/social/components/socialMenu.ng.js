angular.module('food-coop')
.directive("fcSocialMenu", function() {
  return {
    restrict: 'E',
    scope: {
      url: '@url',
      'class': '@class',
      text: '@text',
			media: '@media'
    },
    // transclude: true,
    // replace: true,
    templateUrl: 'client/social/components/social-menu.ng.html'
  }
})
