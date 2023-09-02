import { Hono } from "hono";

import { modulesPayload } from "../payloads/modules";
import { api } from "../services/api";
import { ModuleResponse, ModulesRequest } from "../types/modules";
import { CustomResponse } from "../types/response";

export const modules = new Hono();

modules.get("*", async (c) => {
  const langs = c.req.query("language");

  const data = await api<ModulesRequest>("webapi.getLaunchData", {
    query: { language: langs ?? "hindi,english" },
  });

  const response: CustomResponse<ModuleResponse> = {
    status: "Success",
    message: "✅ Home Data fetched successfully",
    data: modulesPayload(data),
  };

  return c.json(response);
});
