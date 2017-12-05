/* globals Cart */
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function removeFromCart(id) {
  check(id, String);
  if (Roles.userIsInRole(this.userId, 'admin') || this.connection == null) { // server call or admin
    return Cart.Items.remove(id);
  }
  throw new Meteor.Error(401, 'you don\'t have permission to call this method');
}

Meteor.methods({
  removeFromCart,
});
