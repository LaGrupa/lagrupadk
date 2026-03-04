import fs from "node:fs";
import path from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2024-01-01"});

// Where your files live on disk:
const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");

function filePathFromLegacy(legacyImagePath) {
  // legacyImagePath like: "/biblioteca/foo.jpg"
  const rel = legacyImagePath.replace(/^\//, "");
  return path.join(publicDir, rel);
}

const query = `
*[_type=="book" && locale=="es" && defined(legacyImagePath)]{
  _id,
  title,
  legacyImagePath,
  coverImage
}
`;

const books = await client.fetch(query);
console.log(`Found ${books.length} ES books with legacyImagePath`);

let patched = 0;

for (const b of books) {
  if (!b.legacyImagePath) continue;

  // Skip if already has coverImage
  if (b.coverImage?.asset?._ref) {
    console.log(`- SKIP (already has coverImage): ${b.title}`);
    continue;
  }

  const fp = filePathFromLegacy(b.legacyImagePath);

  if (!fs.existsSync(fp)) {
    console.log(`- MISSING FILE: ${b.title} -> ${b.legacyImagePath} -> ${fp}`);
    continue;
  }

  console.log(`- Uploading: ${b.title} (${b.legacyImagePath})`);

  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(fp),
    {filename: path.basename(fp)}
  );

  await client
    .patch(b._id)
    .set({
      coverImage: {asset: {_type: "reference", _ref: asset._id}},
      coverAlt: b.title,
    })
    .commit({autoGenerateArrayKeys: true});

  patched++;
  console.log(`  ✓ linked asset ${asset._id}`);
}

console.log(`Done. Patched ${patched} books.`);
