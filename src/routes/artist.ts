import { Hono } from "hono";

import { api } from "../lib/api";
import { config } from "../lib/config";
import { isJioSaavnLink, tokenFromLink } from "../lib/utils";
import {
  artistPayload,
  artistTopSongsOrAlbumsPayload,
} from "../payloads/artist";
import { songPayload } from "../payloads/song";
import {
  ArtistRequest,
  ArtistResponse,
  ArtistSongsOrAlbumsRequest,
  ArtistSongsOrAlbumsResponse,
} from "../types/artist";
import { CustomResponse } from "../types/response";
import { SongRequest, SongResponse } from "../types/song";

export const artist = new Hono();

const {
  id: _id,
  link: _link,
  songs,
  albums,
  topSongs,
} = config.endpoint.artist;

// middleware to check if query params are provided and are valid
artist.use("*", async (c, next) => {
  const { id, link, artist_id, song_id } = c.req.query();
  const path = c.req.path.split("/")[2];

  if (path === "songs" || path === "albums") {
    if (!id) throw new Error("Please provide artist id.");
  }

  if (path === "top") {
    if (!artist_id) throw new Error("Please provide artist id.");
    if (!song_id) throw new Error("Please provide song id.");

    return await next();
  }

  if (!id && !link) {
    throw new Error("Please provide album id or link");
  }
  if (id && link) {
    throw new Error("Please provide either album id or link");
  }
  if (link && !isJioSaavnLink(link)) {
    throw new Error("Please provide a valid JioSaavn link");
  }

  await next();
});

artist.get("/", async (c) => {
  const {
    id = "",
    link = "",
    page = "",
    n_song = "10",
    n_album = "10",
    raw = "",
  } = c.req.query();

  const result: ArtistRequest = await api(id ? _id : _link, {
    query: {
      artistId: id,
      token: tokenFromLink("artist", link),
      type: id ? "" : "artist",
      p: page,
      n_song,
      n_album,
    },
  });

  if (!result.artistId) {
    throw new Error("Artist not found, please check the id or link");
  }
  if (raw === "true") {
    return c.json(result);
  }

  const response: CustomResponse<ArtistResponse> = {
    status: "Success",
    message: "✅ Artist Details fetched successfully",
    data: artistPayload(result),
  };

  return c.json(response);
});

artist.get("/:path{(songs|albums)}", async (c) => {
  const path = c.req.path.split("/")[2];
  const {
    id,
    page = "",
    category = "", // ["latest", "alphabetical"]
    sort: sort_order = "", // ["asc", "desc"]
    raw = "",
  } = c.req.query();

  const result: ArtistSongsOrAlbumsRequest = await api(
    path === "songs" ? songs : albums,
    {
      query: {
        artistId: id,
        page,
        category,
        sort_order,
      },
    }
  );

  if (raw === "true") {
    return c.json(result);
  }

  const response: CustomResponse<ArtistSongsOrAlbumsResponse> = {
    status: "Success",
    message: `✅ Artist's ${path} fetched successfully`,
    data: artistTopSongsOrAlbumsPayload(result),
  };

  return c.json(response);
});

artist.get("/top", async (c) => {
  const {
    artist_id: artist_ids,
    song_id,
    page = "",
    language = "",
    category = "", // ["latest", "alphabetical"]
    sort: sort_order = "", // ["asc", "desc"]
    raw = "",
  } = c.req.query();

  const result: SongRequest[] = await api(topSongs, {
    query: {
      artist_ids,
      song_id,
      page,
      category,
      sort_order,
      language,
    },
  });

  if (raw === "true") {
    return c.json(result);
  }

  const response: CustomResponse<SongResponse[]> = {
    status: "Success",
    message: "✅ Artist's top songs fetched successfully",
    data: result.map(songPayload),
  };

  return c.json(response);
});
