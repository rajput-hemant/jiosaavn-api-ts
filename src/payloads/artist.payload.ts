import { decode } from "entities";

import { createImageLinks, dedupArtists } from "../lib/utils";
import {
  ArtistMapRequest,
  ArtistMapResponse,
  ArtistMiniRequest,
  ArtistMiniResponse,
  ArtistRequest,
  ArtistResponse,
  ArtistSongRequest,
  ArtistSongResponse,
  ArtistSongsOrAlbumsRequest,
  ArtistSongsOrAlbumsResponse,
  SimilarArtistRequest,
  SimilarArtistResponse,
} from "../types/artist";
import { albumPayload } from "./album.payload";
import { miniPayload } from "./misc.payload";
import { playlistPayload } from "./playlist.payload";
import { songPayload } from "./song.payload";

export function artistPayload(
  a: ArtistRequest,
  mini: boolean = false
): ArtistResponse {
  const {
    artistId: id,
    availableLanguages: available_languages,
    bio,
    dob,
    dominantLanguage: dominant_language,
    dominantType: dominant_type,
    fan_count,
    fb,
    follower_count,
    image,
    is_followed,
    isRadioPresent: is_radio_present,
    isVerified: is_verified,
    name,
    similarArtists,
    subtitle,
    topAlbums,
    topSongs,
    twitter,
    type,
    urls,
    wiki,
    dedicated_artist_playlist,
    featured_artist_playlist,
    latest_release,
    singles,
    modules: {
      topSongs: t_s,
      topAlbums: t_a,
      latest_release: l,
      featured_artist_playlist: f,
      dedicated_artist_playlist: d,
      similarArtists: s_a,
      singles: s,
    },
  } = a;

  return {
    id,
    name: decode(name),
    subtitle: decode(subtitle),
    image: createImageLinks(image),
    follower_count: +follower_count,
    type,
    is_verified,
    dominant_language,
    dominant_type,
    top_songs: topSongs?.map((s) => songPayload(s, mini)) ?? [],
    top_albums:
      topAlbums?.map((a) => (mini ? miniPayload(a) : albumPayload(a))) ?? [],
    dedicated_artist_playlist:
      dedicated_artist_playlist?.map((p) =>
        mini ? miniPayload(p) : playlistPayload(p)
      ) ?? [],
    featured_artist_playlist:
      featured_artist_playlist?.map((p) =>
        mini ? miniPayload(p) : playlistPayload(p)
      ) ?? [],
    singles: singles?.map(artistSongPayload) ?? [],
    latest_release: latest_release?.map(artistSongPayload) ?? [],
    similar_artists: similarArtists.map(similarArtistPayload),
    is_radio_present,
    bio: JSON.parse(bio || "[]") as ArtistResponse["bio"],
    dob,
    fb,
    twitter,
    wiki,
    urls,
    available_languages,
    fan_count: +fan_count,
    is_followed,
    modules: {
      top_songs: {
        title: t_s?.title ?? "",
        subtitle: t_s?.subtitle ?? "",
        position: t_s?.position ?? 0,
        source: "/artist/top-songs",
      },
      latest_release: {
        title: l?.title ?? "",
        subtitle: l?.subtitle ?? "",
        position: l?.position ?? 0,
        source: "latest_release|latestRelease",
      },
      top_albums: {
        title: t_a?.title ?? "",
        subtitle: t_a?.subtitle ?? "",
        position: t_a?.position ?? 0,
        source: "top_albums|topAlbums",
      },
      singles: {
        title: s?.title ?? "",
        subtitle: s?.subtitle ?? "",
        position: s?.position ?? 0,
        source: "singles",
      },
      featured_artist_playlist: {
        title: f?.title ?? "",
        subtitle: f?.subtitle ?? "",
        position: f?.position ?? 0,
        source: "featured_artist_playlist|featuredArtistPlaylist",
      },
      dedicated_artist_playlist: {
        title: d?.title ?? "",
        subtitle: d?.subtitle ?? "",
        position: d?.position ?? 0,
        source: "dedicated_artist_playlist|dedicatedArtistPlaylist",
      },
      similar_artists: {
        title: s_a?.title ?? "",
        subtitle: s_a?.subtitle ?? "",
        position: s_a?.position ?? 0,
        source: "similar_artists|similarArtists",
      },
    },
  };
}

