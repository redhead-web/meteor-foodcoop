/* globals
   resetDatabase: true,
   loadDefaultFixtures: true,
*/

var resetDatabase = function () {
  // safety check
  if (!process.env.IS_MIRROR) {
    throw new Meteor.Error(
      'NOT_ALLOWED',
      'velocityReset is not allowed outside of a mirror. Something has gone wrong.'
    );
  }

  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  var collections = Meteor.wrapAsync(db.collections, db)();
  var appCollections = _.reject(collections, function (col) {
    return col.collectionName.indexOf('velocity') === 0 ||
      col.collectionName === 'system.indexes';
  });

  _.each(appCollections, function (appCollection) {
    console.log('remove ' + appCollection.collectionName);
    Meteor.wrapAsync(appCollection.remove, appCollection)();
  });
};

var loadDefaultFixtures = function () {
  console.log('Loading default fixtures');
  // TODO: Insert your data into the database here
  var id, users, categories, certifications;

	categories = [
	  {
	    name: 'Seedlings'
	  }, {
	    name: 'Baked Goods'
	  }, {
	    name: 'Meat'
	  }, {
	    name: 'Dairy & Eggs'
	  }, {
	    name: 'Produce'
	  }, {
	    name: 'Preserves'
	  }, {
	    name: 'Tea & Beverages'
	  }, {
	    name: 'Ready-made Meals'
	  }
	];

	for (let i = 0, len = categories.length; i < len; i++) {
	  let cat = categories[i];
	  Categories.insert(cat);
	}

	certifications = [
	  {
	    name: 'Assure Qual',
	    img: 'certification/assure-quality.png'
	  }, {
	    name: 'Biogro',
	    img: 'certification/biogro.png'
	  }, {
	    name: 'Demeter',
	    img: 'certification/demgreen.gif'
	  }, {
	    name: 'Organic Farm NZ',
	    img: 'certification/organicfarmnz.png'
	  }, {
	    name: 'In Transition'
	  }
	];

	for (let i = 0, len = certifications.length; i < len; i++) {
	  let cert = certifications[i];
	  Certifications.insert(cert);
	}

  users = [
    { email: 'sean@maplekiwi.com', name: 'Sean Stanley Master Role', roles: ['admin', 'producer', 'deliveryCoordinator']},
    { email: 'sean@foodcoop.nz', name: 'Sean Stanley Customer Role', roles: []},
    { email: 'sean@corymbosa.me', name: 'Sean Stanley Producer Role', roles: ['producer']}
  ];

  for (let i = 0, len = users.length; i < len; i++) {
    let user = users[i];
    id = Accounts.createUser({
      email: user.email,
      password: "12345678",
      createdAt: Date.now,
      profile: {
        name: user.name,
      }
    });
    if (user.roles.length !== 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
  }

  var products;

  producer = Meteor.users.findOne(id)

  products = [
    {
      name: 'Plum Jam',
      producer: producer._id,
      producerName: producer.profile.name,
      price: 5,
      unitOfMeasure: "400 g jar",
      category: "processed goods",
      stocklevel: 50,
      published: true
    }, {
      name: 'Raw Milk',
      producer: producer._id,
      producerName: producer.profile.name,
      price: 2,
      unitOfMeasure: "L",
      category: "Eggs & Dairy",
      published: true
    }
  ];

  for (let i = 0, len = products.length; i < len; i++) {
    let product = products[i];
    Products.insert(product);
  }

  console.log('Finished loading default fixtures');
};

Meteor.methods({
  resetDatabase:resetDatabase,
  loadDefaultFixtures: loadDefaultFixtures
});
