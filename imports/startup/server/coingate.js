import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';
import crypto from 'crypto';

const {
  appId: APP_ID,
  key: API_KEY,
  secret: API_SECRET,
  apiRoot: API_ROOT,
} = Meteor.settings.coingate;

const defaultOrder = {
  order_id: 'testId',
  price: 50.00,
  currency: 'NZD',
  receive_currency: 'BTC',
  title: 'Balance Purchase',
  description: 'Purchase store credit with cryptocurrency',
  callback_url: Meteor.absoluteUrl('/crypto-payments?token=testId'),
  cancel_url: Meteor.absoluteUrl('/cart'),
  success_url: Meteor.absoluteUrl('/success'),
};

function coingatePayment(order = {}) {
  const NONCE = Date.now() * 1e6;
  const signature = crypto.createHmac('sha256', API_SECRET)
    .update(NONCE + APP_ID + API_KEY).digest('hex');
  console.log(NONCE);
  console.log(signature);
  const response = HTTP.post(`${API_ROOT}orders`, {
    headers: {
      'Access-Key': API_KEY,
      'Access-Nonce': NONCE,
      'Access-Signature': signature,
    },
    body: Object.assign({}, defaultOrder, order),
  });

  console.log(response.body);
  return response.body;
}

Meteor.methods({ coingatePayment });
Picker.middleware(bodyParser.json());
const postEndPoints = Picker.filter(req => req.method === 'POST');

postEndPoints.route('/crypto-payments', (req, res) => {
  console.log(req.body);
  return res.send(200);
});
