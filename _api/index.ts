/* -----------------------------------------------------------------------------------------------
 * Edge Runtime
 * -----------------------------------------------------------------------------------------------*/

// import { handle } from "hono/vercel";

// import { app } from "../src";

// export const config = {
//   runtime: "edge",
//   regions: ["bom1"], // Mumbai, India (South) - bom1
// };

// export default handle(app);

/* -----------------------------------------------------------------------------------------------
 * Serverless
 * -----------------------------------------------------------------------------------------------*/

import { handle } from "@hono/node-server/vercel";

import { app } from "../src";

export default handle(app);

/* -----------------------------------------------------------------------------------------------
 * Community Based Bun Runtime
 * -----------------------------------------------------------------------------------------------*/

// Check out the src/bun.ts file for the implementation of this runtime.
