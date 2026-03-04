// scripts/generate-entrepreneur-ndjson.mjs
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const inputPath = path.join(repoRoot, "scripts", "emprendedoras.es.json");
const outputPath = path.join(repoRoot, "scripts", "entrepreneur-import.es.ndjson");

if (!fs.existsSync(inputPath)) {
  console.error(`Input JSON not found:\n${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf8");
const items = JSON.parse(raw);

if (!Array.isArray(items)) {
  console.error("Input JSON must be an array.");
  process.exit(1);
}

function slugify(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeUrl(href) {
  if (!href) return "";
  const s = String(href).trim();
  if (!s) return "";
  if (s.startsWith("mailto:")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("//")) return `https:${s}`;
  // e.g. "linkedin.com/in/..." (missing scheme)
  return `https://${s}`;
}

function cleanString(val) {
  if (val === null || val === undefined) return "";
  const s = String(val).trim();
  return s;
}

const seenIds = new Set();
const lines = [];

for (const biz of items) {
  const name = cleanString(biz?.name);
  if (!name) continue;

  const slug = slugify(name) || "item";
  let id = `entrepreneur_es_${slug}`; // avoid dots in _id
  let n = 2;
  while (seenIds.has(id)) {
    id = `entrepreneur_es_${slug}_${n++}`;
  }
  seenIds.add(id);

  const doc = {
    _id: id,
    _type: "entrepreneur",
    locale: "es",

    // main fields
    name,
    tagline: cleanString(biz?.tagline),
    owner: cleanString(biz?.owner),
    description: cleanString(biz?.description),
    location: cleanString(biz?.location),

    // lists / numbers
    tags: Array.isArray(biz?.tags) ? biz.tags.map(cleanString).filter(Boolean) : [],
    rating: typeof biz?.rating === "number" ? biz.rating : undefined,

    // contact-ish
    contact: cleanString(biz?.contact),
    url: normalizeUrl(biz?.url),

    socials: Array.isArray(biz?.socials)
      ? biz.socials
          .map((s) => ({
            label: cleanString(s?.label),
            href: normalizeUrl(s?.href),
          }))
          .filter((s) => s.label && s.href)
      : [],

    // temporary image mapping
    legacyImagePath: cleanString(biz?.image),
  };

  // Remove empty fields (Sanity import is happier + cleaner docs)
  for (const key of Object.keys(doc)) {
    const v = doc[key];
    if (v === undefined) delete doc[key];
    else if (typeof v === "string" && v.trim() === "") delete doc[key];
    else if (Array.isArray(v) && v.length === 0) delete doc[key];
  }

  // If url ended up empty, remove it
  if (doc.url === "") delete doc.url;

  lines.push(JSON.stringify(doc));
}

fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8");
console.log(`OK: wrote ${lines.length} entrepreneur docs to:\n${outputPath}`);