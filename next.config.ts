import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Avoid workspace-root confusion when a parent directory has another lockfile */
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
