# Maplesmith site

Static studio website for [maplesmith.dev](https://maplesmith.dev), published with GitHub Pages.

## Brand assets

`assets/maplesmith-mark.svg` is the self-contained vector master. It has no font dependency.
Use the avatar PNG for square profiles, the transparent PNG where the background is supplied by
the destination, and the 180px / 32px exports for Apple touch icons and favicon fallbacks.

## Publish

1. Create a public GitHub repository named `maplesmith-site` in the Maplesmith organization and push this project.
2. In the repository, open **Settings → Pages** and set the source to deploy from the `main` branch, root folder.
3. Set the custom domain to `maplesmith.dev`. The included `CNAME` file keeps that setting in the repository.
4. At Porkbun, add the GitHub Pages DNS records shown in GitHub’s custom-domain instructions. Keep all existing iCloud Mail records unchanged.
