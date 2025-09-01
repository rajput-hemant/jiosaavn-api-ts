import { config } from "./config";

export const api = async <T>(
  path: string,
  {
    isVersion4 = true,
    query,
  }: { isVersion4?: boolean; query?: Record<string, string> } = {}
) => {
  const params = new URLSearchParams({
    _format: "json",
    _marker: "0",
    ctx: "web6dot0",
    ...(isVersion4 ? { api_version: "4" } : {}),
    ...query,
  });

  const url = `${config.urls.baseUrl}?__call=${path}&${params}`;
  const langs = params.get("language") || "hindi,english";

  const response = await fetch(url, {
    headers: {
      cookie: `L=${langs}; gdpr_acceptance=true; DL=english`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      referer: "https://www.jiosaavn.com/",
      origin: "https://www.jiosaavn.com",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
    },
  });

  const text = await response.text();
  console.log("JioSaavn API raw response:", text);
  try {
    const data = JSON.parse(text);
    return data as T;
  } catch (err) {
    console.error("Failed to parse JioSaavn API response as JSON:", err);
    throw err;
  }
};
