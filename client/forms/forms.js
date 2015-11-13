// Template.imageUpload.created = function() {
//   Uploader.init(this);
// }
//
// Template.imageUpload.rendered = function () {
//   Uploader.render.call(this);
// };
//
// Template.imageUpload.events({
//   'click .start': function (e) {
//     Uploader.startUpload.call(Template.instance(), e);
//   }
// });
//
// Template.imageUpload.helpers({
//   'infoLabel': function() {
//     var instance = Template.instance();
//
//     // we may have not yet selected a file
//     var info = instance.info.get()
//     if (!info) {
//       return;
//     }
//
//     var progress = instance.globalInfo.get();
//
//     // we display different result when running or not
//     return progress.running ?
//       info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
//       info.name + ' - ' + info.size + 'B';
//   },
//   'progress': function() {
//     return Template.instance().globalInfo.get().progress + '%';
//   }
// })
