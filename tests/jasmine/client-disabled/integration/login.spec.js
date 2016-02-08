
beforeAll(function (done) {
  Meteor.call('resetDatabase', function() {
    Meteor.call('loadDefaultFixtures', done);
  });
});

beforeAll(function(done) {
  console.log("Logging in Sean Stanley Master Role");
  Meteor.loginWithPassword('sean@maplekiwi.com','12345678', done);
});
