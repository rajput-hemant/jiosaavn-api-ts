import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { modulesPayload } from "../payloads/modules";
import { ModuleResponse, ModulesRequest } from "../types/modules";
import { CustomResponse } from "../types/response";

export const modules = new Hono();

modules.get("*", async (c) => {
  const { language, raw } = c.req.query();

  const data = await api<ModulesRequest>(config.endpoint.modules, {
    query: { language },
  });

  if (raw === "true") {
    return c.json(data);
  }

  const response: CustomResponse<ModuleResponse> = {
    status: "Success",
    message: "✅ Home Data fetched successfully",
    data: modulesPayload(data),
  };

  return c.json(response);
});
