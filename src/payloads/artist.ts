import { createImageLinks } from "../lib/utils";
import {
  ArtistMapRequest,
  ArtistMapResponse,
  ArtistMiniRequest,
  ArtistMiniResponse,
  ArtistPlaylistRequest,
  ArtistPlaylistResponse,
  ArtistRequest,
  ArtistResponse,
  ArtistSongRequest,
  ArtistSongResponse,
  ArtistSongsOrAlbumsRequest,
  ArtistSongsOrAlbumsResponse,
  SimilarArtistRequest,
  SimilarArtistResponse,
} from "../types/artist";
import { albumPayload } from "./album";
import { songPayload } from "./song";

export function artistPayload(a: ArtistRequest): ArtistResponse {
  const {
    artistId: id,
    availableLanguages,
    bio,
    dob,
    dominantLanguage,
    dominantType,
    fan_count,
    fb,
    follower_count,
    image,
    is_followed: isFollowed,
    isRadioPresent,
    isVerified,
    name,
    similarArtists,
    subtitle,
    topAlbums,
    topSongs,
    twitter,
    type,
    urls,
    wiki,
    modules,
    dedicated_artist_playlist,
    featured_artist_playlist,
    latest_release,
    singles,
  } = a;

  return {
    id,
    name,
    subtitle,
    image: createImageLinks(image),
    followerCount: +follower_count,
    type,
    isVerified,
    dominantLanguage,
    dominantType,
    topSongs: {
      title: modules.topSongs.title,
      subtitle: modules.topSongs.subtitle,
      data: topSongs.map(songPayload),
    },
    topAlbums: {
      title: modules.topAlbums.title,
      subtitle: modules.topAlbums.subtitle,
      data: topAlbums.map(albumPayload),
    },
    dedicatedArtistPlaylist: {
      title: modules.dedicated_artist_playlist?.title ?? "",
      subtitle: modules.dedicated_artist_playlist?.subtitle ?? "",
      data: dedicated_artist_playlist.map(artistPlaylistPayload),
    },
    featuredArtistPlaylist: {
      title: modules.featured_artist_playlist.title,
      subtitle: modules.featured_artist_playlist.subtitle,
      data: featured_artist_playlist.map(artistPlaylistPayload),
    },
    singles: {
      title: modules.singles.title,
      subtitle: modules.singles.subtitle,
      data: singles.map(artistSongPayload),
    },
    latestRelease: {
      title: modules.latest_release.title,
      subtitle: modules.latest_release.subtitle,
      data: latest_release.map(artistSongPayload),
    },
    similarArtists: {
      title: modules.similarArtists?.title ?? "",
      subtitle: modules.similarArtists?.subtitle ?? "",
      data: similarArtists.map(similarArtistPayload),
    },
    isRadioPresent,
    bio: JSON.parse(bio),
    dob,
    fb,
    twitter,
    wiki,
    urls,
    availableLanguages,
    fanCount: +fan_count,
    isFollowed,
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
    combine_artist_pages: combineArtistPages,
    dominantType,
    image_url,
    isRadioPresent,
    languages,
    perma_url: url,
    primary_artist_id: primaryArtistId,
    replace_with_primary_artists: replaceWithPrimaryArtists,
    search_keywords: searchKeywords,
    type,
  } = a;

  return {
    id,
    name,
    roles,
    aka,
    fb,
    twitter,
    wiki,
    similar,
    dob,
    combineArtistPages,
    dominantType,
    image: createImageLinks(image_url),
    isRadioPresent,
    languages,
    url,
    primaryArtistId,
    replaceWithPrimaryArtists,
    searchKeywords,
    type,
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
    title: name,
    type,
    year,
    more_info: { artistMap, query, song_count, text, music },
  } = a;

  return {
    id,
    name,
    url,
    type,
    image: createImageLinks(image),
    subtitle,
    language,
    year: +year,
    playCount: +play_count,
    explicit: explicit_content === "true",
    listCount: +list_count,
    listType: list_type,
    artistMap: artistMapPayload(artistMap),
    query,
    songCount: +song_count,
    text,
    music,
  };
}

export function artistTopSongsOrAlbumsPayload(
  a: ArtistSongsOrAlbumsRequest
): ArtistSongsOrAlbumsResponse {
  const {
    artistId: id,
    dominantLanguage,
    dominantType,
    follower_count,
    image,
    isVerified,
    name,
    type,
    topSongs,
    topAlbums,
  } = a;

  return {
    id,
    name,
    type,
    image: createImageLinks(image),
    followerCount: +follower_count,
    isVerified,
    dominantType,
    dominantLanguage,
    topSongs: topSongs
      ? {
          total: topSongs.total,
          last_page: topSongs.last_page,
          songs: topSongs.songs.map(songPayload),
        }
      : undefined,
    topAlbums: topAlbums
      ? {
          total: topAlbums.total,
          last_page: topAlbums.last_page,
          albums: topAlbums.albums.map(albumPayload),
        }
      : undefined,
  };
}

export function artistPlaylistPayload(
  p: ArtistPlaylistRequest
): ArtistPlaylistResponse {
  const {
    id,
    title: name,
    image,
    perma_url: url,
    type,
    explicit_content,
    subtitle,
    numsongs,
    more_info: {
      firstname,
      lastname,
      uid: userId,
      song_count,
      language,
      video_available,
      is_dolby_content,
      images,
      artist_name: artistName,
    },
  } = p;

  return {
    id,
    name,
    url,
    type,
    image: createImageLinks(image),
    explicit: !!explicit_content,
    subtitle,
    numsongs: +(numsongs ?? 0),
    firstname,
    lastname,
    userId,
    songCount: +song_count,
    language,
    videoAvailable: !!video_available,
    isDolbyContent: !!is_dolby_content,
    images,
    artistName,
  };
}

export function artistMapPayload(
  a: string | ArtistMapRequest
): ArtistMapResponse {
  return typeof a === "string"
    ? {
        artists: [],
        featuredArtists: [],
        primaryArtists: [],
      }
    : {
        artists: a.artists.map(artistMiniPayload),
        featuredArtists: a.featured_artists.map(artistMiniPayload),
        primaryArtists: a.primary_artists.map(artistMiniPayload),
      };
}

export function artistMiniPayload(a: ArtistMiniRequest): ArtistMiniResponse {
  const { id, image, name, perma_url: url, role, type } = a;
  return {
    id,
    name,
    url,
    role,
    type,
    image: createImageLinks(image),
  };
}
