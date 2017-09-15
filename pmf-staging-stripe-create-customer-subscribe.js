var stripe = require('stripe@4.14.0');

module.exports = function(context, cb) {
  stripe(context.secrets.stripe_private_api_key).customers.create({
    email: context.body.stripeEmail || null,
    source: context.body.stripeToken || null,
    plan: "PMF",
  }, (err, customer) => {
    cb(null, { status: err ? 400 : 200, customer: customer });
  });
};
