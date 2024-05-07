import { decode } from "entities";

import { createDownloadLinks, createImageLinks, parseBool } from "../lib/utils";
import {
  EpisodeDetailRequest,
  EpisodeDetailResponse,
  EpisodeRequest,
  EpisodeResponse,
  SeasonRequest,
  SeasonResponse,
  ShowDetailsRequest,
  ShowDetailsResponse,
  ShowRequest,
  ShowRespone,
} from "../types/show";
import { artistMapPayload } from "./artist.payload";

export function showsPayload(s: ShowRequest): ShowRespone {
  const {
    show_details,
    seasons,
    episodes,
    modules: {
      episodes: e,
      seasons: se,
      show_details: s_d,
      show_starring: s_s,
    },
  } = s;

  return {
    show_details: showDetailsPayload(show_details),
    seasons: seasons.map(seasonPayload),
    episodes: episodes.map(episodeDetailPayload),
    modules: {
      seasons: {
        title: se.title,
        source: "seasons",
        position: se.position,
        subtitle: se.subtitle,
      },
      episodes: {
        title: `Season ${show_details.more_info.season_number} Episodes`,
        source: "episodes",
        position: e.position,
        subtitle: e.subtitle,
      },
      show_details: {
        title: s_d.title,
        source: "show_details|showDetails > description",
        position: s_d.position,
        subtitle: s_d.subtitle,
      },
      show_starring: {
        title: s_s.title,
        source: "N/A",
        position: s_s.position,
        subtitle: s_s.subtitle,
      },
    },
  };
}

function showDetailsPayload(s: ShowDetailsRequest): ShowDetailsResponse {
  const {
    id,
    title,
    subtitle,
    header_desc,
    type,
    perma_url: url,
    image,
    language,
    year,
    play_count,
    explicit_content,
    list_count,
    list_type,
    list,
    more_info: {
      country_of_origin,
      description,
      label_id,
      latest_season_id,
      latest_season_sequence,
      parental_advisory,
      partner_id,
      partner_name,
      release_date,
      tags,
      followers_count,
      copyright_text,
      category_tags,
      sub_category_tags,
      artistMap,
      header_logo,
      header_color,
      header_image,
      label,
      sort_order,
      square_image,
      editors_note,
      season_number,
      total_episodes,
      is_followed,
      fan_count,
    },
  } = s;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    header_desc: decode(header_desc),
    type,
    url,
    image: createImageLinks(square_image),
    language,
    year: +year,
    play_count: +play_count,
    explicit: parseBool(explicit_content),
    list_count: +list_count,
    list_type,
    list,
    country_of_origin,
    description,
    label_id,
    latest_season_id: +latest_season_id,
    latest_season_sequence: +latest_season_sequence,
    parental_advisory: parseBool(parental_advisory),
    partner_id: +partner_id,
    partner_name: decode(partner_name),
    release_date: new Date(release_date).toISOString(),
    tags,
    followers_count: +followers_count,
    copyright_text,
    category_tags,
    sub_category_tags,
    artist_map: artistMapPayload(artistMap),
    header_logo,
    header_color,
    header_image,
    label,
    sort_order,
    season_image: createImageLinks(image),
    editors_note,
    season_number: +season_number,
    total_episodes: +total_episodes,
    is_followed: parseBool(is_followed),
    fan_count: +fan_count,
  };
}

function seasonPayload(s: SeasonRequest): SeasonResponse {
  const {
    id,
    title,
    subtitle,
    type,
    image,
    perma_url,
    explicit_content,
    more_info: {
      entity_title_exact_match,
      description,
      song_info,
      show_id,
      show_title,
      numEpisodes,
      encrypted_media_url,
      season_number,
      artistMap,
    },
  } = s;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    image: createImageLinks(image),
    url: perma_url,
    explicit: parseBool(explicit_content),
    entity_title_exact_match,
    description,
    parental_advisory: parseBool(
      (JSON.parse(song_info || "{}") as { parental_advisory: string })
        .parental_advisory
    ),
    show_id,
    show_title: decode(show_title),
    episodes_count: +numEpisodes,
    download_url: createDownloadLinks(encrypted_media_url),
    season_number: +season_number,
    artist_map: artistMapPayload(artistMap),
  };
}

export function episodePayload(e: EpisodeRequest): EpisodeResponse {
  const {
    episodes,
    modules: { episode_details: e_d, episode_starring: e_s },
  } = e;

  return {
    episodes: episodes.map(episodeDetailPayload),
    modules: {
      episode_details: {
        title: e_d.title,
        source: "episodes > $ > description",
        position: e_d.position,
        subtitle: e_d.subtitle,
      },

      episode_starring: {
        title: e_s.title,
        source: "N/A",
        position: e_s.position,
        subtitle: e_s.subtitle,
      },
    },
  };
}

export function episodeDetailPayload(
  e: EpisodeDetailRequest
): EpisodeDetailResponse {
  const {
    id,
    title,
    subtitle,
    header_desc,
    type,
    perma_url: url,
    image,
    language,
    year,
    play_count,
    explicit_content,
    list_count,
    list_type,
    list,
    more_info: {
      release_time,
      label_id,
      duration,
      entity_title_exact_match,
      description,
      season_no,
      show_id,
      season_id,
      show_title,
      season_title,
      artistMap,
      episode_number,
      label,
      origin,
      rights,
      starred,
      show_url,
      encrypted_media_url,
    },
  } = e;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    header_desc: decode(header_desc),
    type,
    url,
    image: createImageLinks(image),
    language,
    year: +year,
    play_count: +play_count,
    explicit: parseBool(explicit_content),
    list_count: +list_count,
    list_type,
    list,
    release_date: new Date(release_time).toISOString(),
    label_id,
    label: decode(label),
    duration: +duration,
    entity_title_exact_match,
    description,
    season_no: +season_no,
    episode_number: +episode_number,
    show_id,
    show_title: decode(show_title),
    season_id,
    season_title,
    artist_map: artistMapPayload(artistMap),
    origin,
    rights,
    starred: parseBool(starred),
    show_url,
    download_url: createDownloadLinks(encrypted_media_url),
  };
}
