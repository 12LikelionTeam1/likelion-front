import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pathAlias from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), pathAlias()],
});
