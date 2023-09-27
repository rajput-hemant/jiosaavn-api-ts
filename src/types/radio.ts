import { MiniResponse } from "./misc";
import { SongRequest, SongResponse } from "./song";

/* -----------------------------------------------------------------------------------------------
 * Request
 * -----------------------------------------------------------------------------------------------*/

export type RadioStationRequest = {
  error?: string | { code: string; msg: string };
  stationid: string;
};

export type RadioSongRequest = {
  error?: string;
  stationid: string;
  song?: SongRequest;
} & Record<string, { song: SongRequest }>;

/* -----------------------------------------------------------------------------------------------
 * Response
 * -----------------------------------------------------------------------------------------------*/

export type RadioStationResponse = {
  station_id: string;
};

export type RadioSongResponse = {
  station_id: string;
  songs: (SongResponse | MiniResponse)[];
};
