import type { ReactNode } from "react";

/** Hero dengan kartu kaca di atas latar gradasi lembut dan dua lingkaran dekoratif. */
export function GlassHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#E3F3F6] to-[#F5FAFB] px-4 py-5 lg:mx-auto lg:w-[calc(100%-2rem)] lg:max-w-[1048px] lg:px-10 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute -left-12 -top-14 h-[170px] w-[170px] rounded-full bg-brand-cyan lg:h-[260px] lg:w-[260px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-10 h-[150px] w-[150px] rounded-full bg-brand-teal opacity-55 lg:h-[240px] lg:w-[240px]"
      />
      <div className="glass relative rounded-[18px] p-4 lg:max-w-[680px] lg:p-8">{children}</div>
    </section>
  );
}
