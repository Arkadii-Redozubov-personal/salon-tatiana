import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const partialsDir = path.resolve(__dirname, 'src/partials');

function loadPartial(name) {
  const filePath = path.join(partialsDir, name);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function htmlPartialsPlugin() {
  const partialNames = ['head-meta.html', 'header.html', 'menu-drawer.html', 'footer.html', 'mobile-bar.html'];

  return {
    name: 'html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        let result = html;
        for (const name of partialNames) {
          const token = `<!-- @include:${name} -->`;
          if (result.includes(token)) {
            result = result.replaceAll(token, loadPartial(name));
          }
        }

        const routeKeyMatch = result.match(/data-page="([^"]+)"/);
        const activePage = routeKeyMatch ? routeKeyMatch[1] : 'home';

        result = result.replace(
          new RegExp(`data-nav="${activePage}"`, 'g'),
          `data-nav="${activePage}" class="is-active" aria-current="page"`
        );

        if (ctx?.server) {
          for (const name of partialNames) {
            ctx.server.watcher.add(path.join(partialsDir, name));
          }
        }

        return result;
      }
    }
  };
}

export default defineConfig({
  plugins: [htmlPartialsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        services: path.resolve(__dirname, 'services/index.html'),
        portfolio: path.resolve(__dirname, 'portfolio/index.html'),
        about: path.resolve(__dirname, 'about/index.html'),
        booking: path.resolve(__dirname, 'booking/index.html'),
        privacy: path.resolve(__dirname, 'privacy/index.html')
      }
    }
  }
});

