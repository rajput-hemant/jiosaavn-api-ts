import { Hono } from "hono";

import { modulesPayload } from "../payloads/modules";
import { api } from "../services/api";
import { ModulesRequest } from "../types/modules";

export const modules = new Hono();

modules.get("*", async (c) => {
  try {
    const langs = c.req.query("language");

    const response = await api<ModulesRequest>("webapi.getLaunchData", {
      query: {
        language: langs ?? "hindi,english",
      },
    });

    return c.json(modulesPayload(response));
  } catch (error) {
    console.error("An error occurred:", error);

    return c.json({ error: "An error occurred" }, 500);
  }
});
