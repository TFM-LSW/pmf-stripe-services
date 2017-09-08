var stripe = require('stripe@4.14.0');
var R = require('ramda@0.23.0');

module.exports = function(context, cb) {
  if (!context.data.email) {
    cb(null, {status: 401, message: 'Please provide an email address'})
  }
  stripe(context.secrets.stripe_private_api_key).subscriptions.del(
    context.data.subscriptionId,
    (err, confirmation) => {
      if (!err && confirmation) {
        cb(null, { status: 200, data: confirmation});
      } else {
        cb(null, { status: 400, message: 'An error occured with Stripe', error: err });
      }
    });
};