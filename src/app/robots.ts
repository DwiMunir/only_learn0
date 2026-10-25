import type { MetadataRoute } from "next";
import { showDrafts } from "@/lib/content";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (showDrafts()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
