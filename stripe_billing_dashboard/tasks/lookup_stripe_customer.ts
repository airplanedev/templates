// Remove the test Stripe API key below and replace with your own from a config variable
// How to use config variables in Airplane: https://docs.airplane.dev/platform/configs
const stripeAPIKey =
  process.env.STRIPE_SECRET_KEY ?? "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
const stripe = require("stripe")(stripeAPIKey);

type Params = {
  customer_id: string;
};

export default async function (params: Params) {
  const customer = await stripe.customers.retrieve(params.customer_id);

  return [
    {
      id: customer.id,
      email: customer.email,
      next_invoice_sequence: customer.next_invoice_sequence,
      currency: customer.currency,
      name: customer.name,
    },
  ];
}
