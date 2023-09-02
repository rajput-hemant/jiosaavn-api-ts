import Crypto from "crypto-js";

/**
 * Utility function to create image links for different qualities
 *
 * @param link - Image link
 * @returns Image links for different qualities
 */
export function createImageLinks(link: string) {
  return link.includes("150x150")
    ? ["50x50", "150x150", "500x500"].map((quality) => ({
        quality,
        link: link.replace("150x150", quality),
      }))
    : link;
}

/**
 * Utility function to create download links for different qualities
 *
 * @param encryptedMediaUrl - Encrypted media url
 * @returns Download links for different qualities
 */
export const createDownloadLinks = (encryptedMediaUrl: string) => {
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
};

/**
 * Utility function to get the `token` from a link
 *
 * @param type - Type of the link
 * @param link - JioSaavn link
 * @returns Token from the link
 */
export function tokenFromLink(type: string, link: string) {
  return link.split(`${type}/`).slice(1).join("/").split("/")[1];
}

/**
 * Checks if the given url is a valid JioSaavn link
 *
 * @param url The url to check
 * @returns true if the url is valid
 */
export const isJioSaavnLink = (url: string) => {
  const regex =
    /^(https?:\/\/)?(www.)?jiosaavn\.com\/(song|shows|album|artist|featured)\/(.+)$/;

  return regex.test(url);
};
