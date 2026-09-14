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

Aviary is not on the App Store yet, so its landing page and both project tiles carry a
"Coming soon" badge instead of a download link. Search the site for `COMING SOON` to find every
place that has to change on release.

All pages share `styles.css`. Document pages use the `.doc` classes; app landing pages use
`.page-hero`, `.app-id`, and `.features`.

Perch Home's pages moved here from `perchhome.app` (maplesmith/perchhome#349). That domain
redirects to these paths and must stay registered while builds compiled with the old URL are
still in the wild.

## Brand assets

`assets/maplesmith-mark.svg` is the self-contained vector master. It has no font dependency.
Use the avatar PNG for square profiles, the transparent PNG where the background is supplied by
the destination, and the 180px / 32px exports for Apple touch icons and favicon fallbacks.

## Publish

1. Create a public GitHub repository named `maplesmith-site` in the Maplesmith organization and push this project.
2. In the repository, open **Settings → Pages** and set the source to deploy from the `main` branch, root folder.
3. Set the custom domain to `maplesmith.dev`. The included `CNAME` file keeps that setting in the repository.
4. At Porkbun, add the GitHub Pages DNS records shown in GitHub’s custom-domain instructions. Keep all existing iCloud Mail records unchanged.
