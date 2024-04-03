import { describe, expect, test } from "bun:test";

import { app } from "../src";

describe("Radio", () => {
  test("GET /radio/featured?name=90s Nostalgia | Create Featured Radio Station", async () => {
    const response = await app.request("/radio/featured?name=90s Nostalgia");

    expect(response.status).toBe(200);

    const station: any = await response.json();

    expect(station.status).toBe("Success");
    expect(station.data).toHaveProperty("station_id");
  });

  test("GET /radio/featured | Create Featured Radio Station (Error)", async () => {
    const response = await app.request("/radio/featured");

    expect(response.status).toBe(400);

    const station: any = await response.json();

    expect(station.status).toBe("Failed");
  });

  test("GET /radio/artist?name=Arijit Singh | Create Artist Radio Station", async () => {
    const response = await app.request("/radio/artist?name=Arijit Singh");

    expect(response.status).toBe(200);

    const station: any = await response.json();

    expect(station.status).toBe("Success");
    expect(station.data).toHaveProperty("station_id");
  });

  test("GET /radio/artist | Create Artist Radio Station (Error)", async () => {
    const response = await app.request("/radio/artist");

    expect(response.status).toBe(400);

    const station: any = await response.json();

    expect(station.status).toBe("Failed");
  });

  test("GET /radio/entity?id=5WXAlMNt&type=queue | Create Entity Radio Station", async () => {
    const response = await app.request("/radio/entity?id=5WXAlMNt&type=queue");

    expect(response.status).toBe(200);

    const station: any = await response.json();

    expect(station.status).toBe("Success");
    // expect(station.data).toHaveProperty("station_id");
  });

  test("GET /radio/entity | Create Entity Radio Station (Error)", async () => {
    const response = await app.request("/radio/entity");

    expect(response.status).toBe(400);

    const station: any = await response.json();

    expect(station.status).toBe("Failed");
  });

  test.todo(
    "GET /radio/songs?id=${station_id} | Create Songs Radio Station",
    async () => {
      let response = await app.request("/get/featured-stations");
      const featuredStations: any = await response.json();

      response = await app.request(
        `/radio/featured?name=${featuredStations.data[0].name}`
      );
      const stationID = ((await response.json()) as any).data.station_id;

      response = await app.request(
        `/radio/songs?id=${stationID.data.station_id}`
      );

      expect(response.status).toBe(200);

      const station: any = await response.json();

      expect(station.status).toBe("Success");
      expect(station.data).toHaveProperty("station_id");
    }
  );
});
