import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin,
} from "@remix-run/dev";
import { getLoadContext } from "./load-context";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({ getLoadContext }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ssr: true,
      routes: (defineRoutes) =>
        defineRoutes((route) => {
          route("/", "pages/Home.tsx", { index: true });
          route("/login", "pages/Login.tsx", { index: true });
        }),
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 5174,
  },
});
