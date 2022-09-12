import WorkOS from "@workos-inc/node";

const WORKOS_API_KEY = process.env.WORKOS_API_KEY;
const w = new WorkOS(WORKOS_API_KEY);

export default async function (params) {
  const resp = await w.passwordless.createSession({
    type: "MagicLink",
    email: params.user_email,
  });
  return {
    link: resp.link,
  };
}
