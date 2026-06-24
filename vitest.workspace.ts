import { fileURLToPath } from 'node:url';
import swc from 'unplugin-swc';
import react from '@vitejs/plugin-react-swc';
import { defineWorkspace } from 'vitest/config';

// Candidato: ponha os specs da API em tests/unit/api e tests/integration, e os da Web em tests/unit/web.
export default defineWorkspace([
  {
    plugins: [swc.vite({ module: { type: 'es6' } })],
    test: {
      name: 'api',
      environment: 'node',
      include: ['tests/unit/api/**/*.spec.ts', 'tests/integration/**/*.spec.ts'],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./apps/api/src', import.meta.url)),
      },
    },
  },
  {
    plugins: [react()],
    test: {
      name: 'web',
      environment: 'jsdom',
      include: ['tests/unit/web/**/*.{test,spec}.{ts,tsx}'],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./apps/web/src', import.meta.url)),
      },
    },
  },
]);
