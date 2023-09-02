import { ArtistMiniRequest, ArtistMiniResponse } from "./artist";
import { Quality } from "./misc";
import { SongRequest, SongResponse } from "./song";

export type PlaylistRequest = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  perma_url: string;
  image: string;
  language: string;
  year: string;
  play_count: string;
  explicit_content: string;
  list_count: string;
  list_type: string;
  list: string | SongRequest[];
  more_info: PlaylistRequestMoreInfo;
};

export type PlaylistRequestMoreInfo = {
  uid: string;
  is_dolby_content: boolean;
  last_updated: string;
  username: string;
  firstname: string;
  lastname: string;
  follower_count: string;
  fan_count: string;
  playlist_type: string;
  share: string;
  video_count: string;
  artists: ArtistMiniRequest[];
  subtitle_desc: string[];
};

/*---------------------- Response ---------------------- */

export type PlaylistResponse = {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  url: string;
  image: Quality;
  language: string;
  year: number;
  playCount: number;
  explicit: boolean;
  listCount: number;
  listType: string;
  userId: string;
  isDolbyContent: boolean;
  lastUpdated: number;
  username: string;
  firstname: string;
  lastname: string;
  followerCount: number;
  fanCount: number;
  share: number;
  videoCount: number;
  artists: ArtistMiniResponse[];
  subtitleDesc: string[];
  songs: SongResponse[];
};
