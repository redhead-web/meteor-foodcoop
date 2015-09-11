/* globals
   resetDatabase: true,
   loadDefaultFixtures: true,
*/

var Future = Npm.require('fibers/future');

resetDatabase = function () {
  console.log('Resetting database');

  // safety check
  if (!process.env.IS_MIRROR) {
    console.error('velocityReset is not allowed outside of a mirror. Something has gone wrong.');
    return false;
  }

  var fut = new Future();

  var collectionsRemoved = 0;
  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  db.collections(function (err, collections) {

    var appCollections = _.reject(collections, function (col) {
      return col.collectionName.indexOf('velocity') === 0 ||
        col.collectionName === 'system.indexes';
    });

    if (appCollections.length > 0) {
      _.each(appCollections, function (appCollection) {
        appCollection.remove(function (e) {
          if (e) {
            console.error('Failed removing collection', e);
            fut.return('fail: ' + e);
          }
          collectionsRemoved++;
          console.log('Removed collection');
          if (appCollections.length === collectionsRemoved) {
            console.log('Finished resetting database');
            fut['return']('success');
          }
        });
      });
    } else {
      console.log('No collections found. No need to reset anything.');
      fut['return']('success');
    }

  });

  return fut.wait();
};

loadDefaultFixtures = function () {
  console.log('Loading default fixtures');
  // TODO: Insert your data into the database here
  var i, id, len, user, users;

  users = [
    {
      email: 'sean@maplekiwi.com',
      name: 'Sean Stanley Master Role',
      roles: ['admin']
    }, {
      email: 'sean@foodcoop.nz',
      name: 'Sean Stanley Customer Role',
      roles: []
    }, {
      email: 'sean@corymbosa.me',
      name: 'Sean Stanley Big Customer Role',
      roles: ['wholesaleBuyer']
    }
  ];

  for (i = 0; i < users.length; i++) {
    user = users[i];
    id = Accounts.createUser({
      email: user.email,
      password: "12345678",
      createdAt: Date.now,
      profile: {
        name: user.name,
        address: 'home',
        phone: '123'
      }
    });
    if (user.roles.length !== 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
  }
  console.log('Finished loading default fixtures');
};


beforeAll(function () {
  resetDatabase();
  //loadDefaultFixtures();
});
