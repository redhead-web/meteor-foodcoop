/* globals Cart, GetDeliveryDay */
import { Meteor } from 'meteor/meteor';
import { Products } from '../../collection';
import Sales from '../../../../../common/collections/lib/sales';

function getPreviousProducts() {
  const ProductIds = Sales.find({
    customerId: this.userId,
    deliveryDay: { $lt: GetNextDeliveryDay().toDate() },
  }, {
    fields: { productId: 1 },
    sort: { dateCreated: 1 },
  }).map(s => s.productId);
  const productSet = new Set(ProductIds);

  // remove cart items from the list of products
  Cart.Items.find({ userId: this.userId }, { fields: { productId: 1 } })
  .forEach(c => productSet.delete(c.productId));
  return Products.find({
    _id: { $in: Array.from(productSet) },
    published: true,
  }, {
    fields: {
      published: 1,
      name: 1,
      price: 1,
      unitOfMeasure: 1,
      stocklevel: 1,
      img: 1,
      producer: 1,
      producerName: 1,
      producerCompanyName: 1,
      category: 1,
      minimumOrder: 1,
      daysNotice: 1,
      extraMarkup: 1,
      dateCreated: 1,
      last_modified: 1,
    },
  }).fetch();
}

Meteor.methods({ getPreviousProducts });
