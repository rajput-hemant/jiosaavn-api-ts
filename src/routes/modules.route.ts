import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, toCamelCase, validLangs } from "../lib/utils";
import { modulesPayload } from "../payloads/modules.payload";
import { ModuleResponse, ModulesRequest } from "../types/modules";
import { CustomResponse } from "../types/response";

export const modules = new Hono();

const { launch_data } = config.endpoint.modules;

modules.get("*", async (c) => {
  const { lang = "", raw = "", camel = "" } = c.req.query();

  const data = await api<ModulesRequest>(launch_data, {
    query: { language: validLangs(lang) },
  });

  if ("error" in data) {
    throw new Error("Something went wrong");
  }

  if (parseBool(raw)) {
    return c.json(data);
  }

  const payload = modulesPayload(data);

  const response: CustomResponse<ModuleResponse> = {
    status: "Success",
    message: "✅ Home Data fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});
