import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',

  build: {
    // Enable minification with esbuild (built into Vite, faster than terser)
    minify: 'esbuild',

    // CSS code splitting - loads CSS per chunk
    cssCodeSplit: true,

    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Manual chunk splitting for optimal caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk - React, React DOM, React Router
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // Three.js chunk - heavy 3D library
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Animation chunk - Framer Motion
          'motion': ['framer-motion'],
          // Utilities chunk
          'utils': ['lenis', '@emailjs/browser'],
        },
        // Use hashed filenames for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Increase chunk size warning limit (Three.js is large)
    chunkSizeWarningLimit: 600,
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})

