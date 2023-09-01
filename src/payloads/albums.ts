import { AlbumRequest, AlbumResponse } from "../types/album";
import { createImageLinks } from "../utils";
import { artistMapPayload } from "./artist";
import { songPayload } from "./song";

/**
 * Utility function to convert the album response to a more usable format
 *
 * @param a The album request object
 * @returns The album response object
 */
export function albumPayload(a: AlbumRequest): AlbumResponse {
  const {
    id,
    title: name,
    type,
    subtitle,
    language,
    play_count,
    explicit_content,
    year,
    perma_url: url,
    image,
    more_info: {
      release_date,
      artistMap,
      song_count,
      is_dolby_content,
      copyright_text,
    },
    list,
  } = a;

  return {
    id,
    name,
    subtitle,
    type,
    language,
    playCount: +play_count,
    explicit: !!explicit_content,
    year: +year,
    url,
    image: createImageLinks(image),
    releaseDate: release_date,
    artistMap: artistMap ? artistMapPayload(artistMap) : undefined,
    songCount: +(song_count ?? 0),
    isDolbyContent: is_dolby_content,
    copyrightText: copyright_text,
    songs: typeof list === "string" ? [] : list.map(songPayload),
  };
}
