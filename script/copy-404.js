import { copyFile, stat } from "fs/promises";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");

async function main() {
  const hasIndex = await stat(indexPath).then(() => true).catch(() => false);
  if (!hasIndex) {
    console.error("index.html not found in dist; did the build run?");
    process.exit(1);
  }

  await copyFile(indexPath, fallbackPath);
  console.log("Copied dist/index.html to dist/404.html for GitHub Pages SPA routing.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
