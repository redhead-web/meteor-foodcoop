/* globals BrainTreeConnect, braintree */

var gateway = BrainTreeConnect({
  environment: Braintree.Environment.Sandbox,
  merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
  publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
  privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
})

var nonce = Braintree.Test.Nonces.Transactable;

var user;

describe('transaction meteor method', function() {

  beforeAll(function() {
    user = Meteor.users.findOne();
  });

  it('should be able to successfully sell $10.00 of goods/services and update a user', function() {
    var result = Meteor.call('braintreeTransaction', {
      total: 10, user: user, paymentMethodNonce: 'fake-paypal-one-time-nonce', options: {store:true}
    });

    expect(result.success).toBeTruthy();
    expect(result.errors).toBeFalsy();
    expect(result.transaction.status).toBe('settling');
    expect(result.transaction.type).toBe('sale');
  });

  it('consumed nonce should fail to sell $10.00 of goods.', function() {
    var nonce = Braintree.Test.Nonces.Consumed;

    var result = Meteor.call('braintreeTransaction', {
      total: 10, user: user, paymentMethodNonce: nonce, options: {store:false}
    });
    expect(result.errors).toBeTruthy();
    expect(result.success).toBe(false);
    expect(result.message).toBe('Cannot use a payment_method_nonce more than once.')
  });
});
