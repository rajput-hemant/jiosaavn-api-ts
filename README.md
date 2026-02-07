<div align=center>

![][ci] ![][views] ![][stars] ![][forks] ![][issues] ![][license] ![][code-size] ![][commit-activity]

<img src="./public/jiosaavn-2.png" width="200px"/>

# 🎵 Jio Saavn API

### A simple wrapper for the Jio Saavn API powered by Hono.js 🔥.

[**📚 Documentation**](https://jiosaavn.rajputhemant.me/docs) (Scalar UI) · [**OpenAPI JSON**](https://jiosaavn.rajputhemant.me/openapi.json)

## ✨ Features

</div>

- 🚀 **Ultrafast** - Powered by [Hono.js](https://hono.dev).The router `RegExpRouter` is really fast.
- 🪶 **Lightweight** - Has minimal dependencies.
- 🌍 **Multi-runtime** - Works on `Bun`, `Node.js`, `Vercel`, and `Cloudflare Workers`.
- 🔥 Download High Quality Songs, w/ lyrics for supported songs.
- 🎵 Get Songs, Albums, Playlists, Artists, Radio Stations, Podcasts Lyrics, Recommendations, and more.
- ❤️ Open Source

## 📚 API Documentation

- **Scalar API Reference**: `GET /docs`
- **OpenAPI JSON**: `GET /openapi.json`

<div align=center>

## 🛠️ Building from source

</div>

- Clone the repository

```
git clone https://github.com/rajput-hemant/jiosaavn-api
cd jiosaavn-api
```

- Install dependencies

```
bun i || pnpm i || npm i || yarn
```

#### Bun

> [!Warning]
> You need to have [Bun.js](https://bun.sh) installed on your machine to run the project with bun.

```
bun run dev || pnpm dev || npm run dev || yarn dev
```

<div align = center>

## 🌐 Deploying your own instance

You can easily deploy your own hosted version of the `JioSaavn API` by clicking on one of the links below, which will set up a ready-to-go version for you:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rajput-hemant/jiosaavn-api)

[![Deploy with Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rajput-hemant/jiosaavn-api)

</div>

> [!Important]
> Deploy in an India region so all APIs work properly. Recommended region: `Mumbai, India (South) - bom1`

> [!Note]
> For Cloudflare Workers, remove any `process`-related code before deploying.

### Build and Run Docker Image

#### Docker Compose (Recommended)

- Start the container

```
docker-compose up -d # detached mode
```

- Stop the container

```
docker-compose stop # stops the container
docker-compose down # stops and removes the container
```

#### Docker

- Start Docker daemon (Skip if already running)

```
sudo dockerd
```

- Build the image

```
docker build -t jiosaavn .
```

- Run the image

```
docker run -p 80:3000 jiosaavn
```

- Open http://localhost to view it in the browser.

- Stop the container

```
docker ps
```

```
docker stop <container-id>
```

<div align=center>

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🦾 Contributors:

<a href="https://github.com/rajput-hemant/jiosaavn-api/graphs/contributors" target="blank"> <img src="https://contrib.rocks/image?repo=rajput-hemant/jiosaavn-api&max=500" />

</div>

<!----------------------------------{ Labels }--------------------------------->

[views]: https://komarev.com/ghpvc/?username=jiosaavn-api&label=view%20counter&color=red&style=flat
[code-size]: https://img.shields.io/github/languages/code-size/rajput-hemant/jiosaavn-api
[issues]: https://img.shields.io/github/issues-raw/rajput-hemant/jiosaavn-api
[license]: https://img.shields.io/github/license/rajput-hemant/jiosaavn-api
[commit-activity]: https://img.shields.io/github/commit-activity/w/rajput-hemant/jiosaavn-api
[forks]: https://img.shields.io/github/forks/rajput-hemant/jiosaavn-api?style=flat
[stars]: https://img.shields.io/github/stars/rajput-hemant/jiosaavn-api
[ci]: https://github.com/rajput-hemant/jiosaavn-api/actions/workflows/ci.yml/badge.svg
