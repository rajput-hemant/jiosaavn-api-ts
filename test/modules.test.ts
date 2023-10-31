import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Modules", () => {
  test("GET /modules", async () => {
    const response = await app.request("/modules");

    expect(response.status).toBe(200);

    const modules: any = await response.json();

    expect(modules.status).toBe("Success");
    expect(modules.data).toHaveProperty("albums");
    expect(modules.data).toHaveProperty("artist_recos");
  });

  test("GET /modules?camel=1 (Camel Case)", async () => {
    const response = await app.request("/modules?camel=1");

    expect(response.status).toBe(200);

    const modules: any = await response.json();

    expect(modules.status).toBe("Success");
    expect(modules.data).toHaveProperty("albums");
    expect(modules.data).toHaveProperty("artistRecos");
  });
});
