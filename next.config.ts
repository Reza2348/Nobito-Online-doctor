import type { NextConfig } from "next";

// آدرس بک‌اند (در production مقدار NEXT_PUBLIC_API_URL را ست کنید)
const backendUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
);

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yvafbrsbeisaqtdsdowr.supabase.co",
      },
      // عکس‌های ذخیره‌شده در MongoDB که از بک‌اند سرو می‌شوند
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/api/photos/**",
      },
    ],
  },
};

export default nextConfig;
