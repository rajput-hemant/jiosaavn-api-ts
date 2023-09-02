import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { playlistPayload } from "../payloads/playlist";
import { PlaylistRequest, PlaylistResponse } from "../types/playlist";
import { CustomResponse } from "../types/response";

export const playlist = new Hono();

playlist.get("/", async (c) => {
  const { id } = c.req.query();

  if (!id) {
    throw new Error("Please provide playlist id");
  }

  const result = await api<PlaylistRequest>(config.endpoint.playlist.id, {
    query: { listid: id },
  });

  if (!result.id) {
    throw new Error("Playlist not found, please check the id or link");
  }

  const response: CustomResponse<PlaylistResponse> = {
    status: "Success",
    message: "✅ Playlist Details fetched successfully",
    data: playlistPayload(result),
  };

  return c.json(response);
});
