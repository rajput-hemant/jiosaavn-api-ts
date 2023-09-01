import { Quality, Type } from "./misc";

export type ArtistMapRequest = {
  primary_artists: ArtistMiniRequest[];
  featured_artists: ArtistMiniRequest[];
  artists: ArtistMiniRequest[];
};

export type ArtistMiniRequest = {
  id: string;
  name: string;
  role: string;
  image: string;
  type: Type;
  perma_url: string;
};

/*---------------------- Response ---------------------- */

export type ArtistMapResponse = {
  primaryArtists: ArtistMiniResponse[];
  featuredArtists: ArtistMiniResponse[];
  artists: ArtistMiniResponse[];
};

export type ArtistMiniResponse = {
  id: string;
  name: string;
  role: string;
  image: Quality;
  type: Type;
  url: string;
};
