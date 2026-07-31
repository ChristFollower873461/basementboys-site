import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(rootDir, ".openai", "hosting.json");
const destinationDir = path.join(rootDir, "dist", ".openai");

await fs.mkdir(destinationDir, { recursive: true });
await fs.copyFile(source, path.join(destinationDir, "hosting.json"));

console.log("Staged hosting metadata in dist/.openai/hosting.json.");
