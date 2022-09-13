// Remove the test Stripe API key below and replace with your own from a config variable
// How to use config variables in Airplane: https://docs.airplane.dev/platform/configs
const stripeAPIKey =
  process.env.STRIPE_SECRET_KEY ?? "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
const stripe = require("stripe")(stripeAPIKey);

type Params = {
  customer_id: string;
};

export default async function (params: Params) {
  const charges = await stripe.charges.search({
    query: "customer:'" + params.customer_id + "'",
  });

  const charge_data = charges.data.map((charge) => ({
    created_at: new Date(charge.created * 1000).toDateString(),
    id: charge.id,
    amount: charge.amount,
    amount_refunded: charge.amount_refunded,
    currency: charge.currency,
    paid: charge.paid,
    status: charge.status,
    description: charge.description,
  }));

  return charge_data;
}
