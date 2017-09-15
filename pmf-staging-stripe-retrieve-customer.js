var stripe = require('stripe@4.14.0');

module.exports = function(context, cb) {
  if (!context.data.id) {
    cb(null, {status: 'Please provide a Stripe user ID'})
  }
  stripe(context.secrets.stripe_private_api_key).customers.retrieve(
    context.data.id,
    (err, customer) => {
      cb(null, { status: err ? 400 : 200, customer: customer });
    });
};