import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import ngFileUpload from 'ng-file-upload';
import { Random } from 'meteor/random';
import 'cloudinary-angular/dist/cloudinary-angular';


import templateUrl from './fcImgUpload.html';

class photoUploadController {
  constructor($scope, $rootScope, Upload) {
    'ngInject';
    this.blobPreview;
    this.Upload = Upload;
  }

  uploadFiles(file, errFiles) {
    if (errFiles.length > 0) {
      this.invalidFiles = errFiles;
      return this.invalidFiles;
    }
    if (file && !file.$error) {
      // get instant preview
      this.blobPreview = file.$ngfBlobUrl;
      this.Upload.upload({
        url: `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.cloud_name}/image/upload`,
        fields: {
          upload_preset: Meteor.settings.public.cloudinary.upload_preset,
          tags: 'WhangareiFoodcoop',
          context: `photo=${Random.id(6)}`,
        },
        file,
      }).then((data) => {
        this.onSuccess({ data });
        this.blobPreview = undefined;
      }, (data, status) => {
        // on error
        console.log(data);
        console.log(status);
        this.status = status;
        this.onError({ error: data });
      }, (e) => {
        this.progress = Math.round((e.loaded * 100.0) / e.total);
        this.status = `Uploading... ${file.progress}%`;
      });
    }
    return file;
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

function config(CloudinaryProvider) {
  'ngInject';
  CloudinaryProvider.configure({
    cloud_name: Meteor.settings.public.cloudinary.cloud_name,
    api_key: Meteor.settings.public.cloudinary.upload_preset,
  });
}

// create a module
export default angular.module(name, [
  'cloudinary',
  ngFileUpload,
]).component(name, {
  templateUrl,
  controller: photoUploadController,
  bindings: {
    onSuccess: '&',
    onError: '&',
  },
})
.config(config);
