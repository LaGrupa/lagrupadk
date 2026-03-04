// scripts/extract-emprendedoras-json.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, "src", "app", "[locale]", "emprendedoras", "page.tsx");
const outPath = path.join(repoRoot, "scripts", "emprendedoras.es.json");

if (!fs.existsSync(sourcePath)) {
  console.error(`Source file not found:\n${sourcePath}`);
  process.exit(1);
}

const src = fs.readFileSync(sourcePath, "utf8");

// Grab: const businesses ... = [ ... ];
const match = src.match(/const\s+businesses\s*:\s*Biz\[\]\s*=\s*(\[[\s\S]*?\]);/m);
if (!match) {
  console.error(`Could not find "const businesses: Biz[] = [...]" in:\n${sourcePath}`);
  process.exit(1);
}

let arrayLiteralWithSemicolon = match[1]; // includes trailing "];"

// Remove JS single-line comments safely (your data has //contact: etc)
arrayLiteralWithSemicolon = arrayLiteralWithSemicolon.replace(/(^|\s)\/\/.*$/gm, "");

// Evaluate as JavaScript in a sandboxed VM context.
// This works because the businesses array is plain object literals + arrays + strings/numbers.
let businesses;
try {
  const code = `(${arrayLiteralWithSemicolon.replace(/;$/, "")})`;
  businesses = vm.runInNewContext(code, {}, { timeout: 1000 });
} catch (err) {
  console.error("Failed evaluating extracted array. Error:");
  console.error(err);
  process.exit(1);
}

if (!Array.isArray(businesses)) {
  console.error("Extracted value is not an array. Aborting.");
  process.exit(1);
}

// Write clean JSON
fs.writeFileSync(outPath, JSON.stringify(businesses, null, 2) + "\n", "utf8");

console.log(`OK: wrote ${businesses.length} items to:\n${outPath}`);