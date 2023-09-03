import { AlbumRequest, AlbumResponse } from "./album";
import { CommonRequest, CommonResponse, Type } from "./misc";

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

export type ArtistRecoRequest = CommonRequest & {
  more_info: ArtistRecoRequestMoreInfo;
};

export type ArtistRecoRequestMoreInfo = {
  featured_station_type: Type;
  query: string;
  station_display_text: string;
};

export type DiscoverRequest = CommonRequest & {
  more_info: DiscoverMoreInfo;
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

export type CityModRequest = CommonRequest & {
  more_info: CityModRequestMoreInfo;
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

export type TagMixRequest = CommonRequest & {
  language: string;
  list_count: string;
  list_type: Type;
  list: string;
  more_info: TagMixRequestMoreInfo;
  play_count: string;
  year: string;
};

export type TagMixRequestMoreInfo = {
  firstname: string;
  lastname: string;
};

export type RadioRequest = CommonRequest & {
  more_info: RadioRequestMoreInfo;
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

// export type ShowRequest = CommonRequest & {
//   more_info: ShowMoreInfo;
// };

// export type ShowMoreInfo = {
//   badge: string;
//   release_date: string;
//   season_number: string;
//   square_image: string;
//   year: string;
// };

export type TrendingRequest = CommonRequest & {
  language: string;
  list_count: string;
  list_type: Type;
  list: string;
  play_count: string;
  year: string;
};

export type ModulePlaylistRequest = CommonRequest & {
  more_info: PlaylistMoreInfo;
};

export type PlaylistMoreInfo = {
  firstname: string;
  follower_count: string;
  last_updated: string;
  song_count: string;
  uid: string;
};

export type PromoRequest = CommonRequest & {
  language?: string;
  list_count?: string;
  list_type?: string;
  list?: string;
  more_info: PromoRequestMoreInfo;
  play_count?: string;
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
  data: T[];
};

export type ModuleResponse = {
  albums: Module<AlbumResponse>;
  artistRecos: Module<ArtistRecoResponse>;
  charts: Module<ChartResponse>;
  cityMod?: Module<CityModResponse>;
  globalConfig: GlobalConfig;
  discover: DiscoverResponse[];
  mixes: Module<TagMixResponse>;
  playlists: Module<ModulePlaylistResponse>;
  promo107: Module<PromoResponse>;
  promo112: Module<PromoResponse>;
  promo113: Module<PromoResponse>;
  promo114: Module<PromoResponse>;
  promo116: Module<PromoResponse>;
  promo118: Module<PromoResponse>;
  promo176: Module<PromoResponse>;
  promo185: Module<PromoResponse>;
  promo49: Module<PromoResponse>;
  promo68: Module<PromoResponse>;
  promo76: Module<PromoResponse>;
  promo90: Module<PromoResponse>;
  radio: Module<RadioResponse>;
  trending: Module<TrendingResponse>;
};

export type ArtistRecoResponse = CommonResponse & {
  featuredStationtype: Type;
  query: string;
  stationDisplayText: string;
};

export type DiscoverResponse = CommonResponse & {
  badge: string;
  isFeatured: boolean;
  subtype: Type;
  videoThumbnail: string;
  videoUrl: string;
};

export type ChartResponse = Omit<CommonResponse, "subtitle"> & {
  count?: number;
  firstname?: string;
  language?: string;
  listname?: string;
  songCount?: number;
  subtitle?: string;
};

export type CityModResponse = CommonResponse & {
  albumId?: string;
  featuredStationType?: string;
  multipleTunes?: CityModResponseMultipleTune[];
  query?: string;
};

export type CityModResponseMultipleTune = {
  id: string;
  name: string;
  subtype: Type;
  type: Type;
};

export type TagMixResponse = CommonResponse & {
  firstname: string;
  language: string;
  lastname: string;
  listCount: number;
  listtype: Type;
  list: string;
  playCount: number;
  subtitle: string;
  year: number;
};

export type RadioResponse = {
  color?: string;
  description?: string;
  featuredStationtype: Type;
  language: string;
  query?: string;
  stationDisplayText: string;
} & CommonResponse;

export type DiscoverResonse = {
  badge: string;
  isFeatured: boolean;
  subtype: Type;
  videoThumbnail: string;
  videoUrl: string;
} & CommonResponse;

export type TrendingResponse = {
  language: string;
  listCount: number;
  listtype: Type;
  list: string;
  playCount: number;
  year: number;
} & CommonResponse;

export type ModulePlaylistResponse = {
  firstname: string;
  followerCount: number;
  lastUpdated: number;
  songCount: number;
  userId: string;
} & CommonResponse;

export type PromoResponse = {
  editorialLanguage?: string;
  language?: string;
  listCount?: number;
  listType?: string;
  list?: string;
  playCount?: number;
  position?: number;
  releaseYear?: number;
  squareImage?: string;
  year?: number;
} & CommonResponse;
