// Builds the site into dist/: copies public/ and minifies the HTML
// (including its inline CSS). Cloudflare Pages publishes dist/.
const fs = require('node:fs');
const path = require('node:path');
const { minify } = require('html-minifier-terser');

const SRC = path.join(__dirname, '..', 'public');
const OUT = path.join(__dirname, '..', 'dist');

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.cpSync(SRC, OUT, { recursive: true });

  const htmlFiles = fs.readdirSync(OUT, { recursive: true }).filter((file) => file.endsWith('.html'));
  for (const file of htmlFiles) {
    const target = path.join(OUT, file);
    const source = fs.readFileSync(target, 'utf8');
    const minified = await minify(source, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });
    fs.writeFileSync(target, minified);
    console.log(`${file}: ${source.length} -> ${minified.length} bytes`);
  }
  console.log(`Built ${path.relative(process.cwd(), OUT)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
