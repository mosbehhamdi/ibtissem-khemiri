import { defineConfig } from 'vite';

// Relative base ('./') so the same build works on GitHub Pages
// (project sub-path) and on any OVH shared-hosting sub-folder
// without code changes.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
