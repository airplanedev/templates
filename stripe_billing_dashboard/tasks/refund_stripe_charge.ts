// Remove the test Stripe API key below and replace with your own from a config variable
// How to use config variables in Airplane: https://docs.airplane.dev/platform/configs
const stripeAPIKey =
  process.env.STRIPE_SECRET_KEY ?? "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
const stripe = require("stripe")(stripeAPIKey);

type Params = {
  charge_id: string;
};

export default async function (params: Params) {
  const refund = await stripe.refunds.create({
    charge: params.charge_id,
  });

  return [
    {
      refund_date: refund.created,
      amount: refund.amount,
      charge_id: refund.charge,
      status: refund.status,
    },
  ];
}
