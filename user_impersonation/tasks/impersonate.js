import WorkOS from "@workos-inc/node";

/**
 * Generates a magic link for impersonating a given user.
 *
 * The below is an example using WorkOS. Swap out with your auth provider of
 * choice.
 */
const generateSignInLink = async (userEmail) => {
  const w = new WorkOS(process.env.WORKOS_API_KEY);
  const resp = await w.passwordless.createSession({
    type: "MagicLink",
    email: userEmail,
  });
  return {
    link: resp.link,
  };
}

export default async function (params) {
  await generateSignInLink(params.user_email);
}
