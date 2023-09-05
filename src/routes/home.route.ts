import { Hono } from "hono";

import { config } from "../lib/config";

export const home = new Hono().get("/", (c) =>
  c.html(`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>JioSaavn API</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/png" href="favicon.png" />
		<meta name="title" content="JioSaavn API" />
		<meta name="description" content="JioSaavn API by rajput-hemant@github" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="${config.urls.siteUrl}" />
		<meta property="og:title" content="JioSaavn API" />
		<meta property="og:description" content="JioSaavn API by rajput-hemant@github" />
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="${config.urls.siteUrl}" />
		<meta property="twitter:title" content="JioSaavn API by rajput-hemant@github" />
		<meta
			property="twitter:description"
			content="JioSaavn API by rajput-hemant@github"
		/>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>

	<style>
		.no-select {
			-webkit-tap-highlight-color: transparent;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
		.no-select:focus {
			outline: none !important;
		}

		/* https://github.com/rajput-hemant/react-template-vite/blob/master/src/styles/layout.css */
		.layout {
			background-image: radial-gradient(
					hsla(0, 0%, 84%, 0.25) 1px,
					transparent 0
				),
				radial-gradient(hsla(0, 0%, 65%, 0.2) 1px, transparent 0);
			background-size: 50px 50px;
			background-position: 0 0, 25px 25px;
			-webkit-animation: slide 2s linear infinite;
			animation: slide 4s linear infinite;
		}

		@keyframes slide {
			100% {
				background-position: 50px 0, 125px 25px;
			}
		}

		.cards:hover > .card::after {
			opacity: 1;
		}

		.card::before {
			background: radial-gradient(
				800px circle at var(--mouse-x) var(--mouse-y),
				rgba(255, 255, 255, 0.06),
				transparent 40%
			);
			z-index: 3;
		}

		.card::after {
			background: radial-gradient(
				600px circle at var(--mouse-x) var(--mouse-y),
				rgba(255, 255, 255, 0.4),
				transparent 40%
			);
			z-index: 1;
		}
	</style>

	<body
		class="layout m-0 flex min-h-screen flex-col items-center justify-center bg-[#141414] p-0 text-white"
	>
		<div
			class="cards grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl mb-16 lg:mb-0"
		>
			<div class="lg:col-span-2 my-4 lg:mb-8 w-full">
				<div class="flex w-full flex-row items-center space-x-4 px-8">
					<p
						class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold leading-none text-transparent md:text-4xl"
					>
						JioSaavn API
					</p>

					<p
						class="max-w-fit rounded-md bg-zinc-800 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-black hover:shadow-xl hover:shadow-black"
					>
						Unofficial
					</p>
				</div>
			</div>

			<a
				href="${config.urls.docsUrl}"
				target="_blank"
				rel="noopener noreferrer"
				class="card before: before:transition-opcacity after:transition-opcacity relative flex h-[180px] w-full lg:h-[225px] lg:w-[500px] flex-col rounded-xl bg-white/10 shadow-lg shadow-black transition-shadow duration-500 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:duration-500 hover:shadow-2xl hover:shadow-black before:hover:opacity-100"
			>
				<div
					class="absolute inset-[1px] z-[2] flex grow flex-col items-center justify-center rounded-xl bg-[#171717] p-2.5 px-8"
				>
					<div class="flex flex-col">
						<span
							class="mb-1 lg:mb-4 max-w-fit rounded-md bg-red-500/10 p-2 text-center text-xs font-bold uppercase tracking-wide text-red-500 shadow shadow-black"
						>
							Docs
						</span>

						<span class="mt-2 text-2xl font-bold text-neutral-200">
							Documentation
						</span>

						<p class="mt-2 text-neutral-400">
							Check out the documentation to learn how to use the JioSaavn API.
						</p>
					</div>
				</div>
			</a>

			<a
				href="https://github.com/rajput-hemant/jiosaavn-api-ts"
				target="_blank"
				rel="noopener noreferrer"
				class="card before: before:transition-opcacity after:transition-opcacity relative flex h-[180px] w-full lg:h-[225px] lg:w-[500px] flex-col rounded-xl bg-white/10 shadow-lg shadow-black transition-shadow duration-500 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:duration-500 hover:shadow-2xl hover:shadow-black before:hover:opacity-100"
			>
				<div
					class="absolute inset-[1px] z-[2] flex grow flex-col items-center justify-center rounded-xl bg-[#171717] p-2.5 px-8"
				>
					<div class="flex flex-col">
						<span
							class="mb-1 lg:mb-4 max-w-fit rounded-md bg-green-500/10 p-2 text-center text-xs font-bold uppercase tracking-wide text-green-500 shadow shadow-black"
						>
							Open Source
						</span>

						<span class="mt-2 text-2xl font-bold text-neutral-200">
							Open source
						</span>

						<p class="mt-2 text-neutral-400">
							Jiosaavn API is open-source. Check out the source code at github.
						</p>
					</div>
				</div>
			</a>

			<a
				href="https://github.com/rajput-hemant/jiosaavn-api-ts/issues"
				target="_blank"
				rel="noopener noreferrer"
				class="card before: before:transition-opcacity after:transition-opcacity relative flex h-[180px] w-full lg:h-[225px] lg:w-[500px] flex-col rounded-xl bg-white/10 shadow-lg shadow-black transition-shadow duration-500 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:duration-500 hover:shadow-2xl hover:shadow-black before:hover:opacity-100"
			>
				<div
					class="absolute inset-[1px] z-[2] flex grow flex-col items-center justify-center rounded-xl bg-[#171717] p-2.5 px-8"
				>
					<div class="flex flex-col">
						<span
							class="mb-1 lg:mb-4 max-w-fit rounded-md bg-violet-500/10 p-2 text-center text-xs font-bold uppercase tracking-wide text-violet-500 shadow shadow-black"
						>
							Collaborate
						</span>

						<span class="mt-2 text-2xl font-bold text-neutral-200">
							Features / Bugs
						</span>

						<p class="mt-2 text-neutral-400">
							Found a bug? Please report it. If you'd like to contribute, feel
							free to raise a PR.
						</p>
					</div>
				</div>
			</a>

			<a
				href="https://github.com/rajput-hemant"
				target="_blank"
				rel="noopener noreferrer"
				class="card before: before:transition-opcacity after:transition-opcacity relative flex h-[180px] w-full lg:h-[225px] lg:w-[500px] flex-col rounded-xl bg-white/10 shadow-lg shadow-black transition-shadow duration-500 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:duration-500 hover:shadow-2xl hover:shadow-black before:hover:opacity-100"
			>
				<div
					class="absolute inset-[1px] z-[2] flex grow flex-col items-center justify-center rounded-xl bg-[#171717] p-2.5 px-8"
				>
					<div class="flex flex-col">
						<span
							class="mb-1 lg:mb-4 max-w-fit rounded-md bg-blue-500/10 p-2 text-center text-xs font-bold uppercase tracking-wide text-blue-500 shadow shadow-black"
						>
							Author
						</span>

						<span class="mt-2 text-2xl font-bold text-neutral-200">
							rajput-hemant
						</span>

						<p class="mt-2 text-neutral-400">
							Jiosaavn unofficial API is created by rajput-hemant. Check out
							other projects at github.
						</p>
					</div>
				</div>
			</a>
		</div>

		<span class="fixed bottom-4 text-neutral-400">
			© Copyright 2023. All rights reserved.
		</span>
	</body>

	<script>
		document.getElementsByClassName("cards")[0].onmousemove = (e) => {
			for (const card of document.getElementsByClassName("card")) {
				const rect = card.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;

				card.style.setProperty("--mouse-x", \`\${x}px\`);
				card.style.setProperty("--mouse-y", \`\${y}px\`);
			}
		};
	</script>
</html>`)
);
