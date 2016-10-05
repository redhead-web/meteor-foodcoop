// import angular from 'angular'
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import ngMaterial from 'angular-material';
import ngFileUpload from 'ng-file-upload';
import { Random } from 'meteor/random';


import templateUrl from './fcImgUpload.html';

class photoUploadController {
  constructor($scope, $rootScope, Upload) {
    'ngInject';
    this.blobPreview;
    this.Upload = Upload;
  }

  uploadFiles(file, errFiles) {
    this.invalidFiles = [];
    if (errFiles.length > 0) {
      this.invalidFiles = errFiles;
      return;
    }
    if (file && !file.$error) {
      // get instant preview
      this.blobPreview = file.$ngfBlobUrl;
      this.Upload.upload({
        url: `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.cloud_name}/image/upload`,
        fields: {
          upload_preset: Meteor.settings.public.cloudinary.upload_preset,
          tags: Meteor.settings.public.coopName,
          context: `photo${Random.id(6)}`,
        },
        file,
      }).then((data) => {
        this.onSuccess({ data });
        this.blobPreview = undefined;
      }, (data, status) => {
        // on error
        console.log(data);
        console.log(status);
        file.status = status;
        this.onError({ error: data });
      }, (e) => {
        this.progress = Math.round((e.loaded * 100.0) / e.total);
        file.status = `'Uploading... ${file.progress}%`;
      });
    }
  }

  dragOverClass($event) {
    const items = $event.dataTransfer.items;
    let hasFile = false;
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          hasFile = true;
          break;
        }
      }
    } else {
      hasFile = true;
    }
    return hasFile ? 'dragover' : 'dragover-err';
  }
}

const name = 'fcImgUpload';

// create a module
export default angular.module(name, [
  'cloudinary',
  ngFileUpload,
  ngMaterial,
]).component(name, {
  templateUrl,
  controller: photoUploadController,
  bindings: {
    onSuccess: '&',
    onError: '&',
  },
})
  .config((CloudinaryProvider) => {
    'ngInject';
    CloudinaryProvider.configure({
      cloud_name: Meteor.settings.public.cloudinary.cloud_name,
      api_key: Meteor.settings.public.cloudinary.upload_preset,
    });
  });
