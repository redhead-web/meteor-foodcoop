angular.module("food-coop").controller('photoUploadCtrl', ['$scope', '$rootScope', 'Upload',
/* Uploading with Angular File Upload */
function($scope, $rootScope, Upload) {
  var d = new Date();
  var title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
  $scope.uploadFiles = function(file, errFiles, model, key, title, callback){
    let cb = callback || angular.noop;
    if (errFiles.length > 0) return $scope.invalidFiles = errFiles;
    if (file && !file.$error) {
      //get instant preview
      model[key] = file.$ngfBlobUrl;
      
      if (title == undefined) title = Random.id(6);
      Upload.upload({
        url: "https://api.cloudinary.com/v1_1/" + Meteor.settings.public.cloudinary.cloud_name + "/image/upload",
        fields: {
          upload_preset: Meteor.settings.public.cloudinary.upload_preset,
          tags: 'Whangareifoodcoop',
          context: 'photo=' + title
        },
        file: file
      }).then(function (data, status, headers, config) {
        file.result = data.data.public_id;
        file.url = data.data.secure_url;
				model[key] = {
					url: data.data.secure_url,
					result: data.data.public_id
				}
        cb(model, data);
      }, function (data, status, headers, config) {
        file.result = data;
      }, function (e) {
        $scope.progress = Math.round((e.loaded * 100.0) / e.total);
        file.status = "Uploading... " + file.progress + "%";
      });
    }
  };

  /* Modify the look and fill of the dropzone when files are being dragged over it */
  $scope.dragOverClass = function($event) {
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
  };
}]);
