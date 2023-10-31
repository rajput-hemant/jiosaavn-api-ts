import { expect, test, describe } from "bun:test";

import { app } from "../src";

describe("Show", () => {
  test("GET /show | Shows Details (Error)", async () => {
    const response = await app.request("/show");

    expect(response.status).toBe(400);

    const shows: any = await response.json();

    expect(shows.status).toBe("Failed");
    expect(shows.data).toBeNull();
  });

  test("GET /show?token=YZxHhNAGfv0_ | Show Details by Token", async () => {
    const response = await app.request("/show?token=YZxHhNAGfv0_");

    expect(response.status).toBe(200);

    const shows: any = await response.json();

    expect(shows.status).toBe("Success");
    expect(shows.data).toHaveProperty("show_details");
    expect(shows.data.show_details).toHaveProperty("id");

    expect(shows.data).toHaveProperty("seasons");
    expect(shows.data.seasons).toBeArray();
    expect(shows.data.seasons[0]).toHaveProperty("id");

    expect(shows.data).toHaveProperty("episodes");
    expect(shows.data.episodes).toBeArray();
    expect(shows.data.episodes[0]).toHaveProperty("id");
  });

  test("GET /show?link=https://www.jiosaavn.com/shows/dhadkane-meri-sun/1/YZxHhNAGfv0_ | Show Details by Link", async () => {
    const response = await app.request(
      "/show?link=https://www.jiosaavn.com/shows/dhadkane-meri-sun/1/YZxHhNAGfv0_"
    );

    expect(response.status).toBe(200);

    const shows: any = await response.json();

    expect(shows.status).toBe("Success");
    expect(shows.data).toHaveProperty("show_details");
    expect(shows.data.show_details).toHaveProperty("id");

    expect(shows.data).toHaveProperty("seasons");
    expect(shows.data.seasons).toBeArray();
    expect(shows.data.seasons[0]).toHaveProperty("id");

    expect(shows.data).toHaveProperty("episodes");
    expect(shows.data.episodes).toBeArray();
    expect(shows.data.episodes[0]).toHaveProperty("id");
  });

  test("GET /show?token=YZxHhNAGfv0_&camel=1 | Show Details by Token (Camel Case)", async () => {
    const response = await app.request("/show?token=YZxHhNAGfv0_&camel=1");

    expect(response.status).toBe(200);

    const shows: any = await response.json();

    expect(shows.status).toBe("Success");
    expect(shows.data).toHaveProperty("showDetails");
    expect(shows.data.showDetails).toHaveProperty("id");

    expect(shows.data).toHaveProperty("seasons");
    expect(shows.data.seasons).toBeArray();
    expect(shows.data.seasons[0]).toHaveProperty("id");

    expect(shows.data).toHaveProperty("episodes");
    expect(shows.data.episodes).toBeArray();
    expect(shows.data.episodes[0]).toHaveProperty("id");
  });

  test("GET /show/episodes | Show's All Episodes (Error)", async () => {
    const response = await app.request("/show/episodes");

    expect(response.status).toBe(400);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Failed");
    expect(episodes.data).toBeNull();
  });

  test("GET /show/episodes?id=71214 | Show's All Episodes", async () => {
    const response = await app.request("/show/episodes?id=71214");

    expect(response.status).toBe(200);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Success");
    expect(episodes.data).toBeArray();
    expect(episodes.data[0]).toHaveProperty("id");
    expect(episodes.data[0]).toHaveProperty("play_count");
  });

  test("GET /show/episodes?id=71214&camel=1 | Show's All Episodes (Camel Case)", async () => {
    const response = await app.request("/show/episodes?id=71214&camel=1");

    expect(response.status).toBe(200);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Success");
    expect(episodes.data).toBeArray();
    expect(episodes.data[0]).toHaveProperty("id");
    expect(episodes.data[0]).toHaveProperty("playCount");
  });

  test("GET /show/episode | Show's Episode Details (Error)", async () => {
    const response = await app.request("/show/episode");

    expect(response.status).toBe(400);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Failed");
    expect(episodes.data).toBeNull();
  });

  test("GET /show/episode?token=8BlwZT--v8s_ | Show's Episode Details by Token", async () => {
    const response = await app.request("/show/episode?token=8BlwZT--v8s_");

    expect(response.status).toBe(200);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Success");
    expect(episodes.data).toHaveProperty("episodes");
    expect(episodes.data.episodes).toBeArray();
    expect(episodes.data.episodes[0]).toHaveProperty("id");
    expect(episodes.data.episodes[0]).toHaveProperty("play_count");
  });

  test("GET /show/episode?link=https://www.jiosaavn.com/shows/silsile...teri-mohabbat-ke...na-rukenge-kabhi/8BlwZT--v8s_ | Show's Episode Details by Link", async () => {
    const response = await app.request(
      "/show/episode?link=https://www.jiosaavn.com/shows/silsile...teri-mohabbat-ke...na-rukenge-kabhi/8BlwZT--v8s_"
    );

    expect(response.status).toBe(200);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Success");
    expect(episodes.data).toHaveProperty("episodes");
    expect(episodes.data.episodes).toBeArray();
    expect(episodes.data.episodes[0]).toHaveProperty("id");
    expect(episodes.data.episodes[0]).toHaveProperty("play_count");
  });

  test("GET /show/episode?token=8BlwZT--v8s_&camel=1 | Show's Episode Details by Token (Camel Case)", async () => {
    const response = await app.request(
      "/show/episode?token=8BlwZT--v8s_&camel=1"
    );

    expect(response.status).toBe(200);

    const episodes: any = await response.json();

    expect(episodes.status).toBe("Success");
    expect(episodes.data).toHaveProperty("episodes");
    expect(episodes.data.episodes).toBeArray();
    expect(episodes.data.episodes[0]).toHaveProperty("id");
    expect(episodes.data.episodes[0]).toHaveProperty("playCount");
  });
});
