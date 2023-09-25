import { createImageLinks, parseBool } from "../lib/utils";
import { AlbumRequest } from "../types/album";
import { ChartRequest, RadioRequest } from "../types/get";
import { MiniResponse } from "../types/misc";
import {
  ArtistRecoRequest,
  CityModRequest,
  DiscoverRequest,
  PromoRequest,
  TagMixRequest,
} from "../types/modules";
import { PlaylistRequest } from "../types/playlist";
import { SongRequest } from "../types/song";

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
    title: name,
    subtitle,
    type,
    perma_url: url,
    image,
    explicit_content,
  } = item;

  let subs: string | undefined;

  if (type === "album" && "artistMap" in item.more_info) {
    subs = item.more_info?.artistMap?.artists.map((a) => a.name).join(", ");
  }

  return {
    id,
    name,
    subtitle: subs ?? subtitle,
    type,
    url,
    image: createImageLinks(image),
    header_desc: "header_desc" in item ? item.header_desc : "",
    explicit: explicit_content ? parseBool(explicit_content) : undefined,
    color:
      type === "radio_station" && "color" in item.more_info
        ? item.more_info?.color
        : undefined,
    list:
      "list" in item
        ? typeof item.list === "object"
          ? item.list.map((i) => i.id).join(",")
          : item.list
        : "",
  };
}
