import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import compression from 'vite-plugin-compression';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: "default",
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: "**/*.svg?react",
        }),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            react: path.resolve(__dirname, "./node_modules/react"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
            "react-router-dom": path.resolve(__dirname, "./node_modules/react-router-dom"),
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext'
        }
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-motion': ['framer-motion'],
                    'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', 'three-globe'],
                    'vendor-ui': ['lucide-react', '@radix-ui/react-hover-card', '@radix-ui/react-slot'],
                }
            }
        }
    }
})
