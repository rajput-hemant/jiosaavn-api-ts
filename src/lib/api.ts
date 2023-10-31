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
    },
  });

  const data = await response.json();

  return data as T;
};
