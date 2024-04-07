import { AlbumRequest, AlbumResponse } from "./album";
import {
  ArtistMapRequest,
  ArtistMapResponse,
  ArtistMiniRequest,
  ArtistMiniResponse,
} from "./artist";
import { MiniResponse, Quality, Type } from "./misc";
import { PlaylistRequest, PlaylistResponse } from "./playlist";
import { CustomResponse } from "./response";
import { SongRequest, SongResponse } from "./song";

/* -----------------------------------------------------------------------------------------------
 * Common
 * -----------------------------------------------------------------------------------------------*/

type A<T> = {
  position: number;
  data: T[];
};

export type Search<T> = {
  total: number;
  start: number;
  results: T[];
};

/* -----------------------------------------------------------------------------------------------
 * Request
 * -----------------------------------------------------------------------------------------------*/

export type TopSearchRequest = {
  id: string;
  title: string;
  subtitle: string;
  type: Type;
  image: string;
  perma_url: string;
  explicit_content: string;
  more_info: {
    album: string;
    artistMap: ArtistMapRequest[];
  };
};

export type AllSearchRequest = {
  albums: A<{
    id: string;
    title: string;
    image: string;
    music: string;
    url: string;
    type: string;
    description: string;
    ctr: number;
    position: number;
    more_info: {
      year: string;
      is_movie: string;
      language: string;
      song_pids: string;
    };
  }>;
  songs: A<{
    id: string;
    title: string;
    image: string;
    album: string;
    url: string;
    type: string;
    description: string;
    ctr: number;
    position: number;
    more_info: {
      vcode?: string;
      vlink?: string;
      primary_artists: string;
      singers: string;
      video_available: boolean;
      triller_available: boolean;
      language: string;
    } | null;
  }>;
  playlists: A<{
    id: string;
    title: string;
    image: string;
    extra: string;
    url: string;
    language: string;
    type: string;
    description: string;
    position: number;
    more_info: {
      firstname: string;
      artist_name: string;
      entity_type: string;
      entity_sub_type: string;
      video_available: boolean;
      is_dolby_content: boolean;
      sub_types: string;
      lastname: string;
      language: string;
    } | null;
  }>;
  artists: A<{
    id: string;
    title: string;
    image: string;
    extra: string;
    url: string;
    type: string;
    description: string;
    ctr: number;
    entity: number;
    position: number;
  }>;
  topquery: A<AllSearchRequest["songs"]["data"][0]>;
  shows: A<{
    id: string;
    title: string;
    image: string;
    type: string;
    season_number: number;
    description: string;
    url: string;
    position: number;
  }>;
  episodes: A<unknown>;
};

export type SongSearchRequest = Search<SongRequest>;

export type AlbumSearchRequest = Search<AlbumRequest>;

export type PlaylistSearchRequest = Search<PlaylistRequest>;

export type ArtistSearchRequest = Search<{
  name: string;
  id: string;
  ctr: number;
  entity: number;
  image: string;
  role: string;
  perma_url: string;
  type: string;
  mini_obj: boolean;
  isRadioPresent: boolean;
  is_followed: boolean;
}>;

export type PodcastSearchRequest = Search<{
  id: string;
  type: string;
  title: string;
  image_file_url: string;
  partner_name: string;
  label_name: string;
  explicit_content: number;
  song_info: string;
  latest_season_sequence: number;
  square_image_url: string;
  artists: ArtistMiniRequest[];
  featured_artists: ArtistMiniRequest[];
  primary_artists: ArtistMiniRequest[];
  perma_url: string;
  subtitle: string;
}>;

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/

export type TopSearchResponse = {
  id: string;
  name: string;
  subtitle: string;
  type: Type;
  image: Quality;
  url: string;
  explicit: boolean;
  album: string;
  artist_map: ArtistMapResponse[];
};

export type AllSearchResponse = {
  albums: A<{
    id: string;
    name: string;
    subtitle: string;
    image: Quality;
    music: string;
    url: string;
    type: string;
    position: number;
    year: number;
    is_movie: boolean;
    language: string;
    song_pids: string;
  }>;
  songs: A<{
    id: string;
    name: string;
    subtitle: string;
    image: Quality;
    album: string;
    url: string;
    type: string;
    position: number;
    primary_artists?: string;
    singers?: string;
    language?: string;
  }>;
  playlists: A<{
    id: string;
    name: string;
    subtitle: string;
    image: Quality;
    extra: string;
    url: string;
    language: string;
    type: string;
    position: number;
    firstname?: string;
    lastname?: string;
    artist_name?: string;
    entity_type?: string;
    entity_sub_type?: string;
    is_dolby_content?: boolean;
    sub_types?: string;
  }>;
  artists: A<{
    id: string;
    name: string;
    image: Quality;
    extra: string;
    url: string;
    type: string;
    subtitle: string;
    entity: number;
    position: number;
  }>;
  top_query: A<AllSearchResponse["songs"]["data"][0]>;
  shows: A<{
    id: string;
    name: string;
    image: Quality;
    type: string;
    season_number: number;
    subtitle: string;
    url: string;
    position: number;
  }>;
  episodes: A<unknown>;
};

export type SongSearchResponse = Search<SongResponse | MiniResponse>;

export type AlbumSearchResponse = Search<AlbumResponse | MiniResponse>;

export type PlaylistSearchResponse = Search<PlaylistResponse | MiniResponse>;

export type ArtistSearchResponse = Search<{
  id: string;
  name: string;
  ctr: number;
  entity: number;
  image: Quality;
  role: string;
  url: string;
  type: string;
  is_radio_present: boolean;
  is_followed: boolean;
}>;

export type PodcastSearchResposne = Search<{
  id: string;
  name: string;
  subtitle: string;
  type: string;
  image: Quality;
  partner_name: string;
  label_name: string;
  explicit: boolean;
  season: number;
  artists: ArtistMiniResponse[];
  featured_artists: ArtistMiniResponse[];
  primary_artists: ArtistMiniResponse[];
  url: string;
}>;

/* -----------------------------------------------------------------------------------------------
 * Artist Custom Response(s)
 * -----------------------------------------------------------------------------------------------*/

export type CAllSearchResponse = CustomResponse<AllSearchResponse>;

export type CTopSearchResponse = CustomResponse<TopSearchResponse[]>;

export type CSearchXResponse = CustomResponse<
  | SongSearchResponse
  | AlbumSearchResponse
  | PlaylistSearchResponse
  | ArtistSearchResponse
>;
