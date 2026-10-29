// Copies the publishable site into an output folder and appends a hash of each local asset's
// contents to every URL that points at it (styles.css?v=3f9a2c1d04), in pages and in CSS.
// GitHub Pages caches CSS and images for hours and cannot set headers, so a changed file
// needs a new URL; an unchanged one keeps its URL and stays cached.
//
// usage: node scripts/build-site.mjs [source dir] [output dir]   (defaults: . and _site)

import { createHash } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const out = resolve(process.argv[3] ?? '_site');

const PAGES = new Set(['.html']);
const ASSETS = new Set(['.css', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico']);
const KEEP = new Set(['CNAME']);
const SKIP_DIRS = new Set(['scripts', 'node_modules']);

function collect(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      // dot and underscore folders hold tooling (.git, .github, .hallmark) or build output
      if (/^[._]/.test(entry.name) || SKIP_DIRS.has(entry.name) || abs === out) continue;
      collect(abs, files);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (PAGES.has(ext) || ASSETS.has(ext) || KEEP.has(entry.name)) files.push(abs);
    }
  }
  return files;
}

const files = collect(root);
const published = new Set(files);
const built = new Map();
const hashes = new Map();
const inProgress = new Set();
const missing = [];

function target(ref, from) {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#|data:)/i.test(ref) || ref.includes('?')) return null;
  const path = ref.split('#')[0];
  if (!ASSETS.has(extname(path).toLowerCase())) return null;
  const abs = path.startsWith('/') ? join(root, path) : resolve(dirname(from), path);
  if (!published.has(abs)) {
    missing.push(`${relative(root, from)} -> ${ref}`);
    return null;
  }
  return abs;
}

function rewrite(text, from, pattern) {
  return text.replace(pattern, (match, before, ref, after) => {
    const abs = target(ref, from);
    return abs ? `${before}${ref}?v=${hashOf(abs)}${after}` : match;
  });
}

function hashOf(abs) {
  if (hashes.has(abs)) return hashes.get(abs);
  if (inProgress.has(abs)) throw new Error(`circular reference through ${relative(root, abs)}`);
  inProgress.add(abs);
  let body = readFileSync(abs);
  if (extname(abs) === '.css') {
    // a stylesheet's hash covers the hashed URLs it imports, so editing tokens.css changes styles.css's URL too
    body = rewrite(body.toString(), abs, /(url\(\s*["']?)([^"')\s]+)(["']?\s*\))/g);
  }
  const hash = createHash('sha256').update(body).digest('hex').slice(0, 10);
  built.set(abs, body);
  hashes.set(abs, hash);
  inProgress.delete(abs);
  return hash;
}

for (const abs of files) {
  const ext = extname(abs).toLowerCase();
  if (PAGES.has(ext)) {
    built.set(abs, rewrite(readFileSync(abs, 'utf8'), abs, /(\b(?:href|src)=")([^"]+)(")/g));
  } else if (ASSETS.has(ext)) {
    hashOf(abs);
  } else {
    built.set(abs, readFileSync(abs));
  }
}

if (missing.length) {
  console.error(`build-site: ${missing.length} reference(s) to files that do not exist:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
for (const [abs, body] of built) {
  const dest = join(out, relative(root, abs));
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, body);
}

const pages = files.filter((f) => PAGES.has(extname(f).toLowerCase())).length;
console.log(`build-site: ${pages} pages and ${hashes.size} hashed assets written to ${relative(process.cwd(), out) || out}`);
