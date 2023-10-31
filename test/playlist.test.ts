import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Playlist", () => {
  test("GET /playlist | Playlists Details (Error)", async () => {
    const response = await app.request("/playlist");

    expect(response.status).toBe(400);

    const playlists: any = await response.json();

    expect(playlists.status).toBe("Failed");
    expect(playlists.data).toBeNull();
  });

  test("GET /playlist?id=159144718 | Playlist Details by ID", async () => {
    const response = await app.request("/playlist?id=159144718");

    expect(response.status).toBe(200);

    const playlists: any = await response.json();

    expect(playlists.status).toBe("Success");
    expect(playlists.data).toHaveProperty("fan_count");
    expect(playlists.data.songs).toBeArray();
    // expect(playlists.data.songs[0]).toHaveProperty("play_count");
  });

  test("GET /playlist?id=159144718&camel=1 | Playlist Details by ID (Camel Case)", async () => {
    const response = await app.request("/playlist?id=159144718&camel=1");

    expect(response.status).toBe(200);

    const playlists: any = await response.json();

    expect(playlists.status).toBe("Success");
    expect(playlists.data).toHaveProperty("fanCount");
    expect(playlists.data.songs).toBeArray();
    // expect(playlists.data.songs[0]).toHaveProperty("playCount");
  });

  test("GET /playlist?id=1591____ | Playlist Details by ID (Invalid ID)", async () => {
    const response = await app.request("/playlist?id=1591____");

    expect(response.status).toBe(400);

    const playlists: any = await response.json();

    expect(playlists.status).toBe("Failed");
    expect(playlists.data).toBeNull();
  });

  test("GET /playlist?link=https://www.jiosaavn.com/featured/hindi-india-superhits-top-50/zlJfJYVuyjpxWb5,FqsjKg__ | Playlist Details by Link", async () => {
    const response = await app.request(
      "/playlist?link=https://www.jiosaavn.com/featured/hindi-india-superhits-top-50/zlJfJYVuyjpxWb5,FqsjKg__"
    );

    expect(response.status).toBe(200);

    const playlists: any = await response.json();

    expect(playlists.status).toBe("Success");
    expect(playlists.data).toHaveProperty("fan_count");
    expect(playlists.data.songs).toBeArray();
    expect(playlists.data.songs[0]).toHaveProperty("play_count");
  });

  test("GET /playlist/recommend?id=159144718 | Recommend Playlists", async () => {
    const response = await app.request("/playlist/recommend?id=159144718");

    expect(response.status).toBe(200);

    const recos: any = await response.json();

    expect(recos.status).toBe("Success");
    expect(recos.data).toBeArray();
    expect(recos.data[0]).toHaveProperty("id");
  });

  test("GET /playlist/recommend?id=15914____ | Recommend Playlists (Invalid ID)", async () => {
    const response = await app.request("/playlist/recommend?id=15914____");

    expect(response.status).toBe(400);

    const playlists: any = await response.json();

    expect(playlists.status).toBe("Failed");
    expect(playlists.data).toBeNull();
  });
});
