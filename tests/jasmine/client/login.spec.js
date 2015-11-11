Jasmine.onTest(function() {
  beforeAll(function(done) {
    Meteor.loginWithPassword('sean@maplekiwi.com','12345678', done);
  }
}
