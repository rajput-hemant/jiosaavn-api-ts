import { AlbumRequest, AlbumResponse } from "./album";
import { Quality, Type } from "./misc";

export type ModulesRequest = {
  new_albums: AlbumRequest[];
  artist_recos?: ArtistRecoRequest[];
  browse_discover: DiscoverRequest[];
  charts: ChartRequest[];
  city_mod?: CityModRequest[];
  global_config: GlobalConfig;
  modules: ModuleRequest;
  new_trending: TrendingRequest[];
  radio: RadioRequest[];
  tag_mixes?: TagMixRequest[];
  top_playlists: ModulePlaylistRequest[];
  // top_shows: TopShowsRequest;
  "promo:vx:data:107"?: PromoRequest[];
  "promo:vx:data:112"?: PromoRequest[];
  "promo:vx:data:113"?: PromoRequest[];
  "promo:vx:data:114"?: PromoRequest[];
  "promo:vx:data:116"?: PromoRequest[];
  "promo:vx:data:118"?: PromoRequest[];
  "promo:vx:data:176"?: PromoRequest[];
  "promo:vx:data:185"?: PromoRequest[];
  "promo:vx:data:49"?: PromoRequest[];
  "promo:vx:data:68"?: PromoRequest[];
  "promo:vx:data:76"?: PromoRequest[];
  "promo:vx:data:90"?: PromoRequest[];
};

export type ArtistRecoRequest = {
  explicit_content: string;
  id: string;
  image: string;
  more_info: ArtistRecoRequestMoreInfo;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
};

export type ArtistRecoRequestMoreInfo = {
  featured_station_type: Type;
  query: string;
  station_display_text: string;
};

export type DiscoverRequest = {
  explicit_content: string;
  id: string;
  image: string;
  more_info: DiscoverMoreInfo;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
};

export type DiscoverMoreInfo = {
  available: string;
  badge: string;
  is_featured: string;
  sub_type: Type;
  video_thumbnail: string;
  video_url: string;
};

export type ChartRequest = {
  count?: number;
  explicit_content?: string;
  id: string;
  image: string;
  language?: string;
  listname?: string;
  more_info?: ChartRequestMoreInfo;
  perma_url: string;
  subtitle?: string;
  title: string;
  type: Type;
};

export type ChartRequestMoreInfo = {
  firstname?: string;
  song_count?: number;
};

export type CityModRequest = {
  explicit_content: string;
  id: string;
  image: string;
  more_info: CityModRequestMoreInfo;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
};

export type CityModRequestMoreInfo = {
  album_id?: string;
  featured_station_type?: string;
  multiple_tunes?: CityModRequestMultipleTune[];
  query?: string;
};

export type CityModRequestMultipleTune = {
  id: string;
  subtype: Type;
  title: string;
  type: Type;
};

export type GlobalConfig = {
  random_songs_listid: GlobalConfigItem;
  weekly_top_songs_listid: GlobalConfigItem;
};

export type GlobalConfigItem = {
  english: GlobalConfigItemLang;
  hindi: GlobalConfigItemLang;
};

export type GlobalConfigItemLang = {
  count: number;
  image: string;
  listid: string;
  title?: string;
};

export type TagMixRequest = {
  explicit_content: string;
  id: string;
  image: string;
  language: string;
  list_count: string;
  list_type: Type;
  list: string;
  more_info: TagMixRequestMoreInfo;
  perma_url: string;
  play_count: string;
  subtitle: string;
  title: string;
  type: Type;
  year: string;
};

export type TagMixRequestMoreInfo = {
  firstname: string;
  lastname: string;
};

export type RadioRequest = {
  explicit_content: string;
  id: string;
  image: string;
  more_info: RadioRequestMoreInfo;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
};

export type RadioRequestMoreInfo = {
  color?: string;
  description?: string;
  featured_station_type: Type;
  language: string;
  query?: string;
  station_display_text: string;
};

// export type TopShowsRequest = {
//   last_page: boolean;
//   shows: ShowRequest[];
// };

// export type ShowRequest = {
//   explicit_content: string;
//   id: string;
//   image: string;
//   more_info: ShowMoreInfo;
//   perma_url: string;
//   subtitle: string;
//   title: string;
//   type: Type;
// };

// export type ShowMoreInfo = {
//   badge: string;
//   release_date: string;
//   season_number: string;
//   square_image: string;
//   year: string;
// };

export type TrendingRequest = {
  explicit_content: string;
  id: string;
  image: string;
  language: string;
  list_count: string;
  list_type: Type;
  list: string;
  perma_url: string;
  play_count: string;
  subtitle: string;
  title: string;
  type: Type;
  year: string;
};

export type ModulePlaylistRequest = {
  explicit_content: string;
  id: string;
  image: string;
  more_info: PlaylistMoreInfo;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
};

export type PlaylistMoreInfo = {
  firstname: string;
  follower_count: string;
  last_updated: string;
  song_count: string;
  uid: string;
};

export type PromoRequest = {
  explicit_content: string;
  id: string;
  image: string;
  language?: string;
  list_count?: string;
  list_type?: string;
  list?: string;
  more_info: PromoRequestMoreInfo;
  perma_url: string;
  play_count?: string;
  subtitle: string;
  title: string;
  type: Type;
  year?: string;
};

