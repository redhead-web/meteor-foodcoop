angular.module("food-coop").controller('photoUploadCtrl', ['$scope', '$rootScope', 'Upload',
/* Uploading with Angular File Upload */
function($scope, $rootScope, Upload) {
  var d = new Date();
  var title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
  $scope.uploadFiles = function(file, title){
    if (!file) return;
    if (file && !file.$error) {
      file.upload = Upload.upload({
        url: "https://api.cloudinary.com/v1_1/" + Meteor.settings.public.cloudinary.cloud_name + "/image/upload",
        fields: {
          upload_preset: Meteor.settings.public.cloudinary.upload_preset,
          tags: 'kaikohefoodcoop',
          context: 'photo=' + title
        },
        file: file
      }).progress(function (e) {
        file.progress = Math.round((e.loaded * 100.0) / e.total);
        file.status = "Uploading... " + file.progress + "%";
      }).success(function (data, status, headers, config) {
        data.context = {custom: {photo: title}};
        file.result = data;
        $rootScope.photos.push(data);
      }).error(function (data, status, headers, config) {
        file.result = data;
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
