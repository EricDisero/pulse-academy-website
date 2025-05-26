import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    compress({
      CSS: true,
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true
        }
      },
      Image: false, // We'll handle images separately
      JavaScript: true,
      SVG: true,
    })
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    },
    ssr: {
      noExternal: ['astro-compress']
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
}); 