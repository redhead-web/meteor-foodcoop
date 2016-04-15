function gstListController($scope, $reactive) {
  "ngInject";
  $reactive(this).attach($scope);
  this.autorun(()=>{
    this.product = Products.findOne(this.sale.productId);
  });
}

angular.module('food-coop').component('gstList', {
  templateUrl: 'client/user/components/gstList/gst-list.ng.html',
  controller: gstListController,
  bindings: {
    sale: "<",
  }
})