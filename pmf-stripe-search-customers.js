var stripe = require('stripe@4.14.0');
var R = require('ramda@0.23.0');

module.exports = function(context, cb) {
  if (!context.data.email) {
    cb(null, {status: 401, message: 'Please provide an email address'})
  }
  stripe(context.secrets.stripe_private_api_key).customers.list(
    { limit: 10000 },
    (err, customers) => {
      if (!err && customers) {
        const customer = R.find(R.propEq('email', context.data.email))(customers.data);
        cb(null, { status: customer ? 200 : 402, customer: customer, message: customer ? 'Customer found':'No customer found' });
      } else {
        cb(null, { status: 400, message: 'An error occured with Stripe', error: err });
      }
    });
};