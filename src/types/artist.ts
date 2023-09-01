import { CommonRequest, CommonResponse } from "./misc";

export type ArtistMapRequest = {
  primary_artists: ArtistMiniRequest[];
  featured_artists: ArtistMiniRequest[];
  artists: ArtistMiniRequest[];
};

export type ArtistMiniRequest = {
  name: string;
  role: string;
} & Omit<CommonRequest, "explicit_content" | "title" | "subtitle">;

/*---------------------- Response ---------------------- */

export type ArtistMapResponse = {
  primaryArtists: ArtistMiniResponse[];
  featuredArtists: ArtistMiniResponse[];
  artists: ArtistMiniResponse[];
};

export type ArtistMiniResponse = {
  role: string;
} & Omit<CommonResponse, "explicit" | "subtitle">;
