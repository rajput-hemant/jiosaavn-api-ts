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
    title: name,
    subtitle,
    type,
    perma_url: url,
    image,
    explicit_content,
    more_info: { album, artistMap },
  } = s;

  return {
    id,
    name,
    subtitle,
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
          title: name,
          subtitle,
          type,
          image,
          description,
          perma_url: url,
          explicit_content,
          more_info: { ctr, is_movie, language, music, song_pids, year },
        } = a;

        return {
          id,
          name,
          subtitle,
          type,
          image: createImageLinks(image),
          description,
          url,
          explicit: parseBool(explicit_content),
          ctr,
          is_movie: parseBool(is_movie),
          language,
          music,
          song_pids,
          year: +year,
        };
      }),
    },

    songs: {
      position: so.position,
      data: so.data.map((s) => {
        const {
          id,
          title: name,
          subtitle,
          type,
          image,
          description,
          perma_url: url,
          explicit_content,
          more_info: {
            album,
            ctr,
            language,
            primary_artists,
            score,
            singers,
            triller_available,
            vcode,
            vlink,
          },
        } = s;

        return {
          id,
          name,
          subtitle,
          type,
          image: createImageLinks(image),
          description,
          url,
          album,
          ctr,
          explicit: parseBool(explicit_content),
          language,
          primary_artists,
          score: +score,
          singers,
          triller_available,
          vcode,
          vlink,
        };
      }),
    },

    playlists: {
      position: pl.position,
      data: pl.data.map((p) => {
        const {
          id,
          title: name,
          subtitle,
          type,
          image,
          description,
          perma_url: url,
          explicit_content,
          more_info: {
            artist_name,
            entity_sub_type,
            entity_type,
            firstname,
            is_dolby_content,
            language,
            lastname,
            sub_types,
            video_available,
          },
        } = p;

        return {
          id,
          name,
          subtitle,
          type,
          image: createImageLinks(image),
          url,
          explicit: parseBool(explicit_content),
          artist_name,
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
          title: name,
          type,
          image,
          description,
          ctr,
          entity,
          extra,
          isRadioPresent,
          position,
        } = a;

        return {
          id,
          name,
          type,
          image: createImageLinks(image),
          description,
          ctr,
          entity,
          extra,
          isRadioPresent,
          position,
        };
      }),
    },

    top_query: {
      position: tq.position,
      data: tq.data.map((t) => {
        const {
          id,
          title: name,
          subtitle,
          type,
          image,
          description,
          perma_url: url,
          explicit_content,
          more_info: {
            album,
            ctr,
            language,
            primary_artists,
            score,
            singers,
            triller_available,
            vcode,
            vlink,
          },
        } = t;

        return {
          id,
          name,
          subtitle,
          type,
          image: createImageLinks(image),
          description,
          url,
          album,
          ctr,
          explicit: parseBool(explicit_content),
          language,
          primary_artists,
          score: +score,
          singers,
          triller_available,
          vcode,
          vlink,
        };
      }),
    },

    shows: {
      position: sh.position,
      data: sh.data.map((s) => {
        const {
          id,
          title: name,
          subtitle,
          type,
          image,
          description,
          perma_url: url,
          explicit_content,
          more_info: { season_number },
        } = s;

        return {
          id,
          name,
          subtitle,
          type,
          image: createImageLinks(image),
          description,
          url,
          explicit: parseBool(explicit_content),
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
        name,
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
        partner_name,
        label_name,
        artists: artists.map(artistMiniPayload),
        featured_artists: featured_artists.map(artistMiniPayload),
        primary_artists: primary_artists.map(artistMiniPayload),
        season,
      };
    }),
  };
}
