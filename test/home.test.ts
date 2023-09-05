import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Home", () => {
  test("GET /", async () => {
    const response = await app.request("/");

    expect(response.status).toBe(200);

    const text = await response.text();

    expect(text).toContain("JioSaavn API");
  });
});
