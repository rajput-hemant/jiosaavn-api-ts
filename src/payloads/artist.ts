import { createImageLinks } from "../lib/utils";
import {
  ArtistMapRequest,
  ArtistMapResponse,
  ArtistMiniRequest,
  ArtistMiniResponse,
} from "../types/artist";

/**
 * Utility function to convert the artist map response to a more usable format
 *
 * @param a The artist map request object
 * @returns The artist map response object
 */
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
