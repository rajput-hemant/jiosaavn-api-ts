import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, toCamelCase } from "../lib/utils";
import { radioSongsPayload } from "../payloads/radio.payload";
import {
  RadioSongRequest,
  RadioSongResponse,
  RadioStationRequest,
  RadioStationResponse,
} from "../types/radio";
import { CustomResponse } from "../types/response";

export const radio = new Hono();

const { featured: f, artist: a, entity: e, songs: s } = config.endpoint.radio;

radio.get("/featured", async (c) => {
  const {
    song_id: pid = "",
    artist_id: artistid = "",
    name = "",
    q: query = "",
    mode = "",
    lang: language = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: RadioStationRequest = await api(f, {
    query: { pid, artistid, name, query, mode, language },
  });

  if (result.error) {
    throw new Error(result.error);
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<RadioStationResponse> = {
    status: "Success",
    message: "✅ Featured Radio Station Created Successfully!",
    data: { station_id: result.stationid },
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

radio.get("/artist", async (c) => {
  const {
    song_id: pid = "",
    artist_id: artistid = "",
    name = "",
    mode = "",
    lang: language = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: RadioStationRequest = await api(a, {
    query: { pid, artistid, name, query: name, mode, language },
  });

  if (result.error) {
    throw new Error(result.error);
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<RadioStationResponse> = {
    status: "Success",
    message: "✅ Artist Radio Station Created Successfully!",
    data: { station_id: result.stationid },
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

radio.get("/entity", async (c) => {
  const {
    id: entity_id = "",
    type: entity_type = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: RadioStationRequest = await api(e, {
    query: { entity_id, entity_type },
  });

  if (result.error) {
    throw new Error(result.error);
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<RadioStationResponse> = {
    status: "Success",
    message: "✅ Entity Radio Station Created Successfully!",
    data: { station_id: result.stationid },
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});

radio.get("/songs", async (c) => {
  const {
    id: stationid = "",
    n: k = "10",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: RadioSongRequest = await api(s, {
    query: { stationid, k },
  });

  if (result.error) {
    throw new Error(result.error);
  }

  if (parseBool(raw)) {
    return c.json(result);
  }

  const payload: CustomResponse<RadioSongResponse> = {
    status: "Success",
    message: "✅ Radio Station Songs Fetched Successfully!",
    data: radioSongsPayload(result),
  };

  return c.json(parseBool(camel) ? toCamelCase(payload) : payload);
});
