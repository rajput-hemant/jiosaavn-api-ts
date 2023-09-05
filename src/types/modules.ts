import { AlbumRequest, AlbumResponse } from "./album";
import { Quality, Type } from "./misc";
import { PlaylistRequest, PlaylistResponse } from "./playlist";
import { SongRequest, SongResponse } from "./song";

export type ModulesRequest = {
  new_albums: ModuleAlbumRequest;
  artist_recos?: ArtistRecoRequest[];
  browse_discover: DiscoverRequest[];
  charts: ChartRequest[];
  city_mod?: CityModRequest[];
  global_config: GlobalConfig;
  modules: ModuleRequest;
  new_trending: TrendingRequest;
  radio: RadioRequest[];
  tag_mixes?: TagMixRequest[];
  top_playlists: PlaylistRequest[];
} & Record<string, PromoRequest[]>;

type ModuleAlbumRequest = AlbumRequest[] | SongRequest[];

export type ArtistRecoRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  more_info: {
    featured_station_type: Type;
    query: string;
    station_display_text: string;
  };
};

export type DiscoverRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  more_info: {
    available: string;
    badge: string;
    tags: Record<string, string[]>;
    is_featured: string;
    sub_type: Type;
    video_thumbnail: string;
    video_url: string;
  };
};

export type ChartRequest = {
  count?: number;
  explicit_content?: string;
  id: string;
  image: string;
  language?: string;
  listname?: string;
  perma_url: string;
  subtitle?: string;
  title: string;
  type: Type;
  more_info?: Partial<{
    firstname: string;
    song_count: number;
  }>;
};

export type CityModRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  more_info: Partial<{
    album_id: string;
    featured_station_type: string;
    query: string;
    multiple_tunes: {
      id: string;
      subtype: Type;
      title: string;
      type: Type;
    }[];
  }>;
};

export type GlobalConfig = {
  random_songs_listid: GlobalConfigItem;
  weekly_top_songs_listid: GlobalConfigItem;
};

type GlobalConfigItem = {
  english: GlobalConfigItemLang;
  hindi: GlobalConfigItemLang;
};

type GlobalConfigItemLang = {
  count: number;
  image: string;
  listid: string;
  title?: string;
};

export type TagMixRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  language: string;
  list_count: string;
  list_type: Type;
  list: string;
  more_info: {
    firstname: string;
    lastname: string;
  };
  play_count: string;
  year: string;
};

export type RadioRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  more_info: {
    color?: string;
    description?: string;
    featured_station_type: Type;
    language: string;
    query?: string;
    station_display_text: string;
  };
};

type TrendingRequest = AlbumRequest[] | SongRequest[] | PlaylistRequest[];

export type PromoRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  language?: string;
  list_count?: string;
  list_type?: string;
  list?: string;
  play_count?: string;
  year?: string;
  more_info: Partial<{
    editorial_language: string;
    position: string;
    release_year: number;
    square_image: string;
  }>;
};

export type ModuleRequest = {
  artist_recos?: ModuleItemRequest;
  charts: ModuleItemRequest;
  city_mod?: ModuleItemRequest;
  new_albums: ModuleItemRequest;
  new_trending: ModuleItemRequest;
  radio: ModuleItemRequest;
  tag_mixes?: ModuleItemRequest;
  top_playlists: ModuleItemRequest;
} & Record<string, ModuleItemRequest>;

export type ModuleItemRequest = {
  title: string;
  subtitle: string;
  position: number;
  featured_text?: string;
};

/*---------------------- Response ---------------------- */

export type Module<T> = {
  title: string;
  subtitle: string;
  position: number;
  featured_text?: string;
  source: string;
  data: T[];
};

export type ModuleResponse = {
  albums: Module<AlbumResponse | SongResponse>;
  artist_recos: Module<ArtistRecoResponse>;
  charts: Module<ChartResponse>;
  city_mod?: Module<CityModResponse>;
  discover: Module<DiscoverResponse>;
  mixes: Module<TagMixResponse>;
  playlists: Module<PlaylistResponse>;
  radio: Module<RadioResponse>;
  trending: Module<AlbumResponse | SongResponse | PlaylistResponse>;
  global_config: GlobalConfig;
};
// & Record<string, Module<PromoResponse>>;

export type ArtistRecoResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  featured_station_type: Type;
  query: string;
  station_display_text: string;
};

export type DiscoverResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  badge: string;
  is_featured: boolean;
  sub_type: Type;
  tags: Record<string, string[]>;
  video_thumbnail: string;
  video_url: string;
};

export type ChartResponse = {
  explicit?: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle?: string;
  name: string;
  type: Type;
  count?: number;
  first_name?: string;
  language?: string;
  listname?: string;
  song_count?: number;
};

export type CityModResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  album_id?: string;
  featured_station_type?: string;
  multiple_tunes?: { id: string; name: string; sub_type: Type; type: Type }[];
  query?: string;
};

export type TagMixResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  first_name: string;
  language: string;
  last_name: string;
  list_count: number;
  list_type: Type;
  list: string;
  play_count: number;
  year: number;
};

export type RadioResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  color?: string;
  description?: string;
  featured_station_type: Type;
  language: string;
  query?: string;
  station_display_text: string;
};

export type TrendingResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  language: string;
  list_count: number;
  list_type: Type;
  list: string;
  play_count: number;
  year: number;
};

export type PromoResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  editorial_language?: string;
  language?: string;
  list_count?: number;
  list_type?: string;
  list?: string;
  play_count?: number;
  release_year?: number;
  year?: number;
};