export type PromoRequestMoreInfo = {
  editorial_language?: string;
  position?: string;
  release_year?: number;
  square_image?: string;
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
  "promo:vx:data:107"?: ModuleItemRequest;
  "promo:vx:data:112"?: ModuleItemRequest;
  "promo:vx:data:113"?: ModuleItemRequest;
  "promo:vx:data:114"?: ModuleItemRequest;
  "promo:vx:data:116"?: ModuleItemRequest;
  "promo:vx:data:118"?: ModuleItemRequest;
  "promo:vx:data:176"?: ModuleItemRequest;
  "promo:vx:data:185"?: ModuleItemRequest;
  "promo:vx:data:49"?: ModuleItemRequest;
  "promo:vx:data:68"?: ModuleItemRequest;
  "promo:vx:data:76"?: ModuleItemRequest;
  "promo:vx:data:90"?: ModuleItemRequest;
};

export type ModuleItemRequest = {
  featured_text?: string;
  subtitle: string;
  title: string;
};

/*---------------------- Response ---------------------- */

export type Module<T> = {
  title: string;
  subtitle: string;
  featuredText?: string;
  data: T;
};

export type ModuleResponse = {
  albums: Module<AlbumResponse[]>;
  artistRecos: Module<ArtistRecoResponse[]>;
  charts: Module<ChartResponse[]>;
  cityMod?: Module<CityModResponse[]>;
  globalConfig: GlobalConfig;
  discover: DiscoverResponse[];
  mixes: Module<TagMixResponse[]>;
  playlists: Module<ModulePlaylistResponse[]>;
  promo107: Module<PromoResponse[]>;
  promo112: Module<PromoResponse[]>;
  promo113: Module<PromoResponse[]>;
  promo114: Module<PromoResponse[]>;
  promo116: Module<PromoResponse[]>;
  promo118: Module<PromoResponse[]>;
  promo176: Module<PromoResponse[]>;
  promo185: Module<PromoResponse[]>;
  promo49: Module<PromoResponse[]>;
  promo68: Module<PromoResponse[]>;
  promo76: Module<PromoResponse[]>;
  promo90: Module<PromoResponse[]>;
  radio: Module<RadioResponse[]>;
  trending: Module<TrendingResponse[]>;
};

export type ArtistRecoResponse = {
  explicit: boolean;
  featuredStationtype: Type;
  id: string;
  image: Quality;
  name: string;
  query: string;
  stationDisplayText: string;
  subtitle: string;
  type: Type;
  url: string;
};

export type DiscoverResponse = {
  badge: string;
  explicit: boolean;
  id: string;
  image: string;
  isFeatured: boolean;
  name: string;
  subtitle: string;
  subtype: Type;
  type: Type;
  url: string;
  videoThumbnail: string;
  videoUrl: string;
};

export type ChartResponse = {
  count?: number;
  explicit?: boolean;
  firstname?: string;
  id: string;
  image: Quality;
  language?: string;
  listname?: string;
  name: string;
  songCount?: number;
  subtitle?: string;
  type: Type;
  url: string;
};

export type CityModResponse = {
  albumId?: string;
  explicit: boolean;
  featuredStationType?: string;
  id: string;
  image: Quality;
  multipleTunes?: CityModResponseMultipleTune[];
  name: string;
  query?: string;
  subtitle: string;
  type: Type;
  url: string;
};

export type CityModResponseMultipleTune = {
  id: string;
  name: string;
  subtype: Type;
  type: Type;
};

export type TagMixResponse = {
  explicit: boolean;
  firstname: string;
  id: string;
  image: Quality;
  language: string;
  lastname: string;
  listCount: number;
  listtype: Type;
  list: string;
  name: string;
  playCount: number;
  subtitle: string;
  type: Type;
  url: string;
  year: number;
};

export type RadioResponse = {
  color?: string;
  description?: string;
  explicit: boolean;
  featuredStationtype: Type;
  id: string;
  image: Quality;
  language: string;
  name: string;
  query?: string;
  stationDisplayText: string;
  subtitle: string;
  type: Type;
  url: string;
};

export type DiscoverResonse = {
  badge: string;
  explicit: boolean;
  id: string;
  image: Quality;
  isFeatured: boolean;
  name: string;
  subtype: Type;
  subtitle: string;
  type: Type;
  url: string;
  videoThumbnail: string;
  videoUrl: string;
};

export type TrendingResponse = {
  explicit: boolean;
  type: Type;
  id: string;
  image: Quality;
  language: string;
  listCount: number;
  listtype: Type;
  list: string;
  name: string;
  playCount: number;
  subtitle: string;
  url: string;
  year: number;
};

export type ModulePlaylistResponse = {
  explicit: boolean;
  firstname: string;
  followerCount: number;
  id: string;
  image: Quality;
  lastUpdated: number;
  name: string;
  songCount: number;
  subtitle: string;
  type: Type;
  url: string;
  userId: string;
};

export type PromoResponse = {
  editorialLanguage?: string;
  explicit: boolean;
  id: string;
  image: Quality;
  language?: string;
  listCount?: number;
  listType?: string;
  list?: string;
  name: string;
  playCount?: number;
  position?: number;
  releaseYear?: number;
  squareImage?: string;
  subtitle: string;
  type: Type;
  url: string;
  year?: number;
};
