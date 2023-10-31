import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Search", () => {
  test("GET /search?q=ram siya ram | Search All", async () => {
    const response = await app.request("/search?q=ram siya ram");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("songs");
    expect(results.data).toHaveProperty("albums");
    expect(results.data).toHaveProperty("playlists");
    expect(results.data).toHaveProperty("artists");
    expect(results.data).toHaveProperty("top_query");
    expect(results.data).toHaveProperty("shows");
    expect(results.data.songs.data).toBeArray();
    expect(results.data.albums.data).toBeArray();
    expect(results.data.playlists.data).toBeArray();
    expect(results.data.artists.data).toBeArray();
    expect(results.data.top_query.data).toBeArray();
    expect(results.data.shows.data).toBeArray();
  });

  test("GET /search?q=ram siya ram&camel=1 | Search All (Camel Case)", async () => {
    const response = await app.request("/search?q=ram siya ram&camel=1");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("songs");
    expect(results.data).toHaveProperty("albums");
    expect(results.data).toHaveProperty("playlists");
    expect(results.data).toHaveProperty("artists");
    expect(results.data).toHaveProperty("topQuery");
    expect(results.data).toHaveProperty("shows");
    expect(results.data.songs.data).toBeArray();
    expect(results.data.albums.data).toBeArray();
    expect(results.data.playlists.data).toBeArray();
    expect(results.data.artists.data).toBeArray();
    expect(results.data.topQuery.data).toBeArray();
    expect(results.data.shows.data).toBeArray();
  });

  test("GET /search | Search All (Error)", async () => {
    const response = await app.request("/search");

    expect(response.status).toBe(400);

    const results: any = await response.json();

    expect(results.status).toBe("Failed");
    expect(results.data).toBeNull();
  });

  test("GET /search/top | Top Searches", async () => {
    const response = await app.request("/search/top");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toBeArray();
  });

  test("GET /search/songs?q=ram siya ram | Search Songs", async () => {
    const response = await app.request("/search/songs?q=ram siya ram");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("total");
    expect(results.data).toHaveProperty("start");
    expect(results.data).toHaveProperty("results");
    expect(results.data.results).toBeArray();
  });

  test("GET /search/songs?q= | Search Songs (Error)", async () => {
    const response = await app.request("/search/songs?q=");

    expect(response.status).toBe(400);

    const results: any = await response.json();

    expect(results.status).toBe("Failed");
    expect(results.data).toBeNull();
  });

  test("GET /search/albums?q=ram siya ram | Search Albums", async () => {
    const response = await app.request("/search/albums?q=ram siya ram");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("total");
    expect(results.data).toHaveProperty("start");
    expect(results.data).toHaveProperty("results");
    expect(results.data.results).toBeArray();
  });

  test("GET /search/albums?q= | Search Albums (Error)", async () => {
    const response = await app.request("/search/albums?q=");

    expect(response.status).toBe(400);

    const results: any = await response.json();

    expect(results.status).toBe("Failed");
    expect(results.data).toBeNull();
  });

  test("GET /search/playlists?q=ram siya ram | Search Playlists", async () => {
    const response = await app.request("/search/playlists?q=ram siya ram");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("total");
    expect(results.data).toHaveProperty("start");
    expect(results.data).toHaveProperty("results");
    expect(results.data.results).toBeArray();
  });

  test("GET /search/playlists?q= | Search Playlists", async () => {
    const response = await app.request("/search/playlists?q=");

    expect(response.status).toBe(400);

    const results: any = await response.json();

    expect(results.status).toBe("Failed");
    expect(results.data).toBeNull();
  });

  test("GET /search/artists?q=arijit singh | Search Artists", async () => {
    const response = await app.request("/search/artists?q=arijit singh");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("total");
    expect(results.data).toHaveProperty("start");
    expect(results.data).toHaveProperty("results");
    expect(results.data.results).toBeArray();
  });

  test("GET /search/artists?q= | Search Artists (Error)", async () => {
    const response = await app.request("/search/artists?q=");

    expect(response.status).toBe(400);

    const results: any = await response.json();

    expect(results.status).toBe("Failed");
    expect(results.data).toBeNull();
  });

  test("GET /search/podcasts?q=ram siya ram | Search Shows/Podcasts", async () => {
    const response = await app.request("/search/podcasts?q=ram siya ram");

    expect(response.status).toBe(200);

    const results: any = await response.json();

    expect(results.status).toBe("Success");
    expect(results.data).toHaveProperty("total");
    expect(results.data).toHaveProperty("start");
    expect(results.data).toHaveProperty("results");
    expect(results.data.results).toBeArray();
  });

  test("GET /search/podcasts?q= | Search Shows/Podcasts (Error)", async () => {
    const response = await app.request("/search/podcasts?q=");

    expect(response.status).toBe(400);

    const results: any = await response.json();

    expect(results.status).toBe("Failed");
    expect(results.data).toBeNull();
  });
});
