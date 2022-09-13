// Remove the test Stripe API key below and replace with your own from a config variable
// How to use config variables in Airplane: https://docs.airplane.dev/platform/configs
const stripeAPIKey =
  process.env.STRIPE_SECRET_KEY ?? "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
const stripe = require("stripe")(stripeAPIKey);

type Params = {
  search_keyword: string;
};

export default async function (params: Params) {
  const customers = await stripe.customers.search({
    query: "email~'" + params.search_keyword + "'",
  });

  const customer_data = customers.data.map((customer) => ({
    id: customer.id,
    email: customer.email,
    name: customer.name,
  }));

  return customer_data;
}
