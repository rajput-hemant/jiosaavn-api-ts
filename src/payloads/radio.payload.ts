import { MiniResponse } from "../types/misc";
import { RadioSongRequest, RadioSongResponse } from "../types/radio";
import { SongResponse } from "../types/song";
import { songPayload } from "./song.payload";

export function radioSongsPayload(
  s: RadioSongRequest,
  mini: boolean = false
): RadioSongResponse {
  const station_id = s.stationid;
  const songs: (SongResponse | MiniResponse)[] = [];

  if (s.song) {
    return {
      station_id,
      songs: [songPayload(s.song, mini)],
    };
  }

  Object.keys(s).forEach((key) => {
    if (key === "stationid" || key === "error") return;
    songs.push(songPayload(s[key].song));
  });

  return { station_id, songs };
}
