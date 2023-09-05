import Crypto from "crypto-js";

import { Quality } from "../types/misc";

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
export function createDownloadLinks(encryptedMediaUrl: string) {
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

  const links = qualities.map((q) => ({
    quality: q.bitrate,
    link: decryptedLink.replace("_96", q.id),
  }));

  return links;
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
    /^(https?:\/\/)?(www.)?jiosaavn\.com\/(song|shows|album|artist|featured)\/(.+)$/;

  return regex.test(url);
}

/**
 * Utility function to parse a boolean value from a string
 *
 * @param value string to parse
 * @returns `true` | `false`
 */
export function parseBool(value: string) {
  return ["true", "1"].includes(value);
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
    return obj;
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
