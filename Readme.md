# Personal Web Site

Source for [javiercaballero.info](https://javiercaballero.info/), the personal web CV of Javier Caballero.

It is a static site: a single HTML page with its images. A small build step
minifies it for publishing.

## Project structure

```
public/            Source of everything that gets published
  index.html       The site
  img/             Profile picture and favicon
  robots.txt
scripts/build.js   Builds public/ into dist/ (minifies the HTML)
tests/             End-to-end tests (Playwright)
wrangler.toml      Cloudflare Pages config (publishes only dist/)
.github/workflows/ Pull request validation
```

Only what is built from `public/` is deployed. Keep repository files (license,
docs, config) outside that folder so they are not exposed on the site.

## Local development

Use Node 24 (see `.nvmrc`). Install the dependencies, then start a dev
server for `public/` at http://localhost:3000:

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Copies `public/` to `dist/` and minifies the HTML, including its inline CSS.
`dist/` is generated, so it is not committed.

## Deployment

**Cloudflare Pages** serves the live domain: it builds every branch with
`npm run build` and publishes `dist/`, as set by `pages_build_output_dir` in
`wrangler.toml`. Pull requests get a preview URL.

The build command lives in the Cloudflare Pages project settings
(**Settings → Build → Build command**), not in this repository: it must be
`npm run build`.

## Validation

The `Validation` workflow (`.github/workflows/pr-validation.yml`) runs on
pull requests to `master` and on every push to `master` (so merged pull
requests are validated again) in two jobs:

1. **Build site** validates the HTML in `public/` with
   [html-validate](https://html-validate.org/), runs `npm run build`, validates
   the built HTML in `dist/`, checks that every local asset the pages reference
   exists, and uploads `dist/` as the `dist` artifact.
2. **End-to-end tests** downloads that artifact and runs the tests against it.

Run the same HTML checks locally with:

```sh
npx html-validate public
npm run build && npx html-validate dist
```

## Tests

End-to-end tests in `tests/` use [Playwright](https://playwright.dev/) to load
the page on desktop and mobile viewports. They check the content, social links,
images, layout, that no requests fail, and run an
[axe](https://github.com/dequelabs/axe-core) accessibility scan in light and
dark mode. They run against `dist/`, the files that get deployed: `npm test`
builds the site first (`npx playwright test` alone reuses the current `dist/`).

```sh
npm install
npx playwright install chromium
npm test
```

## License

[GPL-3.0](LICENSE)
