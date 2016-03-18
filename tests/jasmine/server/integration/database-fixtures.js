
beforeAll(function (done) {
  Meteor.call('resetDatabase', function() {
    Meteor.call('loadDefaultFixtures', done);
  });
});
