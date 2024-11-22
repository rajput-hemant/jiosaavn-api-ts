import { decode } from "entities";

import { createDownloadLinks, createImageLinks, parseBool } from "../lib/utils";
import { AlbumRequest } from "../types/album";
import { ChartRequest, RadioRequest } from "../types/get";
import { MiniResponse, Quality } from "../types/misc";
import {
  ArtistRecoRequest,
  CityModRequest,
  DiscoverRequest,
  PromoRequest,
  TagMixRequest,
} from "../types/modules";
import { PlaylistRequest } from "../types/playlist";
import { SongRequest } from "../types/song";
import { artistMapPayload } from "./artist.payload";

/* -----------------------------------------------------------------------------------------------
 * Mini Payload
 * -----------------------------------------------------------------------------------------------*/

type MiniPayloadRequest =
  | SongRequest
  | AlbumRequest
  | PlaylistRequest
  | PromoRequest
  | RadioRequest
  | DiscoverRequest
  | CityModRequest
  | TagMixRequest
  | ArtistRecoRequest
  | ChartRequest;

export function miniPayload(item: MiniPayloadRequest): MiniResponse {
  const {
    id,
    title,
    subtitle,
    type,
    perma_url: url,
    image,
    explicit_content,
    more_info,
  } = item;

  let subs: string | undefined;
  let color: string | undefined;
  let duration: number | undefined;
  let download_url: Quality | undefined;
  let list: string | undefined;
  let album: string | undefined;
  let album_id: string | undefined;
  let album_url: string | undefined;

  if (type === "song" && "duration" in more_info) {
    subs = subtitle.split("-")[0].trim();
    duration = +more_info.duration;
    download_url = createDownloadLinks(more_info.encrypted_media_url);
    album = decode(more_info.album);
    album_id = more_info.album_id;
    album_url = more_info.album_url;
  }
  if (type === "album" && "artistMap" in more_info) {
    subs = more_info?.artistMap?.artists?.map((a) => a.name.trim()).join(",");
  }
  if (type === "radio_station" && "color" in more_info) {
    color = more_info.color;
  }
  if ("list" in item && typeof item.list === "object") {
    list = item.list.map((i) => i.id).join(",");
  }

  return {
    id,
    name: decode(title),
    subtitle: decode(subs ?? subtitle ?? ""),
    type,
    url,
    image: createImageLinks(image),
    header_desc: "header_desc" in item ? decode(item.header_desc ?? "") : "",
    explicit: explicit_content ? parseBool(explicit_content) : undefined,
    color,
    album,
    album_id,
    album_url,
    artist_map:
      more_info && "artistMap" in more_info && more_info.artistMap
        ? artistMapPayload(more_info.artistMap)
        : undefined,
    duration,
    download_url,
    list,
  };
}
