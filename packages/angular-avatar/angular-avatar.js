import { Meteor } from 'meteor/meteor';

angular.module('multi-avatar', ['md5'])
  .component('multiAvatar', {
    bindings: {
      userId: '<',
      name: '<',
      email: '<',
      width: '@',
      height: '@',
    },
    template: '<ng-letter-avatar data="{{$ctrl.name}}" width="{{$ctrl.width}}" height="{{$ctrl.width}}" font-Size="{{30/(50/$ctrl.width)}}" shape="round"></ng-letter-avatar><img ng-src="{{$ctrl.tag}}" class="img-round meteor-avatar">',
    controller: ['$scope', '$reactive', 'md5', function controller($scope, $reactive, md5) {
      'ngInject';
      $reactive(this).attach($scope);
      const services = [
        { id: 'facebook', tpl: 'http://graph.facebook.com/{id}/picture?width={width}&height={height}' },
        { id: 'twitter', tpl: 'https://pbs.twimg.com/profile_images/{id}_bigger.jpeg' },
        { id: 'github', tpl: 'https://identicons.github.com/{id}.png' },
        { id: 'gravatar', tpl: 'https://secure.gravatar.com/avatar/{id}?s={width}&d=blank' },
      ];

      const user = Meteor.users.findOne(this.userId);
      const setTag = (u) => {
        if (u.profile && u.profile.name) {
          this.name = u.profile.name;
        }
        if (u.emails) {
          const id = md5.createHash(u.emails[0].address);
          this.tag = services[3].tpl.replace('{id}', id)
          .replace('{width}', this.width).replace('{height}', this.height);
        } else if (user.services && user.services.facebook) {
          this.tag = services[0].tpl.replace('{id}', u.services.facebook.id)
          .replace('{width}', this.width).replace('{height}', this.height);
        } else if (user.services && user.services.twitter) {
          this.tag = services[1].tpl.replace('{id}', u.services.twitter.id)
          .replace('{width}', this.width).replace('{height}', this.height);
        } else if (user.services && user.services.github) {
          this.tag = services[2].tpl.replace('{id}', u.services.github.id)
          .replace('{width}', this.width).replace('{height}', this.height);
        }
      };
      if (user) {
        setTag(user);
      } else {
        this.call('getBasicUser', this.userId, (err, result) => {
          setTag(result);
        });
      }

      if (this.width == null) {
        this.width = 50;
      }

      if (this.height == null) {
        this.height = this.width;
      }
    }],
  });
