import { AlbumRequest, AlbumResponse } from "./album";
import { MiniResponse, Quality, Type } from "./misc";
import { PlaylistRequest, PlaylistResponse } from "./playlist";
import { CustomResponse } from "./response";
import { SongRequest, SongResponse } from "./song";

/* -----------------------------------------------------------------------------------------------
 * Common
 * -----------------------------------------------------------------------------------------------*/

type A<T> = {
  count: number;
  last_page: boolean;
  data: T[];
};

type B = {
  id: string;
  title: string;
  action: string;
};

export type FooterDetails = {
  playlist: B[];
  artist: B[];
  album: B[];
  actor: B[];
};

export type Lyrics = {
  lyrics: string;
  script_tracking_url: string;
  lyrics_copyright: string;
  snippet: string;
};

/* -----------------------------------------------------------------------------------------------
 * Request
 * -----------------------------------------------------------------------------------------------*/

export type TrendingRequest = (AlbumRequest | SongRequest | PlaylistRequest)[];

export type FeaturedPlaylistsRequest = A<PlaylistRequest>;

export type ChartRequest = {
  id: string;
  title: string;
  subtitle?: string;
  type: "playlist";
  image: string;
  count?: number;
  language?: string;
  listname?: string;
  perma_url: string;
  explicit_content?: string;
  more_info?: Partial<{
    firstname: string;
    song_count: number;
  }>;
};

export type TopShowsRequest = A<TopShowRequest> & {
  trendingPodcasts: {
    items: {
      id: string;
      title: string;
      subtitle: string;
      type: "show";
      image: string;
      perma_url: string;
      explicit_content: string;
      more_info: { square_image: string };
    }[];
    module: {
      source: string;
      title: string;
      subtitle: string;
    };
  }[];
};

export type TopShowRequest = {
  id: string;
  title: string;
  subtitle: string;
  type: "show";
  image: string;
  perma_url: string;
  explicit_content: string;
  more_info: {
    season_number: string;
    release_date: string;
    year: string;
    badge: string;
    square_image: string;
  };
};

export type TopArtistRequest = {
  top_artists: {
    artistid: string;
    name: string;
    image: string;
    follower_count: number;
    is_followed: boolean;
    perma_url: string;
  }[];
};

export type TopAlbumRequest = A<SongRequest | AlbumRequest>;

export type RadioRequest = {
  explicit_content: string;
  id: string;
  image: string;
  perma_url: string;
  subtitle: string;
  title: string;
  type: "radio_station";
  more_info: {
    color?: string;
    description?: string;
    featured_station_type: Type;
    language: string;
    query?: string;
    station_display_text: string;
  };
};

export type MixRequest = {
  id: string;
  title: string;
  subtitle: string;
  header_desc: string;
  type: "mix";
  perma_url: string;
  image: string;
  language: string;
  year: string;
  play_count: string;
  explicit_content: string;
  list_count: string;
  list_type: string;
  list: SongRequest[];
  more_info: {
    uid: string;
    last_updated: string;
    username: string;
    firstname: string;
    lastname: string;
    is_followed: string;
    playlist_type: string;
    share: string;
  };
  modules: {
    list: {
      source: string;
      position: number;
      score: string;
      bucket: string;
      scroll_type: string;
      title: string;
      subtitle: string;
      highlight: string;
      simpleHeader: boolean;
      noHeader: boolean;
      view_more: unknown[];
    };
  };
};

export type LabelRequest = {
  labelId: string;
  name: string;
  image: string;
  topSongs: {
    songs: SongRequest[];
    total: number;
  };
  topAlbums: {
    albums: AlbumRequest[];
    total: number;
  };
  urls: {
    albums: string;
    songs: string;
  };
  availableLanguages: string[];
};

export type MegaMenuRequest = {
  mega_menu: {
    top_artists: MegaMenuItemRequest[];
    top_playlists: MegaMenuItemRequest[];
    new_releases: MegaMenuItemRequest[];
  };
};

