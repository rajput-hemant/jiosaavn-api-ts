import { ArtistMapRequest, ArtistMapResponse } from "./artist";
import { Quality, Rights } from "./misc";

export type ShowRequest = {
  show_details: ShowDetailsRequest;
  seasons: SeasonRequest[];
  episodes: EpisodeDetailRequest[];
  modules: ShowModules;
};

export type ShowDetailsRequest = {
  id: string;
  title: string;
  subtitle: string;
  header_desc: string;
  type: "season";
  perma_url: string;
  image: string;
  language: string;
  year: string;
  play_count: string;
  explicit_content: string;
  list_count: string;
  list_type: string;
  list: string;
  more_info: {
    country_of_origin: string;
    description: string;
    disable_ads: string;
    is_disabled: string;
    label_id: string;
    latest_season_id: string;
    latest_season_sequence: string;
    parental_advisory: string;
    partner_id: string;
    partner_name: string;
    release_date: string;
    tags: string;
    followers_count: string;
    copyright_text: string;
    category_tags: string[];
    sub_category_tags: string[];
    m4a: string;
    artistMap: ArtistMapRequest;
    header_logo: string;
    header_color: string;
    header_image: string;
    label: string;
    sort_order: string;
    square_image: string;
    editors_note: {
      title: string;
      message: string;
      image: string;
      content: string[];
    };
    season_number: string;
    total_episodes: string;
    is_followed: string;
    fan_count: string;
  };
};

export type SeasonRequest = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  perma_url: string;
  explicit_content: string;
  more_info: {
    entity_title_exact_match: string;
    description: string;
    song_info: string;
    show_id: string;
    show_title: string;
    numEpisodes: string;
    encrypted_media_url: string;
    season_number: string;
    artistMap: ArtistMapRequest;
  };
};

type ShowModules = {
  seasons: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
  episodes: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
  show_details: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
  show_starring: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
};

export type EpisodeRequest = {
  episodes: EpisodeDetailRequest[];
  modules: EpisodeModules;
};

export type EpisodeDetailRequest = {
  id: string;
  title: string;
  subtitle: string;
  header_desc: string;
  type: "episode";
  perma_url: string;
  image: string;
  language: string;
  year: string;
  play_count: string;
  explicit_content: string;
  list_count: string;
  list_type: string;
  list: string;
  more_info: {
    release_date: string;
    release_time: string;
    label_id: string;
    duration: string;
    square_image_url: string;
    entity_title_exact_match: string;
    description: string;
    season_no: string;
    sequence_number: string;
    show_id: string;
    season_id: string;
    show_title: string;
    season_title: string;
    square_image: string;
    artistMap: ArtistMapRequest;
    episode_number: string;
    label: string;
    origin: string;
    ad_breaks: string;
    multi_br: string;
    rights: Rights;
    starred: string;
    cache_state: string;
    show_url: string;
    encrypted_media_url: string;
  };
};

type EpisodeModules = {
  episode_details: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
  episode_starring: {
    source: string;
    position: number;
    title: string;
    subtitle: string;
  };
};

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/
export type ShowRespone = {
  show_details: ShowDetailsResponse;
  seasons: SeasonResponse[];
  episodes: EpisodeDetailResponse[];
  modules: ShowModules;
};

export type ShowDetailsResponse = {
  id: string;
  name: string;
  subtitle: string;
  header_desc: string;
  type: "season";
  url: string;
  image: Quality;
  language: string;
  year: number;
  play_count: number;
  explicit: boolean;
  list_count: number;
  list_type: string;
  list: string;
  country_of_origin: string;
  description: string;
  label_id: string;
  latest_season_id: number;
  latest_season_sequence: number;
  parental_advisory: boolean;
  partner_id: number;
  partner_name: string;
  release_date: string;
  tags: string;
  followers_count: number;
  copyright_text: string;
  category_tags: string[];
  sub_category_tags: string[];
  artist_map: ArtistMapResponse;
  header_logo: string;
  header_color: string;
  header_image: string;
  label: string;
  sort_order: string;
  season_image: Quality;
  editors_note: {
    title: string;
    message: string;
    image: string;
    content: string[];
  };
  season_number: number;
  total_episodes: number;
  fan_count: number;
  is_followed: boolean;
};

export type SeasonResponse = {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  image: Quality;
  url: string;
  explicit: boolean;
  entity_title_exact_match: string;
  description: string;
  parental_advisory: boolean;
  show_id: string;
  show_title: string;
  episodes_count: number;
  download_url: Quality;
  season_number: number;
  artist_map: ArtistMapResponse;
};

export type EpisodeResponse = {
  episodes: EpisodeDetailResponse[];
  modules: EpisodeModules;
};

export type EpisodeDetailResponse = {
  id: string;
  name: string;
  subtitle: string;
  header_desc: string;
  type: "episode";
  url: string;
  image: Quality;
  language: string;
  year: number;
  play_count: number;
  explicit: boolean;
  list_count: number;
  list_type: string;
  list: string;
  release_date: string;
  label_id: string;
  duration: number;
  entity_title_exact_match: string;
  description: string;
  season_no: number;
  episode_number: number;
  show_id: string;
  season_id: string;
  show_title: string;
  season_title: string;
  artist_map: ArtistMapResponse;
  label: string;
  origin: string;
  rights: Rights;
  starred: boolean;
  show_url: string;
  download_url: Quality;
};
