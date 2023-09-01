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

export type CommonRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
};

export type CommonResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
};
