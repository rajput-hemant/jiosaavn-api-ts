import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Get Route", () => {
  test("Get /get/trending | Currently Trending", async () => {
    const response = await app.request("/get/trending");

    expect(response.status).toBe(200);

    const trending: any = await response.json();

    expect(trending.status).toBe("Success");
    expect(trending.data).toBeArray();
  });

  test("Get /get/featured-playlists | Featured Playlist", async () => {
    const response = await app.request("/get/featured-playlists");

    expect(response.status).toBe(200);

    const featured: any = await response.json();

    expect(featured.status).toBe("Success");
    expect(featured.data).toHaveProperty("last_page");
    expect(featured.data.data).toBeArray();
  });

  test("Get /get/featured-playlists?camel=1 | Featured Playlist (Camel Case)", async () => {
    const response = await app.request("/get/featured-playlists?camel=1");

    expect(response.status).toBe(200);

    const featured: any = await response.json();

    expect(featured.status).toBe("Success");
    expect(featured.data).toHaveProperty("lastPage");
    expect(featured.data.data).toBeArray();
  });

  test("Get /get`/charts | Charts", async () => {
    const response = await app.request("/get/charts");

    expect(response.status).toBe(200);

    const charts: any = await response.json();

    expect(charts.status).toBe("Success");
    expect(charts.data).toBeArray();
  });

  test("Get /get/top-shows | Top Shows", async () => {
    const response = await app.request("/get/top-shows");

    expect(response.status).toBe(200);

    const shows: any = await response.json();

    expect(shows.status).toBe("Success");
    expect(shows.data).toHaveProperty("data");
    expect(shows.data.data).toBeArray();
    expect(shows.data).toHaveProperty("trending_podcasts");
    expect(shows.data.trending_podcasts).toHaveProperty("data");
    expect(shows.data.trending_podcasts.data).toBeArray();
  });

  test("Get /get/top-shows?camel=1 | Top Shows (Camel Case)", async () => {
    const response = await app.request("/get/top-shows?camel=1");

    expect(response.status).toBe(200);

    const shows: any = await response.json();

    expect(shows.status).toBe("Success");
    expect(shows.data).toHaveProperty("data");
    expect(shows.data.data).toBeArray();
    expect(shows.data).toHaveProperty("trendingPodcasts");
    expect(shows.data.trendingPodcasts).toHaveProperty("data");
    expect(shows.data.trendingPodcasts.data).toBeArray();
  });

  test("Get /get/top-artists | Top Artists", async () => {
    const response = await app.request("/get/top-artists");

    expect(response.status).toBe(200);

    const artists: any = await response.json();

    expect(artists.status).toBe("Success");
    expect(artists.data).toBeArray();
  });

  test("Get /get/top-albums | Top Albums", async () => {
    const response = await app.request("/get/top-albums");

    expect(response.status).toBe(200);

    const albums: any = await response.json();

    expect(albums.status).toBe("Success");
    expect(albums.data).toHaveProperty("last_page");
    expect(albums.data.data).toBeArray();
  });

  test("Get /get/top-albums?camel=1 | Top Albums (Camel Case)", async () => {
    const response = await app.request("/get/top-albums?camel=1");

    expect(response.status).toBe(200);

    const albums: any = await response.json();

    expect(albums.status).toBe("Success");
    expect(albums.data).toHaveProperty("lastPage");
    expect(albums.data.data).toBeArray();
  });

  test("Get /get/featured-stations | Featured Radio stations", async () => {
    const response = await app.request("/get/featured-stations");

    expect(response.status).toBe(200);

    const stations: any = await response.json();

    expect(stations.status).toBe("Success");
    expect(stations.data).toBeArray();
  });

  test("Get /get/actor-top-songs?actor_id=461361,476035&song_id=7SobLOvo | Actors Top Songs", async () => {
    const response = await app.request(
      "/get/actor-top-songs?actor_id=461361,476035&song_id=7SobLOvo"
    );

    expect(response.status).toBe(200);

    const songs: any = await response.json();

    expect(songs.status).toBe("Success");
    expect(songs.data).toBeArray();
  });

  test("Get /get/actor-top-songs | Actors Top Songs (Error)", async () => {
    const response = await app.request("/get/actor-top-songs");

    expect(response.status).toBe(400);

    const songs: any = await response.json();

    expect(songs.status).toBe("Failed");
    expect(songs.data).toBeNull();
  });

  test("Get /get/actor-top-songs?actor_id=461___&song_id=7SobLOvo  | Actors Top Songs (Invalid ID)", async () => {
    const response = await app.request(
      "/get/actor-top-songs?actor_id=461___&song_id=7SobLOvo"
    );

    expect(response.status).toBe(400);

    const songs: any = await response.json();

    expect(songs.status).toBe("Failed");
    expect(songs.data).toBeNull();
  });

  test("Get /get/footer-details | Footer Details (Error)", async () => {
    const response = await app.request("/get/footer-details");

    expect(response.status).toBe(400);

    const footer: any = await response.json();

    expect(footer.status).toBe("Failed");
    expect(footer.data).toBeNull();
  });

  test("Get /get/footer-details?lang=hindi | Footer Details", async () => {
    const response = await app.request("/get/footer-details?lang=hindi");

    expect(response.status).toBe(200);

    const footer: any = await response.json();

    expect(footer.status).toBe("Success");
    expect(footer.data).toHaveProperty("playlist");
    expect(footer.data).toHaveProperty("artist");
    expect(footer.data).toHaveProperty("album");
    expect(footer.data).toHaveProperty("actor");
    expect(footer.data.playlist).toBeArray();
    expect(footer.data.artist).toBeArray();
    expect(footer.data.album).toBeArray();
    expect(footer.data.actor).toBeArray();
  });

  test("Get /get/lyrics | Song's Lyrics (Error)", async () => {
    const response = await app.request("/get/lyrics");

    expect(response.status).toBe(400);

    const lyrics: any = await response.json();

    expect(lyrics.status).toBe("Failed");
    expect(lyrics.data).toBeNull();
  });

  test("Get /get/lyrics?id=IhKbmgyP | Song's Lyrics", async () => {
    const response = await app.request("/get/lyrics?id=IhKbmgyP");

    expect(response.status).toBe(200);

    const lyrics: any = await response.json();

    expect(lyrics.status).toBe("Success");
    expect(lyrics.data).toHaveProperty("lyrics");
    expect(lyrics.data).toHaveProperty("snippet");
    expect(lyrics.data.snippet).toBe("Sunaayi deti hai jiski dhadkan");
  });
});
