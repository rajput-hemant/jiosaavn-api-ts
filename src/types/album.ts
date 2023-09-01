import { ArtistMapRequest, ArtistMapResponse } from "./artist";
import { Quality, Rights, Type } from "./misc";
import { SongRequest, SongResponse } from "./song";

export type AlbumRequest = {
  id: string;
  title: string;
  subtitle: string;
  type: Type;
  perma_url: string;
  language: string;
  year: string;
  play_count: string;
  explicit_content: string;
  list_count: string;
  list_type: Type;
  more_info: AlbumRequestMoreInfo;
  image: string;
  list: string | SongRequest[];
};

export type AlbumRequestMoreInfo = Partial<{
  release_date: string;
  artistMap: string | ArtistMapRequest;
  song_count: string;
  copyright_text: string;
  is_dolby_content: boolean;
  "320kbps": string;
  album: string;
  album_id: string;
  album_url: string;
  duration: string;
  encrypted_media_url: string;
  has_lyrics: string;
  label: string;
  label_url: string;
  lyrics_snippet: string;
  music: string;
  origin: string;
  rights: Rights;
}>;

/*---------------------- Response ---------------------- */

export type AlbumResponse = {
  id: string;
  name: string;
  subtitle: string;
  type: Type;
  language: string;
  playCount: number;
  explicit: boolean;
  year: number;
  url: string;
  image: Quality;
  releaseDate?: string;
  artistMap?: ArtistMapResponse;
  songCount?: number;
  copyrightText?: string;
  isDolbyContent?: boolean;
  songs: SongResponse[];
};
