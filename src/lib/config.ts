export const config = {
  urls: {
    baseUrl: "https://www.jiosaavn.com/api.php",
    docsUrl: "https://docs-jiosaavn.netlify.app",
    siteUrl: "https://jiosaavn-api-ts.vercel.app",
  },

  enableRateLimit: process.env.ENABLE_RATE_LIMIT === "true" ?? false,

  endpoint: {
    modules: {
      launch_data: "webapi.getLaunchData",
      browse_modules: "content.getBrowseModules",
    },

    song: {
      id: "song.getDetails",
      link: "webapi.get",
      recommend: "reco.getreco",
    },

    album: {
      id: "content.getAlbumDetails",
      link: "webapi.get",
      recommend: "reco.getAlbumReco",
      same_year: "search.topAlbumsoftheYear",
    },

    playlist: {
      id: "playlist.getDetails",
      link: "webapi.get",
      recommend: "reco.getPlaylistReco",
    },

    artist: {
      id: "artist.getArtistPageDetails",
      link: "webapi.get",
      songs: "artist.getArtistMoreSong",
      albums: "artist.getArtistMoreAlbum",
      top_songs: "search.artistOtherTopSongs",
    },

    search: {
      top_search: "content.getTopSearches",
      all: "autocomplete.get",
      songs: "search.getResults",
      albums: "search.getAlbumResults",
      artists: "search.getArtistResults",
      playlists: "search.getPlaylistResults",
      more: "search.getMoreResults",
    },

    radio: {
      featured: "webradio.createFeaturedStation",
      artist: "webradio.createArtistStation",
      entity: "webradio.createEntityStation",
      songs: "webradio.getSong",
    },

    show: {
      show_details: "webapi.get",
      episodes: "show.getAllEpisodes",
      episode_details: "webapi.get",
    },

    get: {
      trending: "content.getTrending",
      featured_playlists: "content.getFeaturedPlaylists",
      charts: "content.getCharts",
      top_shows: "content.getTopShows",
      top_artists: "social.getTopArtists",
      top_albums: "content.getAlbums",
      mix_details: "webapi.get",
      label_details: "webapi.get",
      footer_details: "webapi.getFooterDetails",
      featured_stations: "webradio.getFeaturedStations",
      actor_top_songs: "search.actorOtherTopSongs",
      lyrics: "lyrics.getLyrics",
    },
  },
};
