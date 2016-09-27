import Meteor from 'meteor/meteor'
import 'angular-mocks'
import {name as fcImgUpload} from '../fcImgUpload'

import { expect } from 'meteor/practicalmeteor:chai';

Meteor.settings = {public: {
 cloudinary: {
      cloud_name: "test",
      upload_preset: "mock"
    }
  }
}

describe('fcImgUpload', () => {
  beforeEach(() => {
    window.module(fcImgUpload);
  });

  describe('controller', () => {
    let controller;

    beforeEach(() => {
      angular.mock.inject(($rootScope, $componentController) => {
        controller = $componentController(fcImgUpload, {
          $scope: $rootScope.$new(true)
        });
      });
    });

    it('should have blobPreview that is undefined to start', () => {
      expect(controller.blobPreview).to.equal(undefined);
    });

    it('should be able to detect a dragged image', () => {
      const eventObject = {
        dataTransfer: {
          items: [{kind: 'file'}]
        }
      }
      const result = controller.dragOverClass(eventObject);

      expect(result).to.equal('dragover');
    });
  });
})