export function similarArtistPayload(
  a: SimilarArtistRequest
): SimilarArtistResponse {
  const {
    id,
    name,
    roles,
    aka,
    fb,
    twitter,
    wiki,
    similar,
    dob,
    dominantType: dominant_type,
    image_url,
    isRadioPresent: is_radio_present,
    languages,
    perma_url: url,
    primary_artist_id,
    search_keywords,
    type,
  } = a;

  return {
    id,
    name: decode(name),
    roles: JSON.parse(roles || "{}") as SimilarArtistResponse["roles"],
    aka,
    fb,
    twitter,
    wiki,
    similar: JSON.parse(similar || "[]") as SimilarArtistResponse["similar"],
    dob,
    image: createImageLinks(image_url),
    search_keywords,
    primary_artist_id,
    languages: JSON.parse(
      languages || "{}"
    ) as SimilarArtistResponse["languages"],
    url,
    type,
    is_radio_present,
    dominant_type,
  };
}

export function artistSongPayload(a: ArtistSongRequest): ArtistSongResponse {
  const {
    explicit_content,
    id,
    image,
    language,
    list_count,
    list_type,
    perma_url: url,
    play_count,
    subtitle,
    title,
    type,
    year,
    more_info: { artistMap, query, song_count, text, music },
  } = a;

  return {
    id,
    name: decode(title),
    url,
    type,
    image: createImageLinks(image),
    subtitle: decode(subtitle),
    language,
    year: +year,
    play_count: +play_count,
    explicit: explicit_content === "true",
    list_count: +list_count,
    list_type,
    artist_map: artistMapPayload(artistMap),
    query,
    song_count: +song_count,
    text,
    music,
  };
}

export function artistTopSongsOrAlbumsPayload(
  a: ArtistSongsOrAlbumsRequest,
  mini: boolean = false
): ArtistSongsOrAlbumsResponse {
  const {
    artistId: id,
    dominantLanguage: dominant_language,
    dominantType: dominant_type,
    follower_count,
    image,
    isVerified: is_verified,
    name,
    type,
    topSongs,
    topAlbums,
  } = a;

  return {
    id,
    name: decode(name),
    type,
    image: createImageLinks(image),
    follower_count: +follower_count,
    is_verified,
    dominant_type,
    dominant_language,
    top_songs: topSongs
      ? {
          total: topSongs.total,
          last_page: topSongs.last_page,
          songs: topSongs.songs.map((s) => songPayload(s, mini)),
        }
      : undefined,
    top_albums: topAlbums
      ? {
          total: topAlbums.total,
          last_page: topAlbums.last_page,
          albums: topAlbums.albums.map((a) =>
            mini ? miniPayload(a) : albumPayload(a)
          ),
        }
      : undefined,
  };
}

export function artistMapPayload(
  a: string | ArtistMapRequest
): ArtistMapResponse {
  return typeof a === "string"
    ? {
        artists: [],
        featured_artists: [],
        primary_artists: [],
      }
    : {
        artists: dedupArtists(a.artists?.map(artistMiniPayload) ?? []),
        featured_artists: dedupArtists(
          a.featured_artists?.map(artistMiniPayload) ?? []
        ),
        primary_artists: dedupArtists(a.primary_artists.map(artistMiniPayload)),
      };
}

export function artistMiniPayload(a: ArtistMiniRequest): ArtistMiniResponse {
  const { id, image, name, perma_url: url, role, type } = a;
  return {
    id,
    name: decode(name),
    url,
    role,
    type,
    image: createImageLinks(image),
  };
}
