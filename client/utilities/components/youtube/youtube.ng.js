angular.module('food-coop').component('fcVideo', {
  templateUrl: 'client/utilities/components/youtube/youtube-responsive.ng.html',
  // controller: function() {YT.load()},
  bindings: {
    videoUrl: "<"
  }
})