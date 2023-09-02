export const config = {
  baseURL: "https://www.jiosaavn.com/api.php",
  enableRateLimit: !!process.env.ENABLE_RATE_LIMIT ?? false,
  endpoint: {
    modules: "webapi.getLaunchData", // "content.getBrowseModules"
    song: {
      id: "song.getDetails",
      link: "webapi.get",
      recommended: "reco.getReco",
    },
    album: {
      id: "content.getAlbumDetails",
      link: "webapi.get",
      recommended: "reco.getAlbumReco",
    },
    playlist: {
      id: "playlist.getDetails",
    },
    artist: {
      id: "artist.getArtistPageDetails",
      link: "webapi.get",
      songs: "artist.getArtistMoreSong",
      albums: "artist.getArtistMoreAlbum",
      topSongs: "search.artistOtherTopSongs",
    },
    search: {
      topSearch: "content.getTopSearches",
      all: "autocomplete.get",
      songs: "search.getResults",
      albums: "search.getAlbumResults",
      artists: "search.getArtistResults",
      playlists: "search.getPlaylistResults",
    },
    radio: {
      featured: "webradio.createFeaturedStation",
      artist: "webradio.createArtistStation",
      entity: "webradio.createEntityStation",
      songs: "webradio.getSong",
    },
    lyrics: "lyrics.getLyrics",
  },
};
