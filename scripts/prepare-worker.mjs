import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(rootDir, "dist", "server", "wrangler.json");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));

delete config.legacy_env;

await fs.writeFile(configPath, `${JSON.stringify(config)}\n`);
console.log("Prepared the generated Worker configuration for Cloudflare.");
