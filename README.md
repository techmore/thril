# THRIL Docs Site

Static GitHub Pages site for the THRIL Ubuntu + touchscreen + Zebra printer setup guide.

## Stack

- Vite
- React 19
- Tailwind CSS v4
- shadcn/ui-style component structure

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This repo includes `.github/workflows/deploy.yml` to publish the built site to GitHub Pages on pushes to `main`.

Expected project URL:

```text
https://techmore.github.io/thril/
```

If you later move this site to a custom domain or a user/org root site, update the `base` value in `vite.config.ts`.
