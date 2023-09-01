import { ArtistMapRequest, ArtistMapResponse } from "./artist";
import { Quality, Rights, Type } from "./misc";

export type SongRequest = {
  id: string;
  title?: string;
  subtitle: string;
  type: Type;
  perma_url: string;
  image: string;
  language: string;
  year: string;
  play_count: string | number;
  explicit_content: string;
  list_count: string;
  list_type: Type;
  list: string;
  more_info: SongRequestMoreInfo;
};

export type SongRequestMoreInfo = {
  music: string;
  song?: string;
  album_id: string;
  album: string;
  label: string;
  origin: string;
  is_dolby_content: boolean;
  "320kbps": string;
  encrypted_media_url: string;
  album_url: string;
  duration: string;
  rights: Rights;
  has_lyrics: string;
  lyrics_snippet: string;
  starred: string;
  copyright_text: string;
  artistMap: string | ArtistMapRequest;
  release_date?: string;
  triller_available: boolean;
  webp: string;
  lyrics_id?: string;
};

/*---------------------- Response ---------------------- */

export type SongResponse = {
  id: string;
  name?: string;
  subtitle: string;
  type: Type;
  url: string;
  image: Quality;
  language: string;
  year: number;
  playCount: number;
  explicit: boolean;
  listCount: number;
  listtype: Type;
  list: string;
  music: string;
  song?: string;
  albumId: string;
  album: string;
  label: string;
  origin: string;
  isDolbyContent: boolean;
  "320kbps": boolean;
  downloadUrl: Quality;
  albumUrl: string;
  duration: number;
  rights: Rights;
  hasLyrics: boolean;
  lyricsSnippet: string;
  starred: boolean;
  copyrightText: string;
  artistMap: ArtistMapResponse;
  releaseDate: string;
  trillerAvailable: boolean;
  lyricsId?: string;
};
