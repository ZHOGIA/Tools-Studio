// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false // Menyembunyikan panel Astro di pojok kiri bawah
  },
  server: {
    port: 3000, // Anda bisa mengubah angka ini sesuai dengan port yang Anda inginkan
  },
  vite: {
    server: {
      allowedHosts: true, // Mengizinkan diakses lewat domain public (Cloudflare/Ngrok)
    }
  }
});
