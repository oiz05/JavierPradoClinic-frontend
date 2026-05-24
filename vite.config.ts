import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {  
        '/api': {
          target: env.VITE_API_TARGET || "https://cj-196a962e499340109b9631b8eef0bb37.ecs.sa-east-1.on.aws",
          changeOrigin: true,
        },
      },
    },
  };
});
