import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikSpeakInline } from 'qwik-speak/inline';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    // build: {
    //   minify: false // To inspect production files
    // },
    plugins: [qwikCity(),
    qwikVite(),
    qwikSpeakInline({
      supportedLangs: ['en-US', 'en-EN', 'fr-FR'],
      defaultLang: 'en-EN',
      assetsPath: 'i18n'
    }),
    tsconfigPaths()],
    dev: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
