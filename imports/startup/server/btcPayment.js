import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';

function generateReceivingAddress(orderId) {
  const callbackAddress = `${Meteor.absoluteUrl('api/paymentReceived')}?orderId=${orderId}`;
  return HTTP.get(`https://api.blockchain.info/v2/receive?xpub=${Meteor.settings.xPubBtc}&callback=${encodeURIComponent(callbackAddress)}&key=${'aa'}`);
}

function paymentReceived(data) {
  console.log(data);
}

Meteor.methods({ generateReceivingAddress, paymentReceived });

Picker.route('/api/paymentReceived', (req, res) => {
  Meteor.call('paymentReceived', req.body);
  res.status(200).send('payment received');
});
