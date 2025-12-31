import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks - separate heavy dependencies (npm packages)
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
          }
          
          // Homepage sections (below-the-fold lazy-loaded)
          if (id.includes('/components/About.jsx') ||
              id.includes('/components/Faq.jsx') ||
              id.includes('/components/FlagshipEvent.jsx') ||
              id.includes('/components/ExpertTalk.jsx') ||
              id.includes('/components/Sponsors.jsx')) {
            return 'home-sections';
          }
          
          // 3D model component separate (uses Three.js)
          if (id.includes('/components/ScrollModel.jsx')) {
            return 'home-3d';
          }
          
          // Contact page
          if (id.includes('/components/Contact.jsx')) {
            return 'pages-contact';
          }
          
          // Group page components by feature
          if (id.includes('/pages/Gallery.jsx') ||
              id.includes('/pages/Schedule.jsx') ||
              id.includes('/pages/Team.jsx') ||
              id.includes('/pages/DevTeam.jsx')) {
            return 'pages-main';
          }
          
          if (id.includes('/pages/EventDetails.jsx') ||
              id.includes('/pages/WorkshopDetails.jsx')) {
            return 'pages-details';
          }
          
          // Constants/data chunks
          if (id.includes('/constants/')) {
            return 'data';
          }
        },
      },
    },
  },
})
