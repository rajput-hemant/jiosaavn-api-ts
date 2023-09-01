export type Type =
  | "artist"
  | "album"
  | "playlist"
  | "radio"
  | "radio_station"
  | "song";

export type Quality = string | { quality: string; link: string }[];

export type Rights = {
  code: unknown;
  cacheable: unknown;
  delete_cached_object: unknown;
  reason: unknown;
};
