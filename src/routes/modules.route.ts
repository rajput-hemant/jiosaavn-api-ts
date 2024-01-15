import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, validLangs } from "../lib/utils";
import { modulesPayload } from "../payloads/modules.payload";
import { CModulesRespose, ModulesRequest } from "../types/modules";

const { launch_data: l } = config.endpoint.modules;

/* -----------------------------------------------------------------------------------------------
 * Modules Route Handler - GET /modules
 * -----------------------------------------------------------------------------------------------*/

export const modules = new Hono();

modules.get("*", async (c) => {
  const { lang = "", mini = "", raw = "" } = c.req.query();

  const data = await api<ModulesRequest>(l, {
    query: { language: validLangs(lang) },
  });

  if ("error" in data) throw new Error("Something went wrong");

  if (parseBool(raw)) return c.json(data);

  const payload = modulesPayload(data, parseBool(mini));

  const response: CModulesRespose = {
    status: "Success",
    message: "✅ Home Data fetched successfully",
    data: payload,
  };

  return c.json(response);
});
