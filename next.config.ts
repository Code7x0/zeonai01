import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // IDE / CDP browser often hits 127.0.0.1; allow HMR + client chunks
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
