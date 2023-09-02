import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { isJioSaavnLink, tokenFromLink } from "../lib/utils";
import { songPayload } from "../payloads/song";
import { CustomResponse } from "../types/response";
import { SongRequest, SongResponse } from "../types/song";

export const song = new Hono();

// middleware to check if query params are provided and are valid
song.use("*", async (c, next) => {
  const { id, link } = c.req.query();

  if (!id && !link) {
    throw new Error("Please provide a song id or link");
  }

  if (id && link) {
    throw new Error("Please provide either a song id or link");
  }

  if (link && !isJioSaavnLink(link)) {
    throw new Error("Please provide a valid JioSaavn link");
  }

  await next();
});

song.get("/", async (c) => {
  const { id, link } = c.req.query();

  let result: { songs: SongRequest[] };

  if (id) {
    result = await api(config.endpoint.song.id, {
      query: { pids: id },
    });
  } else {
    result = await api(config.endpoint.song.link, {
      query: {
        token: tokenFromLink("song", link),
        type: "song",
      },
    });
  }

  const response: CustomResponse<SongResponse[]> = {
    status: "Success",
    message: "✅ Song(s) Details fetched successfully",
    data: result.songs.map(songPayload),
  };

  return c.json(response);
});

song.get("/recommendations", async (c) => {
  const { id } = c.req.query();

  const result = await api<SongRequest[]>("reco.getreco", {
    query: { pid: id },
  });

  const response: CustomResponse<SongResponse[]> = {
    status: "Success",
    message: "✅ Song Recommendations fetched successfully",
    data: result.map(songPayload),
  };

  return c.json(response);
});

song.onError((err, c) => {
  const response: CustomResponse<null> = {
    status: "Failed",
    message: `❌ ${err.message}`,
    data: null,
  };

  return c.json(response);
});
