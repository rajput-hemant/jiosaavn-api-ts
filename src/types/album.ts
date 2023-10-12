import { ArtistMapRequest, ArtistMapResponse } from "./artist";
import { MiniResponse, Quality, Type } from "./misc";
import { CustomResponse } from "./response";
import { SongRequest, SongResponse } from "./song";

/* -----------------------------------------------------------------------------------------------
 * Request
 * -----------------------------------------------------------------------------------------------*/

export type AlbumRequest = {
  id: string;
  title: string;
  subtitle: string;
  type: "album";
  image: string;
  perma_url: string;
  header_desc: string;
  explicit_content: string;
  language: string;
  year: string;
  play_count: string;
  list_count: string;
  list_type: Type;
  list?: string | SongRequest[];
  more_info: Partial<{
    artistMap: ArtistMapRequest;
    song_count: string;
    copyright_text: string;
    is_dolby_content: boolean;
    label_url: string;
  }>;
  modules?: AlbumModulesRequest;
};

export interface AlbumModulesRequest {
  reco: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    source_params: { albumid: string };
  };
  currentlyTrending: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    source_params: { entity_type: string; entity_language: string };
  };
  topAlbumsFromSameYear: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    source_params: { album_year: string; album_lang: string };
  };
  artists: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
}

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/

export type AlbumResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: "album";
  header_desc: string;
  language: string;
  play_count: number;
  duration: number;
  year: number;
  list_count: number;
  list_type: Type;
  artist_map?: ArtistMapResponse;
  song_count?: number;
  label_url?: string;
  copyright_text?: string;
  is_dolby_content?: boolean;
  songs?: (SongResponse | MiniResponse)[];
  modules?: AlbumModulesResponse;
};

export type AlbumModulesResponse = {
  recommend: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    params: { id: string };
  };
  currently_trending: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    params: { type: string; lang: string };
  };
  top_albums_from_same_year: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    params: { year: string; lang: string };
  };
  artists: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
};

/* -----------------------------------------------------------------------------------------------
 * Album Custom Response(s)
 * -----------------------------------------------------------------------------------------------*/

export type CAlbumResponse = CustomResponse<AlbumResponse>;

export type CAlbumsResponse = CustomResponse<AlbumResponse[]>;