export type MegaMenuItemRequest = {
  title: string;
  perma_url: string;
};

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/

export type TrendingResponse = (
  | AlbumResponse
  | SongResponse
  | PlaylistResponse
  | MiniResponse
)[];

export type FeaturedPlaylistsResponse = A<PlaylistResponse | MiniResponse>;

export type ChartResponse = {
  id: string;
  name: string;
  subtitle?: string;
  type: "playlist";
  image: Quality;
  url: string;
  explicit?: boolean;
  count?: number;
  first_name?: string;
  language?: string;
  listname?: string;
};

export type TopShowsResponse = A<TopShowResponse> & {
  trending_podcasts: {
    title: string;
    subtitle: string;
    source: string;
    data: {
      id: string;
      name: string;
      subtitle: string;
      type: "show";
      image: Quality;
      url: string;
      explicit: boolean;
    }[];
  };
};

export type TopShowResponse = {
  id: string;
  name: string;
  subtitle: string;
  type: "show";
  image: Quality;
  banner_image: Quality;
  url: string;
  explicit: boolean;
  season_number: number;
  release_date: string;
  badge: string;
};

export type TopArtistResponse = {
  id: string;
  name: string;
  image: Quality;
  url: string;
  follower_count: number;
  is_followed: boolean;
}[];

export type TopAlbumResponse = A<SongResponse | AlbumResponse | MiniResponse>;

export type RadioResponse = {
  id: string;
  name: string;
  subtitle: string;
  type: "radio_station";
  image: Quality;
  url: string;
  explicit: boolean;
  color?: string;
  description?: string;
  featured_station_type: Type;
  language: string;
  query?: string;
  station_display_text: string;
};

export type MixResponse = {
  id: string;
  name: string;
  subtitle: string;
  header_desc: string;
  type: "mix";
  url: string;
  image: Quality;
  language: string;
  year: number;
  play_count: number;
  explicit: boolean;
  list_count: number;
  list_type: string;
  songs: (SongResponse | MiniResponse)[];
  user_id: string;
  last_updated: string;
  username: string;
  firstname: string;
  lastname: string;
  is_followed: boolean;
  share: number;
  // modules: {
  //   list: {
  //     title: string;
  //     subtitle: string;
  //     source: string;
  //     position: number;
  //   };
  // };
};

export type LabelResponse = {
  id: string;
  name: string;
  image: Quality;
  type: "label";
  top_songs: {
    songs: (SongResponse | MiniResponse)[];
    total: number;
  };
  top_albums: {
    albums: (AlbumResponse | MiniResponse)[];
    total: number;
  };
  urls: {
    albums: string;
    songs: string;
  };
  available_languages: string[];
};

export type MegaMenuResponse = {
  top_artists: MegaMenuItemResponse[];
  top_playlists: MegaMenuItemResponse[];
  new_releases: MegaMenuItemResponse[];
};

export type MegaMenuItemResponse = {
  name: string;
  url: string;
};

/* -----------------------------------------------------------------------------------------------
 * Get Custom Response(s)
 * -----------------------------------------------------------------------------------------------*/

export type CGetTrendingResponse = CustomResponse<
  TrendingResponse | MiniResponse[]
>;

export type CGetXResponse = CustomResponse<
  | FeaturedPlaylistsResponse
  | ChartResponse[]
  | TopShowsResponse
  | TopArtistResponse
  | TopAlbumResponse
  | RadioResponse[]
>;

export type CGetFooterDetails = CustomResponse<FooterDetails>;

export type CGetLyricsResponse = CustomResponse<Lyrics>;

export type CGetMixResponse = CustomResponse<MixResponse>;

export type CGetLabelResponse = CustomResponse<LabelResponse>;

export type CGetMegaMenuResponse = CustomResponse<MegaMenuResponse>;
