# Tool's Studio — Frontend

[![Node.js](https://img.shields.io/badge/node-%3E%3D22.12.0-brightgreen)](https://nodejs.org/)
[![Astro](https://img.shields.io/badge/astro-6.x-blueviolet)](https://astro.build/)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/ZHOGIA/Tools-Studio)](https://github.com/ZHOGIA/Tools-Studio)

Tool's Studio is a free, open-source web frontend for a dual-purpose utility application.
It provides a YouTube video and audio downloader as well as an AI-powered background removal
tool — both served through a single, seamless Single Page Application (SPA) built with
[Astro](https://astro.build/).

The frontend communicates with a separate Python Flask backend via a REST API. In development,
the API is proxied from `http://localhost:5000`; in production, requests are directed to
`https://api.zhogia.my.id`.

See [Tools-Studio — Backend](https://github.com/ZHOGIA/Tools-Studio) for
the Python Flask backend that this frontend communicates with.

## Installation

Ensure you have Node.js **22.12.0 or later** installed. Then install dependencies:

```sh
npm install
```

> **NOTE**: The frontend requires the Flask backend to be running separately for API calls to
> work. Refer to the backend README for setup instructions.

## Usage

Start the local development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

To build a production-optimised bundle:

```sh
npm run build
```

To preview the production build locally before deploying:

```sh
npm run preview
```

## Project Structure

Inside the project, you will find the following layout:

```
/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── pages/
│   │   └── index.astro       # Main SPA entry point
│   └── styles/
│       └── global.css        # Global design system and component styles
├── astro.config.mjs
└── package.json
```

Astro resolves each file inside `src/pages/` as a route based on its filename. The entire
application lives in `index.astro`, which manages both the YouTube Downloader and the
Remove Background features through tab-based navigation.

Static assets such as the service worker, web manifest, and icons reside in `public/` and
are served at the root path.

## Features

**YouTube Downloader**

- Fetch video metadata (title, thumbnail, available formats and qualities) from any YouTube URL.
- Download as MP4 (video) or MP3 (audio) at a user-selected quality.
- Real-time progress polling with download speed and ETA display.
- Enforces a maximum media duration of 1 hour for server stability.

**AI Background Remover**

- Upload PNG, JPG, or WEBP images up to 10 MB.
- Removes the background using the backend AI model (powered by NVIDIA hardware acceleration).
- Interactive before/after comparison slider to preview the result.
- Images are wiped immediately after the session ends — no permanent storage.

## Commands

All commands are run from the root of the `frontend/` directory:

| Command                   | Action                                            |
| :------------------------ | :------------------------------------------------ |
| `npm install`             | Installs project dependencies                     |
| `npm run dev`             | Starts dev server at `localhost:3000`             |
| `npm run build`           | Builds the production site to `./dist/`           |
| `npm run preview`         | Previews the production build locally             |
| `npm run astro ...`       | Runs Astro CLI commands (e.g. `astro check`)      |
| `npm run astro -- --help` | Displays Astro CLI help                           |

## Configuration

The server port and public host access are configured in `astro.config.mjs`:

```js
export default defineConfig({
  devToolbar: { enabled: false },
  server: { port: 3000 },
  vite: {
    server: { allowedHosts: true }, // Allows access via Cloudflare Tunnel or Ngrok
  },
});
```

The API base URL is resolved at runtime in `index.astro`:

```js
const API_BASE = import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://api.zhogia.my.id";
```

## Contributing

All contributions are welcome. Smaller, focused pull requests are more likely to be merged
quickly. Please open an issue first if you intend to make a significant change.

For bugs, include the steps to reproduce the problem and the browser console output.

## License

This project is licensed under the [MIT License](./LICENSE).
