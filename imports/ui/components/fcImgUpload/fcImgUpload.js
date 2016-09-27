// import angular from 'angular'
import { Meteor } from 'meteor/meteor'
import ngMaterial from 'angular-material'
import ngFileUpload from 'ng-file-upload'
import { Random } from 'meteor/random'


import templateUrl from './fcImgUpload.html'

class photoUploadController {
  constructor($scope, $rootScope, Upload) {
    'ngInject';
    this.blobPreview;
    this.Upload = Upload
  }

  uploadFiles(file, errFiles) {
    if (errFiles.length > 0) return this.invalidFiles = errFiles;
    if (file && !file.$error) {
      //get instant preview
      this.blobPreview = file.$ngfBlobUrl;
      this.Upload.upload({
        url: `https://api.cloudinary.com/v1_1/${Meteor.settings["public"].cloudinary.cloud_name}/image/upload`,
        fields: {
          upload_preset: Meteor.settings["public"].cloudinary.upload_preset,
          tags: 'Whangareifoodcoop',
          context: 'photo=' + Random.id(6)
        },
        file: file
      }).then((data, status, headers, config) => {
        this.onSuccess({data})
        this.blobPreview = undefined
      }, (data, status, headers, config) => {
        // on error
        console.log(data)
        console.log(status)
        file.status = status
        this.onError({error: data})

      }, (e) => {
        this.progress = Math.round((e.loaded * 100.0) / e.total);
        file.status = "Uploading... " + file.progress + "%";
      })
    }
  }

  dragOverClass($event) {
    var items = $event.dataTransfer.items;
    var hasFile = false;
    if (items != null) {
      for (var i = 0 ; i < items.length; i++) {
        if (items[i].kind == 'file') {
          hasFile = true;
          break;
        }
      }
    } else {
      hasFile = true;
    }
    return hasFile ? "dragover" : "dragover-err";
  }
}



const name = 'fcImgUpload';

// create a module
export default angular.module(name, [
  'cloudinary',
  ngFileUpload,
  ngMaterial
]).component(name, {
  templateUrl,
  controller: photoUploadController,
  bindings: {
    onSuccess: "&",
    onError: "&"
  }
})
  .config(config);

function config(cloudinaryProvider, $mdIconProvider) {
  'ngInject';
  cloudinaryProvider
    .set("cloud_name", Meteor.settings.public.cloudinary.cloud_name)
    .set("upload_preset", Meteor.settings.public.cloudinary.upload_preset);
  $mdIconProvider
    .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg")

}
