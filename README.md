# piapps.dev

Static landing page for **https://piapps.dev** — the umbrella domain for self-hosted apps built and operated by [0xWulf](https://0xwulf.dev) on a Raspberry Pi 5 homelab.

## Stack

- Plain HTML5, CSS3, and ES modules — no frameworks, no build step, no external fonts or CDNs.
- Showcase metadata in `src/data/projects.js` is synced with `hexawulf/0xwulf`.
- Strict CSP (`default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'`).

## Deploy

nginx serves the repository checkout directly from the host's site folder. To deploy updates from `main`:

```bash
git pull --ff-only
```

Bump the `?v=` query strings in `index.html`, `404.html`, and `script.js` whenever `style.css`, `script.js`, or `src/data/projects.js` changes so cached assets refresh cleanly.

## Local checks

```bash
npx --yes html-validate index.html 404.html
```

## License

MIT — see [LICENSE](LICENSE).
