import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { isJioSaavnLink, tokenFromLink } from "../lib/utils";
import { albumPayload } from "../payloads/album";
import { AlbumRequest, AlbumResponse } from "../types/album";
import { CustomResponse } from "../types/response";

export const album = new Hono();

// middleware to check if query params are provided and are valid
album.use("*", async (c, next) => {
  const { id, link } = c.req.query();

  if (!id && !link) {
    throw new Error("Please provide a album id or link");
  } else if (id && link) {
    throw new Error("Please provide either a album id or link");
  } else if (link && !isJioSaavnLink(link)) {
    throw new Error("Please provide a valid JioSaavn link");
  }

  await next();
});

album.get("/", async (c) => {
  const { id, link } = c.req.query();

  let result: AlbumRequest;

  if (id) {
    result = await api(config.endpoint.album.id, {
      query: { albumid: id },
    });
  } else {
    result = await api(config.endpoint.album.link, {
      query: {
        token: tokenFromLink("album", link),
        type: "album",
      },
    });
  }

  if (!result.id) {
    throw new Error("No album found, please check the id or link");
  }

  const response: CustomResponse<AlbumResponse> = {
    status: "Success",
    message: "✅ Album(s) Details fetched successfully",
    data: albumPayload(result),
  };

  return c.json(response);
});

album.get("/recommendations", async (c) => {
  const { id } = c.req.query();

  const result = await api<AlbumRequest[]>(config.endpoint.album.recommended, {
    query: { albumid: id },
  });

  if (!result.length) {
    throw new Error("No recommendations found, please check the id");
  }

  const response: CustomResponse<AlbumResponse[]> = {
    status: "Success",
    message: "✅ Album Recommendations fetched successfully",
    data: result.map(albumPayload),
  };

  return c.json(response);
});
