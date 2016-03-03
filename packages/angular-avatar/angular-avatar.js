angular.module('multi-avatar', ['md5'])
  .directive('multiAvatar', ['md5', function (md5) {
    return {
      restrict: 'E',
      scope: {
        user: '=',
        width: '@',
        height: '@'
      },
      link: function($scope, element, attr) {
        
        if ($scope.width == null) {
          $scope.width = 50
        }
        
        if ($scope.height == null) {
          $scope.height = $scope.width
        }
        
        element.css({
          width: $scope.width,
          height: $scope.height
        });
      },
      controller: function($scope, md5) {
        var services = [
  			  {id: 'facebook', tpl: 'http://graph.facebook.com/{id}/picture?width={width}&height={height}'} ,
  			  {id: 'twitter',  tpl: 'https://pbs.twimg.com/profile_images/{id}_bigger.jpeg'} ,
  			  {id: 'github',   tpl: 'https://identicons.github.com/{id}.png'} ,
  			  {id: 'gravatar', tpl: 'https://secure.gravatar.com/avatar/{id}?s={width}&d=blank'}
        ];
                
        $scope.userId = typeof $scope.user === 'string' ? $scope.user : $scope.user._id;
        
        $scope.name = "test";
        
        $scope.subscribe('basic-user', function() { return [$scope.getReactively('userId')]}, onReady)
        
        if ($scope.width == null) {
          $scope.width = 50
        }
        
        if ($scope.height == null) {
          $scope.height = $scope.width
        }  
        
        function onReady() {
          var service, id, user;
          user = Meteor.users.findOne($scope.userId);
          $scope.name = user.profile.name;
          if (user.hasOwnProperty('emails')) {
            service = services[3];
            id = md5.createHash(user.emails[0].address.toLowerCase())
          }
          
          if (user.hasOwnProperty('services')) {
            if (user.services.hasOwnProperty('facebook')) {
              service = services[0];
              id = $scope.userObject.services.facebook.id;
            } else if (user.services.hasOwnProperty('twitter')) {
              service = services[1];
              id = user.services.twitter.id
            } else if (user.services.hasOwnProperty('github')) {
              service = services[2];
              id = user.services.github.id
            }
          }
          
          if (service != null) {
            $scope.tag = service.tpl.replace('{id}', id)
            .replace('{width}', $scope.width)
            .replace('{height}', $scope.height);
          }
        }
        
      },
      template: '<ng-letter-avatar data="{{name}}" width="{{width}}" height="{{width}}" font-Size="{{30/(50/width)}}" shape="round"></ng-letter-avatar><img ng-src="{{tag}}" class="img-round meteor-avatar">',
    };
  }]);
