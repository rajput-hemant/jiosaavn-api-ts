import { AlbumRequest, AlbumResponse } from "./album";
import { MiniResponse, Quality, Type } from "./misc";
import { PlaylistRequest, PlaylistResponse } from "./playlist";
import { CustomResponse } from "./response";
import { SongRequest, SongResponse } from "./song";

/* -----------------------------------------------------------------------------------------------
 * Common
 * -----------------------------------------------------------------------------------------------*/

type Module = {
  title: string;
  subtitle: string;
  source: string;
  position: number;
};

export type Urls = {
  albums: string;
  bio: string;
  comments: string;
  songs: string;
};

export type ArtistTopSongsOrAlbums<T> = {
  total: number;
  last_page: boolean;
  songs: T[];
  albums: T[];
};

/* -----------------------------------------------------------------------------------------------
 * Request
 * -----------------------------------------------------------------------------------------------*/

export type ArtistRequest = {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: "artist";
  isVerified: boolean;
  dominantLanguage: string;
  dominantType: string;
  topSongs?: SongRequest[];
  topAlbums?: AlbumRequest[];
  dedicated_artist_playlist?: PlaylistRequest[];
  featured_artist_playlist?: PlaylistRequest[];
  singles?: ArtistSongRequest[];
  latest_release?: ArtistSongRequest[];
  similarArtists: SimilarArtistRequest[];
  isRadioPresent: boolean;
  bio: string;
  dob: string;
  fb: string;
  twitter: string;
  wiki: string;
  urls: Urls;
  availableLanguages: string[];
  fan_count: string;
  is_followed: boolean;
  modules: Partial<{
    topSongs: Module;
    latest_release: Module;
    topAlbums: Module;
    dedicated_artist_playlist: Module;
    featured_artist_playlist: Module;
    singles: Module;
    similarArtists: Module;
  }>;
};

export type SimilarArtistRequest = {
  id: string;
  name: string;
  roles: string;
  aka: string;
  fb: string;
  twitter: string;
  wiki: string;
  similar: string;
  dob: string;
  image_url: string;
  search_keywords: string;
  primary_artist_id: string;
  combine_artist_pages: number;
  replace_with_primary_artists: number;
  languages: string;
  perma_url: string;
  type: "artist";
  isRadioPresent: boolean;
  dominantType: string;
};

export type ArtistMapRequest = {
  primary_artists: ArtistMiniRequest[];
  featured_artists?: ArtistMiniRequest[];
  artists?: ArtistMiniRequest[];
};

export type ArtistMiniRequest = {
  id: string;
  image: string;
  perma_url: string;
  type: "artist";
  name: string;
  role: string;
};

export type ArtistSongRequest = Omit<SongRequest, "more_info"> & {
  more_info: {
    query: string;
    text: string;
    music: string;
    song_count: string;
    artistMap: ArtistMapRequest;
  };
};

export type ArtistSongsOrAlbumsRequest = {
  artistId: string;
  name: string;
  image: string;
  follower_count: string;
  type: "artist";
  isVerified: boolean;
  dominantLanguage: string;
  dominantType: Type;
  topSongs?: Omit<ArtistTopSongsOrAlbums<SongRequest>, "albums">;
  topAlbums?: Omit<ArtistTopSongsOrAlbums<AlbumRequest>, "songs">;
};

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/

export type ArtistResponse = {
  id: string;
  name: string;
  subtitle: string;
  image: Quality;
  follower_count: number;
  type: "artist";
  is_verified: boolean;
  dominant_language: string;
  dominant_type: string;
  top_songs: (SongResponse | MiniResponse)[];
  top_albums: (AlbumResponse | MiniResponse)[];
  dedicated_artist_playlist: (PlaylistResponse | MiniResponse)[];
  featured_artist_playlist: (PlaylistResponse | MiniResponse)[];
  singles: ArtistSongResponse[];
  latest_release: ArtistSongResponse[];
  similar_artists: SimilarArtistResponse[];
  is_radio_present: boolean;
  bio: {
    title: string;
    text: string;
    sequence: number;
  }[];
  dob: string;
  fb: string;
  twitter: string;
  wiki: string;
  urls: Urls;
  available_languages: string[];
  fan_count: number;
  is_followed: boolean;
  modules: {
    top_songs: Module;
    latest_release: Module;
    top_albums: Module;
    dedicated_artist_playlist: Module;
    featured_artist_playlist: Module;
    singles: Module;
    similar_artists: Module;
  };
};

export type SimilarArtistResponse = {
  id: string;
  name: string;
  roles: { [K: string]: string };
  aka: string;
  fb: string;
  twitter: string;
  wiki: string;
  similar: {
    id: string;
    name: string;
  }[];
  dob: string;
  image: Quality;
  search_keywords: string;
  primary_artist_id: string;
  languages: { [K: string]: string };
  url: string;
  type: "artist";
  is_radio_present: boolean;
  dominant_type: string;
};

export type ArtistMapResponse = {
  primary_artists: ArtistMiniResponse[];
  featured_artists: ArtistMiniResponse[];
  artists: ArtistMiniResponse[];
};

export type ArtistMiniResponse = {
  id: string;
  image: Quality;
  url: string;
  name: string;
  type: "artist";
  role: string;
};

export type ArtistSongResponse = Pick<
  SongResponse,
  | "id"
  | "name"
  | "subtitle"
  | "type"
  | "url"
  | "image"
  | "language"
  | "year"
  | "play_count"
  | "explicit"
  | "list_count"
  | "list_type"
  | "music"
  | "artist_map"
> & {
  query: string;
  text: string;
  song_count: number;
};

export type ArtistSongsOrAlbumsResponse = {
  id: string;
  name: string;
  image: Quality;
  follower_count: number;
  type: "artist";
  is_verified: boolean;
  dominant_language: string;
  dominant_type: string;
  top_songs?: Omit<
    ArtistTopSongsOrAlbums<SongResponse | MiniResponse>,
    "albums"
  >;
  top_albums?: Omit<
    ArtistTopSongsOrAlbums<AlbumResponse | MiniResponse>,
    "songs"
  >;
};

/* -----------------------------------------------------------------------------------------------
 * Artist Custom Response(s)
 * -----------------------------------------------------------------------------------------------*/

export type CArtistResponse = CustomResponse<ArtistResponse>;

export type CArtistSongsOrAlbumsResponse =
  CustomResponse<ArtistSongsOrAlbumsResponse>;
