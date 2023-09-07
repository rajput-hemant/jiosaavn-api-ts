import { RadioSongRequest, RadioSongResponse } from "../types/radio";
import { SongResponse } from "../types/song";
import { songPayload } from "./song.payload";

export function radioSongsPayload(s: RadioSongRequest): RadioSongResponse {
  const station_id = s.stationid;
  const songs: SongResponse[] = [];

  if (s.song) {
    return { station_id, songs: [songPayload(s.song)] };
  }

  Object.keys(s).forEach((key) => {
    if (key === "stationid" || key === "error") return;
    songs.push(songPayload(s[key].song));
  });

  return { station_id, songs };
}
