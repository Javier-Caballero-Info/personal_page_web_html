# Personal Web Site

Source for [javiercaballero.info](https://javiercaballero.info/), the personal web CV of Javier Caballero.

It is a static site: a single HTML page with its images, no build step required.

## Project structure

```
public/            Everything that gets published
  index.html       The site
  img/             Profile picture and favicon
  robots.txt
wrangler.toml      Cloudflare Pages config (publishes only public/)
.github/workflows/ Pull request validation
```

Only the contents of `public/` are deployed. Keep repository files (license,
docs, config) outside that folder so they are not exposed on the site.

## Local development

Serve the `public/` folder with any static server, for example:

```sh
npx serve public
# or
python3 -m http.server --directory public 8080
```

## Deployment

**Cloudflare Pages** serves the live domain: it builds every branch and
publishes `public/`, as set by `pages_build_output_dir` in `wrangler.toml`.
Pull requests get a preview URL.

## Pull request validation

The `PR Validation` workflow (`.github/workflows/pr-validation.yml`) runs on
pull requests to `master`. It validates the HTML in `public/` with
[html-validate](https://html-validate.org/) and checks that every local asset
referenced from the pages exists. Run the same HTML check locally with:

```sh
npx html-validate public
```

## License

[GPL-3.0](LICENSE)
