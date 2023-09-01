/**
 * Utility function to create image links for different qualities
 *
 * @param link - Image link
 * @returns Image links for different qualities
 */
export const createImageLinks = (link: string) => {
  return link.includes("150x150")
    ? ["50x50", "150x150", "500x500"].map((quality) => ({
        quality,
        link: link.replace("150x150", quality),
      }))
    : link;
};
