import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { parseBool, toCamelCase, tokenFromLink } from "../lib/utils";
import {
  episodeDetailPayload,
  episodePayload,
  showsPayload,
} from "../payloads/show.payload";
import { CustomResponse } from "../types/response";
import {
  EpisodeDetailRequest,
  EpisodeDetailResponse,
  EpisodeRequest,
  EpisodeResponse,
  ShowRequest,
  ShowRespone,
} from "../types/show";

const {
  show_details: s,
  episodes: e,
  episode_details: e_d,
} = config.endpoint.show;

export const show = new Hono();

/* -------------------------------------------------------------------------------------------------
 * show's details
 * -----------------------------------------------------------------------------------------------*/
show.get("/", async (c) => {
  const {
    token = "",
    link = "",
    season: season_number = "1",
    sort: sort_order = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: ShowRequest = await api(s, {
    query: {
      token: token ? token : tokenFromLink(link),
      type: "show",
      season_number,
      sort_order,
    },
  });

  if (parseBool(raw)) return c.json(result);

  const payload = showsPayload(result);

  const response: CustomResponse<ShowRespone> = {
    status: "Success",
    message: "✅ Show details fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});

/* -------------------------------------------------------------------------------------------------
 * show's all episodes
 * -----------------------------------------------------------------------------------------------*/
show.get("/episodes", async (c) => {
  const {
    id: show_id = "",
    season: season_number = "",
    page: p = "",
    sort: sort_order = "",
    raw = "",
    camel = "",
  } = c.req.query();

  const result: EpisodeDetailRequest[] = await api(e, {
    query: { show_id, season_number, p, sort_order },
  });

  if (parseBool(raw)) return c.json(result);

  const payload = result.map(episodeDetailPayload);

  const response: CustomResponse<EpisodeDetailResponse[]> = {
    status: "Success",
    message: "✅ Episodes fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});

/* -----------------------------------------------------------------------------------------------
 * show's episode details
 * -----------------------------------------------------------------------------------------------*/

show.get("/episode", async (c) => {
  const { token = "", link = "", raw = "", camel = "" } = c.req.query();

  const result: EpisodeRequest = await api(e_d, {
    query: { token: token ? token : tokenFromLink(link), type: "episode" },
  });

  if (parseBool(raw)) return c.json(result);

  const payload = episodePayload(result);

  const response: CustomResponse<EpisodeResponse> = {
    status: "Success",
    message: "✅ Episode details fetched successfully",
    data: parseBool(camel) ? toCamelCase(payload) : payload,
  };

  return c.json(response);
});
