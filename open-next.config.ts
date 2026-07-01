import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// Avoids recursing into `npm run build` (which itself runs this Cloudflare build).
config.buildCommand = "npx next build";

export default config;