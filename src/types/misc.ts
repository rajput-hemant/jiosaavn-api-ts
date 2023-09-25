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
  | "label";

export type Quality = string | { quality: string; link: string }[];

export type Rights = {
  code: unknown;
  cacheable: unknown;
  delete_cached_object: unknown;
  reason: unknown;
};

export type MiniResponse = Partial<{
  id: string;
  name: string;
  subtitle: string;
  header_desc: string;
  type: Type;
  url: string;
  image: Quality;
  color?: string;
  explicit: boolean;
  list: string;
}>;
