/* globals Cart */
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Products } from '../../../../imports/api/products';


export function removeFromCart(id) {
  check(id, String);
  if (Roles.userIsInRole(this.userId, 'admin') || this.connection == null) { // server call or admin
    const item = Cart.Items.findOne(id);
    const result = Cart.Items.remove(id);
    if (result) {
      return Products.update(item.productId, {
        $inc: { stocklevel: item.qty },
        $pull: { carted: { user: item.userId } },
      });
    }
    throw new Meteor.Error(500, 'failed to delete that cart item sorry');
  }

  throw new Meteor.Error(401, 'you don\'t have permission to call this method');
}

Meteor.methods({
  removeFromCart,
});
