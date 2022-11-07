import airplane from "airplane";
import axios from "axios";

type Params = {
  subdomain: string;
  target: string;
};

const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4/";
// Configured in env vars
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

export default async function (params: Params) {
  // https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record
  let response;
  try {
    response = await axios.post(
      `${CLOUDFLARE_API_URL}zones/${ZONE_ID}/dns_records`,
      {
        type: "A",
        name: params.subdomain,
        content: params.target,
        ttl: 3600,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
  } catch (err) {
    throw new Error(
      `API call to Cloudflare failed. Status ${
        (err as any).response?.status
      }:\n${JSON.stringify((err as any).response.data)}`
    );
  }

  // Optional: show results of the request.
  const data = response.data;
  if (data.success) {
    await airplane.display.markdown(
      `Successfully created A record for \`${data.result.name}\` to \`${data.result.content}\``
    );
  } else {
    await airplane.display.markdown(
      `Failed creating A record for \`${data.result.name}\` to \`${data.result.content}\``
    );
  }
  await airplane.display.json(data.result);

  if (!data.success) {
    throw new Error(`API call to Cloudflare failed.`);
  }
  return { resultID: data.result.id };
}
