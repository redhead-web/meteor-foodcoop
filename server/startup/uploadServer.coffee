Meteor.startup () ->
  UploadServer.init
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, #create the directories for you
    imageVersions:
      thumbnailBig: {width: 900, height: 900},
      thumbnailSmall: {width: 200, height: 200}
    getFileName: (fileInfo, formData) ->
      "product-" + fileInfo.name
    getDirectory: (fileInfo, formData) ->
      '/'
