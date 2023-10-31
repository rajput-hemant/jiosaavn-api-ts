import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Song", () => {
  test("GET /song | Songs Details (Error)", async () => {
    const response = await app.request("/song");

    expect(response.status).toBe(400);

    const songs: any = await response.json();

    expect(songs.status).toBe("Failed");
    expect(songs.data).toBeNull();
  });

  test("GET /song?id=5WXAlMNt,9BjJPi0Y | Song Details by ID", async () => {
    const response = await app.request("/song?id=5WXAlMNt,9BjJPi0Y");

    expect(response.status).toBe(200);

    const songs: any = await response.json();

    expect(songs.status).toBe("Success");
    expect(songs.data).toHaveProperty("songs");
    expect(songs.data.songs).toBeArray();
    expect(songs.data.songs[0]).toHaveProperty("play_count");
  });

  test("GET /song?id=5WXAlMNt&camel=1 | Song Details by ID (Camel Case)", async () => {
    const response = await app.request("/song?id=5WXAlMNt&camel=1");

    expect(response.status).toBe(200);

    const songs: any = await response.json();

    expect(songs.status).toBe("Success");
    expect(songs.data).toHaveProperty("songs");
    expect(songs.data.songs).toBeArray();
    expect(songs.data.songs[0]).toHaveProperty("playCount");
  });

  test("GET /song?id=5WXA___ | Song Details by ID (Invalid ID)", async () => {
    const response = await app.request("/song?id=5WXA___");

    expect(response.status).toBe(400);

    const songs: any = await response.json();

    expect(songs.status).toBe("Failed");
    expect(songs.data).toBeNull();
  });

  test("GET /song?link=https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc | Song Details by Link", async () => {
    const response = await app.request(
      "/song?link=https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc"
    );

    expect(response.status).toBe(200);

    const songs: any = await response.json();

    expect(songs.status).toBe("Success");
    expect(songs.data).toHaveProperty("songs");
    expect(songs.data.songs).toBeArray();
    expect(songs.data.songs[0]).toHaveProperty("play_count");
  });

  test("GET /song/recommend?id=5WXA___ | Recommend Songs (Invalid ID)", async () => {
    const response = await app.request("/song/recommend?id=5WXA___");

    expect(response.status).toBe(400);

    const recos: any = await response.json();

    expect(recos.status).toBe("Failed");
    expect(recos.data).toBeNull();
  });

  test("GET /song/recommend?id=5WXAlMNt | Recommend Songs", async () => {
    const response = await app.request("/song/recommend?id=5WXAlMNt");

    expect(response.status).toBe(200);

    const recos: any = await response.json();

    expect(recos.status).toBe("Success");
    expect(recos.data).toBeArray();
    // expect(recos.data[0]).toHaveProperty("id");
  });
});
