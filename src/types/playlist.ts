import { ArtistMiniRequest, ArtistMiniResponse } from "./artist";
import { MiniResponse, Quality } from "./misc";
import { CustomResponse } from "./response";
import { SongRequest, SongResponse } from "./song";

/* -----------------------------------------------------------------------------------------------
 * Request
 * -----------------------------------------------------------------------------------------------*/

export type PlaylistRequest = {
  id: string;
  title: string;
  subtitle: string;
  header_desc?: string;
  type: "playlist";
  perma_url: string;
  image: string;
  language: string;
  year?: string;
  play_count?: string;
  explicit_content: string;
  list_count?: string;
  list_type: string;
  list?: string | SongRequest[];
  more_info: {
    uid: string;
    is_dolby_content: boolean;
    last_updated?: string;
    username: string;
    firstname: string;
    lastname: string;
    follower_count?: string;
    fan_count?: string;
    playlist_type: string;
    share?: string;
    video_count?: string;
    artists?: ArtistMiniRequest[];
    subtitle_desc: string[];
  };
  modules?: PlaylistModulesRequest;
};

export type PlaylistModulesRequest = {
  relatedPlaylist: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    source_params: { listid: string };
  };
  currentlyTrendingPlaylists: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    source_params: { entity_type: string; entity_language: string };
  };
  artists: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
};

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/

export type PlaylistResponse = {
  id: string;
  name: string;
  subtitle: string;
  header_desc?: string;
  type: "playlist";
  url: string;
  image: Quality;
  language: string;
  year?: number;
  play_count?: number;
  explicit: boolean;
  list_count?: number;
  list_type: string;
  user_id: string;
  is_dolby_content: boolean;
  last_updated?: string;
  username: string;
  firstname: string;
  lastname: string;
  follower_count?: number;
  fan_count?: number;
  share?: number;
  video_count?: number;
  artists?: ArtistMiniResponse[];
  subtitle_desc: string[];
  songs?: (SongResponse | MiniResponse)[];
  modules?: PlaylistModulesResponse;
};

export type PlaylistModulesResponse = {
  related_playlist: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    params: { id: string };
  };
  currently_trending_playlists: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
    params: { type: string; lang: string };
  };
  artists: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
};

/* -----------------------------------------------------------------------------------------------
 * Playlist Custom Response(s)
 * -----------------------------------------------------------------------------------------------*/
export type CPlaylistResponse = CustomResponse<PlaylistResponse>;

export type CPlaylistsResponse = CustomResponse<PlaylistResponse[]>;
