// Write your package code here!

ewayRapid = Npm.require('eway-rapid');


ewayConnect = function(key, password, endpoint) {
  let ewayObj;
  let methods = [
    'createTransaction',
    'queryCustomer',
    'createCustomer',
    'updateCustomer',
    'settlementSearch',
    'refund',
    'queryTransaction',
    'cancelTransaction' // For auth transactions
  ]
  
  ewayObj = ewayRapid.createClient(key, password, endpoint)
  
  _.each(methods, function(key) {
    ewayObj[key] = Promise.await(ewayObj[key])
  });
  
  return ewayObj;
};


