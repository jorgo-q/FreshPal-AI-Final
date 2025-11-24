import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Fix for: Property 'cwd' does not exist on type 'Process'
declare const process: { cwd: () => string; env: Record<string, any> };

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This ensures 'process.env.API_KEY' in your code is replaced by the actual value during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});