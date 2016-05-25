angular.module('multi-avatar', ['md5'])
  .component('multiAvatar', {
    bindings: {
      user: '<',
      width: '@',
      height: '@'
    },
    template: '<ng-letter-avatar data="{{$ctrl.name}}" width="{{$ctrl.width}}" height="{{$ctrl.width}}" font-Size="{{30/(50/$ctrl.width)}}" shape="round"></ng-letter-avatar><img ng-src="{{$ctrl.tag}}" class="img-round meteor-avatar">',
    controller: ['$scope', '$reactive', 'md5', function ($scope, $reactive, md5) {
      "ngInject";
      $reactive(this).attach($scope)

      this.userId = typeof this.user === 'string' ? this.user : this.user._id;

      let services = [
        {id: 'facebook', tpl: 'http://graph.facebook.com/{id}/picture?width={width}&height={height}'} ,
        {id: 'twitter',  tpl: 'https://pbs.twimg.com/profile_images/{id}_bigger.jpeg'} ,
        {id: 'github',   tpl: 'https://identicons.github.com/{id}.png'} ,
        {id: 'gravatar', tpl: 'https://secure.gravatar.com/avatar/{id}?s={width}&d=blank'}
      ];

      this.call('getBasicUser', this.userId, (err, result) => {
        this.name = result.profile.name;

        if (result.hasOwnProperty('emails')) {
          service = services[3];
          id = md5.createHash(result.emails[0].address.toLowerCase())
        }

        if (result.hasOwnProperty('services')) {
          if (result.services.hasOwnProperty('facebook')) {
            service = services[0];
            id = result.services.facebook.id;
          } else if (result.services.hasOwnProperty('twitter')) {
            service = services[1];
            id = result.services.twitter.id
          } else if (result.services.hasOwnProperty('github')) {
            service = services[2];
            id = result.services.github.id
          }
        }

        if (service != null) {
          this.tag = service.tpl.replace('{id}', id)
          .replace('{width}', this.width)
          .replace('{height}', this.height);
        }

      })

      if (this.width == null) {
        this.width = 50
      }

      if (this.height == null) {
        this.height = this.width
      }

      if (this.width == null) {
        this.width = 50
      }

      if (this.height == null) {
        this.height = this.width
      }

    }]

  })
