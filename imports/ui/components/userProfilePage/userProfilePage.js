/* globals Likes Roles Markup */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Products } from '../../../api/products';
import fcImgUpload from '../fcImgUpload/fcImgUpload';

import templateUrl from './userProfilePage.html';

class userProfilePageController {
  constructor($scope, $reactive, $stateParams, uiGmapGoogleMapApi, $mdToast) {
    'ngInject';
    const indexOf = [].indexOf || function (item) { for (let i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    $reactive(this).attach($scope);

    this.subscribe('producer', () => [$stateParams.userId]);

    this.subscribe('active-products', () => [
      {
        producer: $stateParams.userId,
      }, -1, {
        name: 1,
      },
    ]);

    this.helpers({
      likesCount() {
        return Likes.find({
          likee: $stateParams.userId,
        });
      },
      products() {
        return Products.find({
          producer: $stateParams.userId,
        }, {
          sort: {
            name: 1,
          },
        });
      },
    });

    this.autorun(() => {
      this.producer = Meteor.users.findOne($stateParams.userId);
      if (this.producer && this.producer._id) {
        const producer = this.producer;
        this.mapSettings = {
          center: {
            latitude: -35.7251117,
            longitude: 174.323708,
          },
          zoom: 10,
          options: {
            scrollwheel: false,
          },
          events: {
            tilesloaded(map) {
              return uiGmapGoogleMapApi.then((maps) => {
                if (producer.profile.deliveryAddress.latitude != null) {
                  this.map.setCenter({
                    lat: producer.profile.deliveryAddress.latitude,
                    lng: producer.profile.deliveryAddress.longitude,
                  });
                  this.markerSettings = {
                    id: $stateParams.userId,
                    coords: {
                      latitude: producer.profile.deliveryAddress.latitude,
                      longitude: producer.profile.deliveryAddress.longitude,
                    },
                    options: {},
                  };
                }
                if (producer.profile.deliveryAddress.place_id != null) {
                  const service = new maps.places.PlacesService(map);
                  service.getDetails({
                    placeId: producer.profile.deliveryAddress.place_id,
                  }, result => $scope.$apply(() => {
                    this.map.setCenter({
                      lat: result.geometry.location.lat(),
                      lng: result.geometry.location.lng(),
                    });
                    new maps.Marker({ map: this.map, position: this.map.getCenter() });
                  }));
                }
              });
            },
          },
        };
      }
    });

    this.autorun(() => {
      this.isOwner = (Meteor.userId() != null) && (Meteor.userId() === $stateParams.userId || Roles.userIsInRole(Meteor.userId(), 'admin'));
    });

    this.autorun(() => {
      const ref = $stateParams.userId;
      if (Meteor.user()) {
        const list = Meteor.user().profile.lovedProducers || [];
        if (indexOf.call(list, ref) >= 0) {
          this.lovesProducer = true;
        } else {
          this.lovesProducer = false;
        }
      }
    });

    this.toggleLike = () => {
      if (Meteor.userId() == null) {
        return $mdToast
        .show(
          $mdToast
          .simple()
          .content('Please login to endorse this producer')
          .position('bottom right')
          .hideDelay(4000)
        );
      }
      const like = Likes.findOne({
        liker: Meteor.userId(),
        likee: this.producer._id,
      });
      if (like != null) {
        Likes.remove(like._id);
        return $mdToast
          .show(
            $mdToast
            .simple()
            .content('Removed your endorsement')
            .position('bottom right')
            .hideDelay(4000)
          );
      }
      return this.call('/likes/add', this.producer._id, 'user', (err) => {
        if (err) {
          console.log(err);
        } else {
          $mdToast
          .show(
            $mdToast
            .simple()
            .content('Clap clap! Thanks for your endorsement!')
            .position('bottom right')
            .hideDelay(4000)
          );
        }
      });
    };
    this.likesProducer = (userId) => {
      if (Likes.findOne({
        liker: Meteor.userId(),
        likee: userId,
      })) {
        return 'liked';
      }
      return 'not-liked';
    };

    this.priceWithMarkup = (product) => Markup(product).total();

    this.modelOptions = {
      updateOn: 'default blur',
      debounce: {
        default: 200,
        blur: 0,
      },
    };

    this.save = () => {
      Meteor.users.update($stateParams.userId, {
        $set: {
          'profile.companyName': this.producer.profile.companyName,
          'profile.summary': this.producer.profile.summary,
          'profile.bio': this.producer.profile.bio,
          'profile.shareAddress': this.producer.profile.shareAddress,
          'profile.logo': this.producer.profile.logo,
          'profile.banner': this.producer.profile.banner,
          'profile.website': this.producer.profile.website,
          'profile.chemicals': this.producer.profile.chemicals,
          'profile.video': this.producer.profile.video,
        },
      }, (err) => {
        if (err) {
          console.error(err);
          $mdToast
          .show(
            $mdToast
            .simple()
            .content('Connection Error: Failed to Save')
            .position('bottom right')
            .hideDelay(4000)
          );
        }
      });
    };
  }

  deleteLogo() {
    if (this.isOwner) {
      Meteor.users.update(this.producer._id, { $set: {
        'profile.logo.url': null,
        'profile.logo.result': null,
      } });
    }
  }

  deletePhoto() {
    if (this.isOwner) {
      Meteor.users.update(this.producer._id, { $set: {
        'profile.personalPic.url': null,
        'profile.personalPic.result': null,
      } });
    }
  }

  logoUploadSuccess(data) {
    this.updateImage(data, 'profile.personalPic');
  }
  photoUploadSuccess(data) {
    this.updateImage(data, 'profile.logo');
  }
  updateImage(data, field) {
    if (this.isOwner) {
      const update = {};
      update[`${field}.url`] = data.data.secure_url;
      update[`${field}.result`] = data.data.public_id;
      Meteor.users.update(this.producer._id, { $set: update });
    }
  }
}
const name = 'userProfilePage';

export default angular.module(name, [fcImgUpload.name]).component(name, {
  templateUrl,
  controller: userProfilePageController,
  controllerAs: 'ctrl',
}).config(($stateProvider) => {
  'ngInject';
  $stateProvider.state('producer', {
    url: '/profile/:userId',
    template: '<user-profile-page></user-profile-page>',
  });
});
