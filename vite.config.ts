import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  const apiKey = env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Safely expose the API_KEY to the client-side code
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
});