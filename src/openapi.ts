type OpenApiDocument = Record<string, unknown>;

type OpenApiParameter = {
  name: string;
  in: "query" | "path";
  required?: boolean;
  description?: string;
  schema: Record<string, unknown>;
  example?: unknown;
};

function q(
  name: string,
  {
    required,
    description,
    schema,
    example,
  }: Omit<OpenApiParameter, "name" | "in">,
): OpenApiParameter {
  return { name, in: "query", required, description, schema, example };
}

function p(
  name: string,
  {
    required,
    description,
    schema,
    example,
  }: Omit<OpenApiParameter, "name" | "in">,
): OpenApiParameter {
  return { name, in: "path", required, description, schema, example };
}

export function createOpenApiDocument(origin: string): OpenApiDocument {
  const rawParam = q("raw", {
    description:
      "If true, returns the raw JioSaavn response (bypasses this API's payload formatting).",
    schema: { type: "boolean" },
    example: true,
  });

  const miniParam = q("mini", {
    description: "If true, returns a smaller payload (when supported).",
    schema: { type: "boolean" },
    example: true,
  });

  const camelParam = q("camel", {
    description:
      "If provided, converts JSON response keys to camelCase (post-processing middleware).",
    schema: { type: "boolean" },
    example: true,
  });

  const langParam = q("lang", {
    description:
      "Comma-separated languages (e.g. `hindi,english`). Defaults to `hindi,english`.",
    schema: { type: "string" },
    example: "hindi,english",
  });

  const commonSuccessResponse = {
    description: "Success",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/SuccessResponse" },
      },
    },
  };

  const commonErrorResponse = {
    description: "Error",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  };

  const rateLimitResponse = {
    description: "Rate limit exceeded",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/RateLimitResponse" },
      },
    },
  };

  return {
    openapi: "3.1.0",
    info: {
      title: "JioSaavn API",
      description: "An unofficial wrapper for the JioSaavn API.",
      version: "0.1.0",
    },
    servers: [{ url: origin }],
    tags: [
      { name: "Docs" },
      { name: "Modules" },
      { name: "Song" },
      { name: "Album" },
      { name: "Playlist" },
      { name: "Artist" },
      { name: "Search" },
      { name: "Show" },
      { name: "Get" },
      { name: "Radio" },
      { name: "Ping" },
    ],
    paths: {
      "/openapi.json": {
        get: {
          tags: ["Docs"],
          summary: "OpenAPI document",
          description: "Returns the OpenAPI 3.1 JSON document for this API.",
          responses: {
            "200": {
              description: "OpenAPI document",
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
            },
          },
        },
      },
      "/docs": {
        get: {
          tags: ["Docs"],
          summary: "API reference (Scalar)",
          description: "Interactive API reference powered by Scalar.",
          responses: {
            "200": {
              description: "HTML page",
              content: { "text/html": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/modules": {
        get: {
          tags: ["Modules"],
          summary: "Home modules / launch data",
          parameters: [langParam, miniParam, rawParam, camelParam],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/song": {
        get: {
          tags: ["Song"],
          summary: "Song details",
          description:
            "Fetch song details by `id` (supports comma-separated IDs) or by `link`/`token`.",
          parameters: [
            q("id", {
              description: "Song ID(s). You can pass comma-separated IDs.",
              schema: { type: "string" },
              example: "6r5d1x0b",
            }),
            q("link", {
              description: "JioSaavn song link (alternative to `id`).",
              schema: { type: "string" },
            }),
            q("token", {
              description: "JioSaavn token (alternative to `id`).",
              schema: { type: "string" },
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/song/recommend": {
        get: {
          tags: ["Song"],
          summary: "Song recommendations",
          parameters: [
            q("id", {
              required: true,
              description: "Song ID.",
              schema: { type: "string" },
              example: "6r5d1x0b",
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/album": {
        get: {
          tags: ["Album"],
          summary: "Album details",
          parameters: [
            q("id", {
              description: "Album ID.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "JioSaavn album link (alternative to `id`).",
              schema: { type: "string" },
            }),
            q("token", {
              description: "JioSaavn token (alternative to `id`).",
              schema: { type: "string" },
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/album/recommend": {
        get: {
          tags: ["Album"],
          summary: "Album recommendations",
          parameters: [
            q("id", {
              required: true,
              description: "Album ID.",
              schema: { type: "string" },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/album/same-year": {
        get: {
          tags: ["Album"],
          summary: "Albums from the same year",
          parameters: [
            q("year", {
              required: true,
              description: "Album year (e.g. 2020).",
              schema: { type: "string" },
              example: "2020",
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/playlist": {
        get: {
          tags: ["Playlist"],
          summary: "Playlist details",
          parameters: [
            q("id", {
              description: "Playlist ID.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "JioSaavn playlist link (alternative to `id`).",
              schema: { type: "string" },
            }),
            q("token", {
              description: "JioSaavn token (alternative to `id`).",
              schema: { type: "string" },
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/playlist/recommend": {
        get: {
          tags: ["Playlist"],
          summary: "Playlist recommendations",
          parameters: [
            q("id", {
              required: true,
              description: "Playlist ID.",
              schema: { type: "string" },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/artist": {
        get: {
          tags: ["Artist"],
          summary: "Artist details",
          parameters: [
            q("id", {
              description: "Artist ID.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "JioSaavn artist link (alternative to `id`).",
              schema: { type: "string" },
            }),
            q("token", {
              description: "JioSaavn token (alternative to `id`).",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
              example: "1",
            }),
            q("n_song", {
              description: "Number of songs.",
              schema: { type: "string" },
              example: "10",
            }),
            q("n_album", {
              description: "Number of albums.",
              schema: { type: "string" },
              example: "10",
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/artist/songs": {
        get: {
          tags: ["Artist"],
          summary: "Artist songs",
          parameters: [
            q("id", {
              required: true,
              description: "Artist ID.",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("cat", {
              description: "Category (e.g. latest, alphabetical).",
              schema: { type: "string" },
            }),
            q("sort", {
              description: "Sort order (asc/desc).",
              schema: { type: "string" },
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/artist/albums": {
        get: {
          tags: ["Artist"],
          summary: "Artist albums",
          parameters: [
            q("id", {
              required: true,
              description: "Artist ID.",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("cat", {
              description: "Category (e.g. latest, alphabetical).",
              schema: { type: "string" },
            }),
            q("sort", {
              description: "Sort order (asc/desc).",
              schema: { type: "string" },
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/artist/top-songs": {
        get: {
          tags: ["Artist"],
          summary: "Artist top songs",
          parameters: [
            q("artist_id", {
              required: true,
              description: "Artist ID(s).",
              schema: { type: "string" },
            }),
            q("song_id", {
              required: true,
              description: "Seed song ID.",
              schema: { type: "string" },
            }),
            q("page", { schema: { type: "string" }, description: "Page." }),
            q("cat", {
              schema: { type: "string" },
              description: "Category (latest, alphabetical, popularity).",
            }),
            q("sort", {
              schema: { type: "string" },
              description: "Sort order (asc/desc).",
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/artist/recommend": {
        get: {
          tags: ["Artist"],
          summary: "Artist recommendations",
          description:
            "Uses the same underlying endpoint as `/artist/top-songs`.",
          parameters: [
            q("artist_id", {
              required: true,
              description: "Artist ID(s).",
              schema: { type: "string" },
            }),
            q("song_id", {
              required: true,
              description: "Seed song ID.",
              schema: { type: "string" },
            }),
            q("page", { schema: { type: "string" }, description: "Page." }),
            q("cat", {
              schema: { type: "string" },
              description: "Category (latest, alphabetical, popularity).",
            }),
            q("sort", {
              schema: { type: "string" },
              description: "Sort order (asc/desc).",
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/search": {
        get: {
          tags: ["Search"],
          summary: "Search (all)",
          parameters: [
            q("q", {
              required: true,
              description: "Search query.",
              schema: { type: "string" },
              example: "arijit singh",
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/search/top": {
        get: {
          tags: ["Search"],
          summary: "Top searches",
          parameters: [rawParam, camelParam],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/search/{path}": {
        get: {
          tags: ["Search"],
          summary: "Search by entity",
          description:
            "Search songs/albums/playlists/artists via `/search/{path}`.",
          parameters: [
            p("path", {
              required: true,
              description: "Entity type.",
              schema: {
                type: "string",
                enum: ["songs", "albums", "playlists", "artists"],
              },
              example: "songs",
            }),
            q("q", {
              required: true,
              description: "Search query.",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("n", {
              description: "Number of results per page.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/search/podcasts": {
        get: {
          tags: ["Search"],
          summary: "Search podcasts",
          parameters: [
            q("q", {
              required: true,
              description: "Search query.",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("n", {
              description: "Number of results per page.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/show": {
        get: {
          tags: ["Show"],
          summary: "Show details",
          parameters: [
            q("token", {
              description: "JioSaavn show token.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "JioSaavn show link.",
              schema: { type: "string" },
            }),
            q("season", {
              description: "Season number.",
              schema: { type: "string" },
            }),
            q("sort", {
              description: "Sort order.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/show/episode": {
        get: {
          tags: ["Show"],
          summary: "Episode details",
          parameters: [
            q("token", {
              description: "Episode token.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "Episode link.",
              schema: { type: "string" },
            }),
            q("season", {
              description: "Season number.",
              schema: { type: "string" },
            }),
            q("sort", {
              description: "Sort order.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/show/episodes": {
        get: {
          tags: ["Show"],
          summary: "All episodes for a show",
          parameters: [
            q("id", {
              required: true,
              description: "Show ID.",
              schema: { type: "string" },
            }),
            q("season", {
              description: "Season number.",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("sort", {
              description: "Sort order.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/trending": {
        get: {
          tags: ["Get"],
          summary: "Trending",
          parameters: [
            q("type", {
              description: "Entity type: song | album | playlist.",
              schema: { type: "string", enum: ["song", "album", "playlist"] },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/{path}": {
        get: {
          tags: ["Get"],
          summary: "Get collections",
          description:
            "Get featured-playlists, charts, top-shows, top-artists, top-albums, featured-stations.",
          parameters: [
            p("path", {
              required: true,
              description: "Collection type.",
              schema: {
                type: "string",
                enum: [
                  "featured-playlists",
                  "charts",
                  "top-shows",
                  "top-artists",
                  "top-albums",
                  "featured-stations",
                ],
              },
              example: "charts",
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("n", {
              description: "Number of items per page.",
              schema: { type: "string" },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/actor-top-songs": {
        get: {
          tags: ["Get"],
          summary: "Actor top songs",
          parameters: [
            q("actor_id", {
              required: true,
              description: "Actor ID(s).",
              schema: { type: "string" },
            }),
            q("song_id", {
              required: true,
              description: "Seed song ID.",
              schema: { type: "string" },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/footer-details": {
        get: {
          tags: ["Get"],
          summary: "Footer details",
          parameters: [
            langParam,
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("n", {
              description: "Number of items.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/lyrics": {
        get: {
          tags: ["Get"],
          summary: "Lyrics",
          parameters: [
            q("id", {
              required: true,
              description: "Lyrics ID / Song ID.",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/synced-lyrics": {
        get: {
          tags: ["Get"],
          summary: "Synced lyrics (LRCLIB)",
          parameters: [
            q("id", {
              description: "Song ID.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "Song link.",
              schema: { type: "string" },
            }),
            q("token", {
              description: "Song token.",
              schema: { type: "string" },
            }),
            q("track", {
              description: "Track name (if not using song id/link/token).",
              schema: { type: "string" },
            }),
            q("artist", {
              description: "Artist name (if not using song id/link/token).",
              schema: { type: "string" },
            }),
            q("duration", {
              description: "Track duration in seconds (recommended).",
              schema: { type: "string" },
            }),
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/mix": {
        get: {
          tags: ["Get"],
          summary: "Mix details",
          parameters: [
            q("token", {
              description: "Mix token.",
              schema: { type: "string" },
            }),
            q("link", { description: "Mix link.", schema: { type: "string" } }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("n", {
              description: "Items per page.",
              schema: { type: "string" },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/label": {
        get: {
          tags: ["Get"],
          summary: "Label details",
          parameters: [
            q("token", {
              description: "Label token.",
              schema: { type: "string" },
            }),
            q("link", {
              description: "Label link.",
              schema: { type: "string" },
            }),
            q("page", {
              description: "Page number.",
              schema: { type: "string" },
            }),
            q("n_song", {
              description: "Number of songs.",
              schema: { type: "string" },
            }),
            q("n_album", {
              description: "Number of albums.",
              schema: { type: "string" },
            }),
            q("cat", { description: "Category.", schema: { type: "string" } }),
            q("sort", {
              description: "Sort order.",
              schema: { type: "string" },
            }),
            langParam,
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/get/mega-menu": {
        get: {
          tags: ["Get"],
          summary: "Mega menu",
          parameters: [
            q("entity", {
              description: "Whether to fetch entity page menu.",
              schema: { type: "boolean" },
            }),
            langParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/radio/{path}": {
        get: {
          tags: ["Radio"],
          summary: "Create radio station",
          description:
            "Create a featured/artist/entity radio station. Note: the actual route also supports `/radio/create/{...}`.",
          parameters: [
            p("path", {
              required: true,
              description: "Station type.",
              schema: {
                type: "string",
                enum: ["featured", "artist", "entity"],
              },
              example: "featured",
            }),
            q("song_id", {
              description: "Song ID.",
              schema: { type: "string" },
            }),
            q("artist_id", {
              description: "Artist ID.",
              schema: { type: "string" },
            }),
            q("id", {
              description: "Entity ID (for entity radio).",
              schema: { type: "string" },
            }),
            q("type", {
              description: "Entity type (for entity radio).",
              schema: { type: "string" },
            }),
            q("name", {
              description: "Station name.",
              schema: { type: "string" },
            }),
            q("q", {
              description: "Search query.",
              schema: { type: "string" },
            }),
            q("mode", { description: "Mode.", schema: { type: "string" } }),
            langParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/radio/songs": {
        get: {
          tags: ["Radio"],
          summary: "Get radio songs",
          parameters: [
            q("id", {
              required: true,
              description: "Station ID.",
              schema: { type: "string" },
            }),
            q("n", {
              description: "Number of songs (default 10).",
              schema: { type: "string" },
              example: "10",
            }),
            miniParam,
            rawParam,
            camelParam,
          ],
          responses: {
            "200": commonSuccessResponse,
            "400": commonErrorResponse,
            "429": rateLimitResponse,
          },
        },
      },
      "/ping": {
        get: {
          tags: ["Ping"],
          summary: "Ping",
          description: "Debug route. Echoes request URL + headers.",
          responses: {
            "200": {
              description: "Plaintext response",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        SuccessResponse: {
          type: "object",
          additionalProperties: true,
          properties: {
            status: { type: "string", example: "Success" },
            message: { type: "string", example: "✅ OK" },
            data: {
              description: "Response payload.",
              anyOf: [{}, { type: "null" }],
            },
          },
          required: ["status", "message", "data"],
        },
        ErrorResponse: {
          type: "object",
          additionalProperties: true,
          properties: {
            status: { type: "string", example: "Failed" },
            message: { type: "string", example: "❌ Something went wrong" },
            data: {
              anyOf: [{ type: "null" }, {}],
              example: null,
            },
          },
          required: ["status", "message", "data"],
        },
        RateLimitResponse: {
          type: "object",
          additionalProperties: true,
          properties: {
            status: { type: "string", example: "Failed" },
            message: {
              type: "string",
              example:
                "You have exceeded the rate limit. Please try again later.",
            },
            limit: { type: "number", example: 5 },
            remaining: { type: "number", example: 0 },
            reset: { type: "string", example: "250ms" },
          },
          required: ["status", "message"],
        },
      },
    },
  };
}
