// THIS ISNT CURRENTLY USED
var stripe = require('stripe@4.14.0');

module.exports = function(context, cb) {
  stripe(context.secrets.stripe_private_api_key).subscriptions.create({
    customer: context.body.customer-id,
    items: [
      {
        plan: "pmf",
      },
    ],
  }, (err, subscription) => {
    cb(null, { status: err ? 400 : 200, subscription: subscription });
  });
};