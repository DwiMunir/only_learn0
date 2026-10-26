import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { GlassHero } from "@/components/hero";
import { TopBar } from "@/components/top-bar";
import { Container } from "@/components/ui";
import { renderMdx } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tentang",
  alternates: { canonical: "/tentang" },
};

/** Isi halaman ada di content/halaman/tentang.mdx supaya bisa diedit tanpa menyentuh kode. */
export default async function AboutPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "halaman", "tentang.mdx"), "utf8");
  const { data, content } = matter(raw);
  const body = await renderMdx(content, {});

  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} />
      <main>
        <GlassHero>
          <h1 className="text-headline font-headline text-primary">{String(data.title ?? "Tentang")}</h1>
        </GlassHero>
        <Container>
          <div className="max-w-[680px] pt-6">
            <div className="prose-artikel">{body}</div>
          </div>
        </Container>
      </main>
    </>
  );
}
