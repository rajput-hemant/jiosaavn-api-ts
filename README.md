<div align=center>

![][views] ![][stars] ![][forks] ![][issues] ![][license] ![][code-size] ![][commit-activity]

# Jio Saavn API

### A simple wrapper for the Jio Saavn API powered by Hono.js 🔥.

## Building from source

</div>

- Clone the repository

```
git clone https://github.com/rajput-hemant/jiosaavn-api-ts
cd jiosaavn-api-ts
```

- Install dependencies

```
pnpm i || npm i || yarn
```

#### Bun

> **Warning**
> You need to have [Bun.js](https://bun.sh) installed on your machine to run the project with bun.

```
pnpm dev || npm run dev || yarn dev
```

#### Node.js

- Install the following dependencies

```
pnpm i @hono/node-server || npm i @hono/node-server || yarn add @hono/node-server
pnpm i -D tsx || npm i -D tsx || yarn add -D tsx
```

- Make the following changes in [`src/index.ts`](src/index.ts)

```diff
...

- // import { serve } from "@hono/node-server";
+ import { serve } from "@hono/node-server";

...

/* For Node.js */;
- // serve(server);
+ serve(server);

...
```

- Start the development server

```
pnpm dev:node || npm dev:node || yarn dev:node
```

#### Vercel

```
pnpm dev:vercel || npm dev:vercel || yarn dev:vercel
```

<div align = center>

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🦾 Contributors:

<a href="https://github.com/rajput-hemant/jiosaavn-api-ts/graphs/contributors" target="blank"> <img src="https://contrib.rocks/image?repo=rajput-hemant/jiosaavn-api-ts&max=500" />

</div>

<!----------------------------------{ Labels }--------------------------------->

[views]: https://komarev.com/ghpvc/?username=jiosaavn-api-ts&label=view%20counter&color=red&style=flat
[code-size]: https://img.shields.io/github/languages/code-size/rajput-hemant/jiosaavn-api-ts
[issues]: https://img.shields.io/github/issues-raw/rajput-hemant/jiosaavn-api-ts
[license]: https://img.shields.io/github/license/rajput-hemant/jiosaavn-api-ts
[commit-activity]: https://img.shields.io/github/commit-activity/w/rajput-hemant/jiosaavn-api-ts
[forks]: https://img.shields.io/github/forks/rajput-hemant/jiosaavn-api-ts?style=flat
[stars]: h

```

```
