// Meteor.publish("products", function () {
//   return Products.find({
//     $or:[
//       {$and:[
//         {"public": true},
//         {"public": {$exists: true}}
//       ]},
//       {$and:[
//         {published: true},
//         {published: {$exists: true}}
//       ]}
//     ]});
// });
