import { decode } from "entities";

import { createImageLinks, parseBool } from "../lib/utils";
import {
  AlbumSearchRequest,
  AlbumSearchResponse,
  AllSearchRequest,
  AllSearchResponse,
  ArtistSearchRequest,
  ArtistSearchResponse,
  PlaylistSearchRequest,
  PlaylistSearchResponse,
  PodcastSearchRequest,
  PodcastSearchResposne,
  SongSearchRequest,
  SongSearchResponse,
  TopSearchRequest,
  TopSearchResponse,
} from "../types/search";
import { albumPayload } from "./album.payload";
import { artistMapPayload, artistMiniPayload } from "./artist.payload";
import { miniPayload } from "./misc.payload";
import { playlistPayload } from "./playlist.payload";
import { songPayload } from "./song.payload";

export function topSearchesPayload(s: TopSearchRequest): TopSearchResponse {
  const {
    id,
    title,
    subtitle,
    type,
    perma_url: url,
    image,
    explicit_content,
    more_info: { album, artistMap },
  } = s;

  return {
    id,
    name: decode(title),
    subtitle: decode(subtitle),
    type,
    url,
    image: createImageLinks(image),
    explicit: parseBool(explicit_content),
    album,
    artist_map: artistMap.map(artistMapPayload),
  };
}

export function allSearchPayload(s: AllSearchRequest): AllSearchResponse {
  const {
    albums: al,
    artists: ar,
    episodes: ep,
    playlists: pl,
    shows: sh,
    songs: so,
    topquery: tq,
  } = s;

  return {
    albums: {
      position: al.position,
      data: al.data.map((a) => {
        const {
          id,
          title,
          type,
          image,
          url,
          description: subtitle,
          ctr,
          music,
          position,
          more_info: { is_movie, language, song_pids, year },
        } = a;

        return {
          id,
          name: decode(title),
          subtitle,
          type,
          image: createImageLinks(image),
          url,
          ctr,
          is_movie: parseBool(is_movie),
          language,
          music,
          song_pids,
          year: +year,
          position,
        };
      }),
    },

    songs: {
      position: so.position,
      data: so.data.map((s) => {
        const {
          id,
          title,
          type,
          image,
          url,
          description,
          album,
          ctr,
          position,
          more_info,
        } = s;

        const { language, primary_artists, singers, triller_available } =
          more_info!;

        return {
          id,
          name: decode(title),
          subtitle: decode(description),
          type,
          image: createImageLinks(image),
          description,
          url,
          album,
          ctr,
          language,
          primary_artists,
          singers,
          triller_available,
          position,
        };
      }),
    },

    playlists: {
      position: pl.position,
      data: pl.data.map((p) => {
        const {
          id,
          title,
          type,
          image,
          description,
          url,
          language,
          extra,
          position,
          more_info,
        } = p;

        const playlist = {
          id,
          name: decode(title),
          subtitle: decode(description),
          type,
          image: createImageLinks(image),
          url,
          description,
          language,
          extra,
          position,
        };

        if (!more_info) {
          return playlist;
        }

        const {
          artist_name,
          entity_sub_type,
          entity_type,
          firstname,
          is_dolby_content,
          lastname,
          sub_types,
          video_available,
        } = more_info;

        return {
          ...playlist,
          artist_name: decode(artist_name),
          description,
          entity_sub_type,
          entity_type,
          firstname,
          is_dolby_content,
          language,
          lastname,
          sub_types,
          video_available,
        };
      }),
    },

    artists: {
      position: ar.position,
      data: ar.data.map((a) => {
        const {
          id,
          title,
          url,
          type,
          image,
          description,
          ctr,
          entity,
          extra,
          position,
        } = a;

        return {
          id,
          name: decode(title),
          subtitle: decode(description),
          type,
          url,
          image: createImageLinks(image),
          description,
          ctr,
          entity,
          extra,
          position,
        };
      }),
    },

    top_query: {
      position: tq.position,
      data: tq.data.map((t) => {
        const {
          id,
          title,
          type,
          image,
          description,
          url,
          album,
          ctr,
          position,
          more_info,
        } = t;

        if (!more_info) {
          return {
            id,
            name: decode(title),
            subtitle: decode(description),
            type,
            image: createImageLinks(image),
            description,
            url,
            album,
            ctr,
            position,
          };
        }

        const { primary_artists, singers, triller_available, language } =
          more_info;

        return {
          id,
          name: decode(title),
          subtitle: decode(description),
          type,
          image: createImageLinks(image),
          description,
          url,
          language,
          primary_artists,
          singers,
          triller_available,
          album,
          ctr,
          position,
        };
      }),
    },

    shows: {
      position: sh.position,
      data: sh.data.map((s) => {
        const {
          id,
          title,
          type,
          image,
          description,
          url,
          position,
          season_number,
        } = s;

        return {
          id,
          name: decode(title),
          subtitle: decode(description),
          type,
          image: createImageLinks(image),
          description,
          url,
          position,
          season_number,
        };
      }),
    },

    episodes: { position: ep.position, data: ep.data },
  };
}

export function songSearchPayload(
  s: SongSearchRequest,
  mini: boolean = false
): SongSearchResponse {
  const { total, start, results } = s;

  return { total, start, results: results.map((s) => songPayload(s, mini)) };
}

export function albumSearchPayload(
  a: AlbumSearchRequest,
  mini: boolean = false
): AlbumSearchResponse {
  const { total, start, results } = a;

  return {
    total,
    start,
    results: results.map((a) => (mini ? miniPayload(a) : albumPayload(a))),
  };
}

export function playlistSearchPayload(
  s: PlaylistSearchRequest,
  mini: boolean = false
): PlaylistSearchResponse {
  const { total, start, results } = s;

  return {
    total,
    start,
    results: results.map((p) => (mini ? miniPayload(p) : playlistPayload(p))),
  };
}

export function artistSearchPayload(
  a: ArtistSearchRequest
): ArtistSearchResponse {
  const { total, start, results } = a;

  return {
    total,
    start,
    results: results.map((a) => {
      const {
        id,
        name,
        ctr,
        entity,
        image,
        role,
        perma_url: url,
        type,
        isRadioPresent: is_radio_present,
        is_followed,
      } = a;

      return {
        id,
        name: decode(name),
        type,
        role,
        url,
        image: createImageLinks(image),
        ctr,
        entity,
        is_followed,
        is_radio_present,
      };
    }),
  };
}

export function podcastsSearchPayload(
  p: PodcastSearchRequest
): PodcastSearchResposne {
  const { start, total, results } = p;

  return {
    start,
    total,
    results: results.map((p) => {
      const {
        id,
        title: name,
        subtitle,
        perma_url: url,
        type,
        image_file_url,
        partner_name,
        label_name,
        explicit_content,
        artists,
        featured_artists,
        primary_artists,
        latest_season_sequence: season,
      } = p;

      return {
        id,
        name,
        subtitle,
        type,
        image: createImageLinks(image_file_url),
        url,
        explicit: parseBool(`${explicit_content}`),
        partner_name: decode(partner_name),
        label_name: decode(label_name),
        artists: artists.map(artistMiniPayload),
        featured_artists: featured_artists.map(artistMiniPayload),
        primary_artists: primary_artists.map(artistMiniPayload),
        season,
      };
    }),
  };
}
