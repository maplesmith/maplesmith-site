# Maplesmith site

Static studio website for [maplesmith.dev](https://maplesmith.dev), published with GitHub Pages.

## Site structure

The studio landing page lives at the root. Each app gets its own section directory holding its
landing page and supporting pages, so a new app is a directory rather than a new domain:

```
/                      studio landing
/perch-home/           app page
/perch-home/privacy    privacy policy
/perch-home/terms      terms of service
/perch-home/support    support and troubleshooting
/aviary/               app page
/aviary/privacy        privacy policy
/aviary/terms          terms of service
/aviary/support        support and troubleshooting
/aviary/faq            frequently asked questions
```

All pages share `styles.css`, which imports `tokens.css` (colours, fonts, spacing and type scale)
and `base.css` (element defaults). `design.md` records the system those files implement. Document
pages use the `.doc` classes; app landing pages use `.page-hero`, `.app-id`, and `.features`.

## Asset caching

GitHub Pages caches CSS and images for hours and can't be told otherwise, so a changed file
needs a new URL. `scripts/build-site.mjs` runs at deploy time: it copies the site into `_site`
and appends a hash of each asset's contents to every URL that points at it
(`styles.css?v=9b51586a24`), in the pages and inside the CSS. An edited file gets a new URL;
an unchanged one keeps its URL and stays cached. The source files keep plain URLs, so nothing
needs bumping by hand.

To check the build locally: `node scripts/build-site.mjs && python3 -m http.server -d _site 8000`.
It exits with an error if a page or stylesheet references an asset that doesn't exist.
Only the pages, stylesheets, images and `CNAME` are published; this README and `design.md` are not.

Perch Home's pages moved here from `perchhome.app` (maplesmith/perchhome#349). That domain
redirects to these paths and must stay registered while builds compiled with the old URL are
still in the wild.

## Brand assets

`assets/maplesmith-mark.svg` is the self-contained vector master. It has no font dependency.
Use the avatar PNG for square profiles, the transparent PNG where the background is supplied by
the destination, and the 180px / 32px exports for Apple touch icons and favicon fallbacks.

## Publish

1. Create a public GitHub repository named `maplesmith-site` in the Maplesmith organization and push this project.
2. In the repository, open **Settings → Pages** and set the source to **GitHub Actions**. Every push to `main` runs `.github/workflows/pages.yml`, which builds the site into `_site` and deploys it.
3. Set the custom domain to `maplesmith.dev`. The included `CNAME` file keeps that setting in the repository.
4. At Porkbun, add the GitHub Pages DNS records shown in GitHub’s custom-domain instructions. Keep all existing iCloud Mail records unchanged.
