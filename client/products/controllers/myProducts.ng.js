angular.module('food-coop').controller('MyProductsCtrl', function ($scope, $reactive, $mdDialog, $mdToast) {
  $reactive(this).attach($scope);

  this.subscribe('my-products');

  this.sort = { name: 1 };

  this.helpers({
    products() {
      return Products.find({ producer: Meteor.userId() }, { sort: this.getReactively('sort') });
    },
  });

  this.save = (product, modifier) => {
    Products.update(product._id, modifier, function (err, result) {
      if (err) {
        console.error(err);
        $mdToast.simple().content(err.message).position('bottom left').hideDelay(3000);
      } else if (!result) {
        $mdToast.simple().content('sorry, update not saved. Check your connection and try again.').position('bottom left').hideDelay(3000);
      }
      console.log(result);
    });
  };
});
