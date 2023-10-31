import { ArtistMapResponse } from "./artist";

export type Type =
  | "artist"
  | "album"
  | "playlist"
  | "radio"
  | "radio_station"
  | "song"
  | "channel"
  | "mix"
  | "show"
  | "episode"
  | "season"
  | "label";

export type Quality = string | { quality: string; link: string }[];

export type Rights = {
  code: unknown;
  cacheable: unknown;
  delete_cached_object: unknown;
  reason: unknown;
};

export type MiniResponse = {
  id: string;
  name: string;
  subtitle?: string;
  header_desc?: string;
  type: Type;
  url: string;
  image: Quality;
  color?: string;
  duration?: number;
  album?: string;
  album_id?: string;
  album_url?: string;
  download_url?: Quality;
  artist_map?: ArtistMapResponse;
  explicit?: boolean;
  list?: string;
};
