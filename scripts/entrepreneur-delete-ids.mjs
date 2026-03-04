// scripts/entrepreneur-delete-ids.mjs
import fs from "node:fs";

const ndjson = fs.readFileSync("./scripts/entrepreneur-import.es.ndjson", "utf8");
const ids = ndjson
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line)._id)
  .filter(Boolean);

fs.writeFileSync("./scripts/entrepreneur-import.es.ids.txt", ids.join("\n") + "\n", "utf8");
console.log(`OK: wrote ${ids.length} ids to scripts/entrepreneur-import.es.ids.txt`);