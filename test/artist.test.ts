import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Artist", () => {
  test("GET /artist | Artists Details (Error)", async () => {
    const response = await app.request("/artist");

    expect(response.status).toBe(400);

    const artists: any = await response.json();

    expect(artists.status).toBe("Failed");
    expect(artists.data).toBeNull();
  });

  test("GET /artist?id=459320 | Artist Details by ID", async () => {
    const response = await app.request("/artist?id=459320");

    expect(response.status).toBe(200);

    const artists: any = await response.json();

    expect(artists.status).toBe("Success");
    expect(artists.data).toHaveProperty("follower_count");
  });

  test("GET /artist?id=459___ | Artist Details by ID (Invalid ID)", async () => {
    const response = await app.request("/artist?id=459___");

    expect(response.status).toBe(400);

    const artists: any = await response.json();

    expect(artists.status).toBe("Failed");
    expect(artists.data).toBeNull();
  });

  test("GET /artist?id=459320&camel=1 | Artist Details by ID (Camel Case)", async () => {
    const response = await app.request("/artist?id=459320&camel=1");

    expect(response.status).toBe(200);

    const artists: any = await response.json();

    expect(artists.status).toBe("Success");
    expect(artists.data).toHaveProperty("followerCount");
  });

  test("GET /artist?link=https://www.jiosaavn.com/artist/arijit-singh/LlRWpHzy3Hk_ | Artist Details by Link", async () => {
    const response = await app.request(
      "/artist?link=https://www.jiosaavn.com/artist/arijit-singh/LlRWpHzy3Hk_"
    );

    expect(response.status).toBe(200);

    const artists: any = await response.json();

    expect(artists.status).toBe("Success");
    expect(artists.data).toHaveProperty("follower_count");
  });

  test("GET /artist/songs?id=459320 | Artists Top Songs by Artist ID", async () => {
    const response = await app.request("/artist/songs?id=459320");

    expect(response.status).toBe(200);

    const recos: any = await response.json();

    expect(recos.status).toBe("Success");
    expect(recos.data).toHaveProperty("top_songs");
    expect(recos.data.top_songs.songs).toBeArray();
    expect(recos.data.top_songs.songs[0]).toHaveProperty("play_count");
  });

  test("GET /artist/songs?id=459___ | Artists Top Songs by Artist ID (Invalid ID)", async () => {
    const response = await app.request("/artist/songs?id=459___");

    expect(response.status).toBe(400);

    const artists: any = await response.json();

    expect(artists.status).toBe("Failed");
    expect(artists.data).toBeNull();
  });

  test("GET /artist/albums?id=459320 | Artists Top Albums by Artist ID", async () => {
    const response = await app.request("/artist/albums?id=459320");

    expect(response.status).toBe(200);

    const recos: any = await response.json();
    +expect(recos.status).toBe("Success");
    expect(recos.data).toHaveProperty("top_albums");
    expect(recos.data.top_albums.albums).toBeArray();
    expect(recos.data.top_albums.albums[0]).toHaveProperty("play_count");
  });

  test("GET /artist/albums?id=459___ | | Artists Top Albums by Artist ID (Invalid ID)", async () => {
    const response = await app.request("/artist?id=459___");

    expect(response.status).toBe(400);

    const artists: any = await response.json();

    expect(artists.status).toBe("Failed");
    expect(artists.data).toBeNull();
  });

  test("GET /artist/top-songs?artist_id=459___&song_id=_rJmbKSP | Artist's Top Songs", async () => {
    const response = await app.request(
      "/artist/top-songs?artist_id=459___&song_id=_rJmbKSP"
    );

    expect(response.status).toBe(400);

    const artists: any = await response.json();

    expect(artists.status).toBe("Failed");
    expect(artists.data).toBeNull();
  });

  test("GET /artist/top-songs?artist_id=459___&song_id=_rJmbKSP | Artist's Top Songs (Invalid IDs)", async () => {
    const response = await app.request(
      "/artist/top-songs?artist_id=459___&song_id=_rJmbKSP"
    );

    expect(response.status).toBe(400);

    const artists: any = await response.json();

    expect(artists.status).toBe("Failed");
    expect(artists.data).toBeNull();
  });
});
