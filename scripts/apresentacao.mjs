import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const output = new URL("../../Agenda Querida.html", import.meta.url);
const readBuilt = (path) => readFileSync(new URL(path.replace(/^\//, ""), dist));
const mime = { ".woff2": "font/woff2", ".webp": "image/webp", ".svg": "image/svg+xml" };
const assetCache = new Map();

function inlineAssets(source) {
  return source.replace(/\/(?:fonts\/[\w.-]+\.woff2|images\/[\w.-]+\.webp|marca\.svg)\b/g, (path) => {
    if (!assetCache.has(path)) {
      assetCache.set(path, `data:${mime[extname(path)]};base64,${readBuilt(path).toString("base64")}`);
    }
    return assetCache.get(path);
  });
}

const notices = readdirSync(new URL("fonts/", dist))
  .filter((name) => name.startsWith("OFL-"))
  .map((name) => readBuilt("fonts/" + name).toString("utf8"));
for (const name of ["react", "react-dom", "scheduler", "lucide-react", "react-icons", "tailwindcss"]) {
  const license = readFileSync(new URL(`../node_modules/${name}/LICENSE`, import.meta.url), "utf8");
  notices.push(name + "\n" + license);
}

const html = readBuilt("index.html").toString("utf8")
  .replace(/\s*<link\b[^>]*rel="(?:canonical|preload|modulepreload)"[^>]*>/gi, "")
  .replace(/\s*<meta\b[^>]*property="og:image"[^>]*>/gi, "")
  .replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/gi, (_, path) => {
    const js = inlineAssets(readBuilt(path).toString("utf8")).replace(/<\/script/gi, "<\\/script");
    return `<script type="module">\n${js}\n</script>`;
  })
  .replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi, (_, path) => {
    return `<style>\n${inlineAssets(readBuilt(path).toString("utf8"))}\n</style>`;
  })
  .replace(/href="\/marca\.svg"/g, (link) => inlineAssets(link))
  .replace("</body>", () => `<script type="text/plain" id="licencas">\n${notices.join("\n\n")}</script>\n  </body>`);

writeFileSync(output, html);
console.log(`Apresentação pronta em ${fileURLToPath(output)}`);
