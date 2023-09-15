import { handle } from "hono/vercel";

import { app } from "../src";

export const config = {
  runtime: "edge",
  regions: ["bom1"], // Mumbai, India (South) - bom1
};

export default handle(app);
