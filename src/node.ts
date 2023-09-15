import { serve } from "@hono/node-server";

import server from ".";

serve(server, (info) => {
  console.log(`Server listening on ${info.address}:${info.port}`);
});
