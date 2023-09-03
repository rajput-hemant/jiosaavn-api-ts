import { AlbumRequest, AlbumResponse } from "./album";
import { Quality, Type } from "./misc";
import { Module } from "./modules";
import { SongRequest, SongResponse } from "./song";

export type ArtistRequest = {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: Type;
  isVerified: boolean;
  dominantLanguage: string;
  dominantType: string;
  topSongs?: SongRequest[];
  topAlbums?: AlbumRequest[];
  dedicated_artist_playlist?: ArtistPlaylistRequest[];
  featured_artist_playlist?: ArtistPlaylistRequest[];
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
    topSongs: ArtistModuleRequest;
    latest_release: ArtistModuleRequest;
    topAlbums: ArtistModuleRequest;
    dedicated_artist_playlist: ArtistModuleRequest;
    featured_artist_playlist: ArtistModuleRequest;
    singles: ArtistModuleRequest;
    similarArtists: ArtistModuleRequest;
  }>;
};

export type ArtistPlaylistRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: Type;
  numsongs?: string;
  more_info: {
    uid: string;
    firstname: string;
    artist_name?: string[];
    video_available: boolean;
    is_dolby_content?: boolean;
    images?: string;
    lastname: string;
    song_count: string;
    language: string;
  };
};

export type ArtistModuleRequest = {
  title: string;
  subtitle: string;
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
  type: Type;
  isRadioPresent: boolean;
  dominantType: string;
};

export type Urls = {
  albums: string;
  bio: string;
  comments: string;
  songs: string;
};

export type ArtistMapRequest = {
  primary_artists: ArtistMiniRequest[];
  featured_artists: ArtistMiniRequest[];
  artists: ArtistMiniRequest[];
};

export type ArtistMiniRequest = {
  id: string;
  image: string;
  perma_url: string;
  type: Type;
  name: string;
  role: string;
};

export interface ArtistSongRequest {
  id: string;
  title: string;
  subtitle: string;
  type: Type;
  perma_url: string;
  image: string;
  language: string;
  year: string;
  play_count: string;
  explicit_content: string;
  list_count: string;
  list_type: Type;
  list: string;
  more_info: {
    query: string;
    text: string;
    music?: string;
    song_count: string;
    artistMap: ArtistMapRequest;
  };
}

export type ArtistSongsOrAlbumsRequest = {
  artistId: string;
  name: string;
  image: string;
  follower_count: string;
  type: Type;
  isVerified: boolean;
  dominantLanguage: string;
  dominantType: Type;
  topSongs?: Omit<ArtistTopSongsOrAlbums<SongRequest>, "albums">;
  topAlbums?: Omit<ArtistTopSongsOrAlbums<AlbumRequest>, "songs">;
};

export type ArtistTopSongsOrAlbums<T> = {
  total: number;
  last_page: boolean;
  songs: T[];
  albums: T[];
};

/*---------------------- Response ---------------------- */

export type ArtistResponse = {
  id: string;
  name: string;
  subtitle: string;
  image: Quality;
  followerCount: number;
  type: Type;
  isVerified: boolean;
  dominantLanguage: string;
  dominantType: string;
  topSongs: Module<SongResponse>;
  topAlbums: Module<AlbumResponse>;
  dedicatedArtistPlaylist: Module<ArtistPlaylistResponse>;
  featuredArtistPlaylist: Module<ArtistPlaylistResponse>;
  singles: Module<ArtistSongResponse>;
  latestRelease: Module<ArtistSongResponse>;
  similarArtists: Module<SimilarArtistResponse>;
  isRadioPresent: boolean;
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
  availableLanguages: string[];
  fanCount: number;
  isFollowed: boolean;
};

export type SimilarArtistResponse = {
  id: string;
  name: string;
  roles: string;
  aka: string;
  fb: string;
  twitter: string;
  wiki: string;
  similar: string;
  dob: string;
  image: Quality;
  searchKeywords: string;
  primaryArtistId: string;
  combineArtistPages: number;
  replaceWithPrimaryArtists: number;
  languages: string;
  url: string;
  type: Type;
  isRadioPresent: boolean;
  dominantType: string;
};

export type ArtistMapResponse = {
  primaryArtists: ArtistMiniResponse[];
  featuredArtists: ArtistMiniResponse[];
  artists: ArtistMiniResponse[];
};

export type ArtistMiniResponse = {
  id: string;
  image: Quality;
  url: string;
  name: string;
  type: Type;
  role: string;
};

export interface ArtistSongResponse {
  id: string;
  name: string;
  subtitle: string;
  type: Type;
  url: string;
  image: Quality;
  language: string;
  year: number;
  playCount: number;
  explicit: boolean;
  listCount: number;
  listType: string;
  query: string;
  text: string;
  music?: string;
  songCount: number;
  artistMap: ArtistMapResponse;
}

export type ArtistSongsOrAlbumsResponse = {
  id: string;
  name: string;
  image: Quality;
  followerCount: number;
  type: Type;
  isVerified: boolean;
  dominantLanguage: string;
  dominantType: string;
  topSongs?: Omit<ArtistTopSongsOrAlbums<SongResponse>, "albums">;
  topAlbums?: Omit<ArtistTopSongsOrAlbums<AlbumResponse>, "songs">;
};

export type ArtistPlaylistResponse = {
  explicit: boolean;
  id: string;
  image: Quality;
  url: string;
  subtitle: string;
  name: string;
  type: Type;
  numsongs?: number;
  userId: string;
  firstname: string;
  artistName?: string[];
  videoAvailable: boolean;
  isDolbyContent?: boolean;
  images?: string;
  lastname: string;
  songCount: number;
  language: string;
};
