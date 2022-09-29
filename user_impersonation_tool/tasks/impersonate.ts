import WorkOS from "@workos-inc/node";

/**
 * Generates a magic link for impersonating a given user.
 *
 * The below is an example using WorkOS. Swap out with your auth provider of
 * choice.
 */
const generateSignInLink = async (userEmail: string) => {
  const apiKey = process.env.WORKOS_API_KEY ?? "";

  // Return mock data if WORKOS_API_KEY is not set.
  // Delete this once you create a config variable for WORKOS_API_KEY and set the environment variable.
  if (apiKey === "") {
    return { link: "https://airplane.dev" };
  }

  const w = new WorkOS(apiKey);
  const resp = await w.passwordless.createSession({
    type: "MagicLink",
    email: userEmail,
  });
  return { link: resp.link };
};

type Params = {
  user_email: string;
};

export default async function (params: Params) {
  return await generateSignInLink(params.user_email);
}
