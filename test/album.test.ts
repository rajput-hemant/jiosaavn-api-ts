import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Album", () => {
  test("GET /album | Albums Details (Error)", async () => {
    const response = await app.request("/album");

    expect(response.status).toBe(400);

    const albums: any = await response.json();

    expect(albums.status).toBe("Failed");
    expect(albums.data).toBeNull();
  });

  test("GET /album?id=1142502 | Album Details by ID", async () => {
    const response = await app.request("/album?id=1142502");

    expect(response.status).toBe(200);

    const albums: any = await response.json();

    expect(albums.status).toBe("Success");
    expect(albums.data).toHaveProperty("play_count");
    expect(albums.data.songs).toBeArray();
    expect(albums.data.songs[0]).toHaveProperty("play_count");
  });

  test("GET /album?id=1142502&camel=1 | Album Details by ID (Camel Case)", async () => {
    const response = await app.request("/album?id=1142502&camel=1");

    expect(response.status).toBe(200);

    const albums: any = await response.json();

    expect(albums.status).toBe("Success");
    expect(albums.data).toHaveProperty("playCount");
    expect(albums.data.songs).toBeArray();
    expect(albums.data.songs[0]).toHaveProperty("playCount");
  });

  test("GET /album?id=1142___ | Album Details by ID (Invalid ID)", async () => {
    const response = await app.request("/album?id=1142___");

    expect(response.status).toBe(400);

    const albums: any = await response.json();

    expect(albums.status).toBe("Failed");
    expect(albums.data).toBeNull();
  });

  test("GET /album?link=https://www.jiosaavn.com/album/night-visions/xe6Gx7Sg12U | Album Details by Link", async () => {
    const response = await app.request(
      "/album?link=https://www.jiosaavn.com/album/night-visions/xe6Gx7Sg12U"
    );

    expect(response.status).toBe(200);

    const albums: any = await response.json();

    expect(albums.status).toBe("Success");
    expect(albums.data).toHaveProperty("play_count");
    expect(albums.data.songs).toBeArray();
    expect(albums.data.songs[0]).toHaveProperty("play_count");
  });

  test("GET /album/recommend?id=1142___ | Recommend Albums (Invalid ID)", async () => {
    const response = await app.request("/song/recommend?id=1142___");

    expect(response.status).toBe(400);

    const recos: any = await response.json();

    expect(recos.status).toBe("Failed");
    expect(recos.data).toBeNull();
  });

  test("GET /album/recommend?id=1142502 | Recommend Albums", async () => {
    const response = await app.request("/album/recommend?id=1142502");

    expect(response.status).toBe(200);

    const recos: any = await response.json();

    expect(recos.status).toBe("Success");
    expect(recos.data).toBeArray();
    expect(recos.data[0]).toHaveProperty("id");
  });

  test("GET /album/same-year?year= | Albums from Same Year (Invalid Year)", async () => {
    const response = await app.request("/album/same-year?year=");

    expect(response.status).toBe(400);

    const recos: any = await response.json();

    expect(recos.status).toBe("Failed");
    expect(recos.data).toBeNull();
  });

  test("GET /album/same-year?year=2023&lang=hindi | Albums from Same Year ", async () => {
    const response = await app.request("/album/same-year?year=2023&lang=hindi");

    expect(response.status).toBe(200);

    const recos: any = await response.json();

    expect(recos.status).toBe("Success");
    expect(recos.data).toBeArray();
    expect(recos.data[0]).toHaveProperty("id");
  });
});
