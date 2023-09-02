import { createDownloadLinks, createImageLinks } from "../lib/utils";
import { SongRequest, SongResponse } from "../types/song";
import { artistMapPayload } from "./artist";

/**
 * Utility function to convert the song response to a more usable format
 *
 * @param song The song request object
 * @returns The song response object
 */
export function songPayload(s: SongRequest): SongResponse {
  const {
    id,
    title: name,
    subtitle,
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
      music,
      album_id,
      album,
      label,
      song,
      origin,
      is_dolby_content,
      "320kbps": _320kbps,
      encrypted_media_url,
      album_url,
      duration,
      rights,
      has_lyrics,
      lyrics_snippet,
      starred,
      artistMap,
      release_date,
      triller_available,
      copyright_text,
      lyrics_id,
    },
  } = s;

  return {
    id,
    name,
    subtitle,
    type,
    url,
    image: createImageLinks(image),
    language,
    year: +year,
    playCount: typeof play_count === "string" ? +play_count : play_count,
    explicit: !!explicit_content,
    listCount: +list_count,
    listtype: list_type,
    list,
    music,
    albumId: album_id,
    album,
    label,
    song,
    origin,
    isDolbyContent: is_dolby_content,
    "320kbps": !!_320kbps,
    downloadUrl: createDownloadLinks(encrypted_media_url),
    albumUrl: album_url,
    duration: +duration,
    rights,
    hasLyrics: !!has_lyrics,
    lyricsSnippet: lyrics_snippet,
    starred: !!starred,
    artistMap: artistMapPayload(artistMap),
    releaseDate: release_date ?? "",
    trillerAvailable: triller_available,
    copyrightText: copyright_text,
    lyricsId: lyrics_id,
  };
}
