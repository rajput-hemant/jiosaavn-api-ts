import Crypto from "crypto-js";

import { Quality } from "../types/misc";
import { ArtistMiniRequest, ArtistMiniResponse } from "../types/artist";

/**
 * Utility function to create image links for different qualities
 *
 * @param link - Image link
 * @returns Image links for different qualities
 */
export function createImageLinks(link: string): Quality {
  const qualities = ["50x50", "150x150", "500x500"];

  for (const q of qualities) {
    if (link.includes(q)) {
      return qualities.map((quality) => ({
        quality,
        link: link.replace(q, quality),
      }));
    }
  }

  return link;
}

/**
 * Utility function to create download links for different qualities
 *
 * @param encryptedMediaUrl - Encrypted media url
 * @returns Download links for different qualities
 */
export function createDownloadLinks(encryptedMediaUrl: string): Quality {
  const qualities = [
    { id: "_12", bitrate: "12kbps" },
    { id: "_48", bitrate: "48kbps" },
    { id: "_96", bitrate: "96kbps" },
    { id: "_160", bitrate: "160kbps" },
    { id: "_320", bitrate: "320kbps" },
  ];

  const key = "38346591";

  const decrypted = Crypto.DES.decrypt(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { ciphertext: Crypto.enc.Base64.parse(encryptedMediaUrl) },
    Crypto.enc.Utf8.parse(key),
    { mode: Crypto.mode.ECB }
  );

  const decryptedLink = decrypted.toString(Crypto.enc.Utf8);

  for (const q of qualities) {
    if (decryptedLink.includes(q.id)) {
      return qualities.map(({ id, bitrate }) => ({
        quality: bitrate,
        link: decryptedLink.replace(q.id, id),
      }));
    }
  }

  return decryptedLink;
}

/**
 * Utility function to get the `token` from a link
 *
 * @param type - Type of the link
 * @param link - JioSaavn link
 * @returns Token from the link
 */
export function tokenFromLink(link: string) {
  return link.split("/").at(-1)!;
}

/**
 * Checks if the given url is a valid JioSaavn link
 *
 * @param url The url to check
 * @returns true if the url is valid
 */
export function isJioSaavnLink(url: string) {
  const regex =
    /^(https?:\/\/)?(www.)?jiosaavn\.com\/(song|shows|album|artist|featured|label|mix)\/(.+)$/;

  return regex.test(url);
}

/**
 * Utility function to parse a boolean value from a string
 *
 * @param value string to parse
 * @returns `true` | `false`
 */
export function parseBool(value: string | number) {
  return typeof value === "number" ? !!value : ["true", "1"].includes(value);
}

/**
 * Utility function to validate the `langs` query
 * @param langs `langs` query
 *
 * @returns Valid `langs` query
 */
export function validLangs(langs: string) {
  const validLangs = [
    "hindi",
    "english",
    "punjabi",
    "tamil",
    "telugu",
    "marathi",
    "gujarati",
    "bengali",
    "kannada",
    "bhojpuri",
    "malayalam",
    "urdu",
    "haryanvi",
    "rajasthani",
    "odia",
    "assamese",
  ];

  const filteredLangs = langs
    .split(",")
    .filter((l) => validLangs.includes(l.trim()))
    .join(",");

  return filteredLangs;
}

type A = Record<string, unknown>;

/**
 * Utility function to convert an object's keys to camelCase from snake_case **_Recursively_**
 *
 * @param obj Object to convert
 * @returns Object with camelCase keys
 */
export function toCamelCase<T>(obj: A | A[]): T {
  if (typeof obj !== "object" || obj === null) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as T;
  }

  const result: A = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      result[camelCaseKey] = toCamelCase(obj[key] as A);
    }
  }

  return result as T;
}

/**
 * Utility function to capitalize the first letter of a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type Artist = (ArtistMiniRequest | ArtistMiniResponse)[];

/**
 * Utility function to remove duplicate artists, and combine their roles
 * @param artists Array of artists
 * @returns Array of unique artists
 */
export function dedupArtists(artists: Artist) {
  const uniqueArtists: { [id: string]: ArtistMiniResponse } = {};

  artists.forEach((artist) => {
    if (uniqueArtists[artist.id]) {
      uniqueArtists[artist.id].role += `, ${capitalize(artist.role)}`;
    } else {
      uniqueArtists[artist.id] = {
        ...artist,
        url: "url" in artist ? artist.url : artist.perma_url,
        role: capitalize(artist.role),
      };
    }
  });

  return Object.values(uniqueArtists);
}
