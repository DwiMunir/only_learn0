import { site } from "@/lib/site";
import { ButtonLink } from "./ui";

export function LeadMagnet() {
  const lm = site.leadMagnet;
  if (!lm.enabled) return null;
  return (
    <section aria-labelledby="lead-magnet" className="rounded-lg bg-surface p-6">
      <h2 id="lead-magnet" className="text-title font-title">
        {lm.title}
      </h2>
      <p className="mt-2 mb-5 text-body text-ink">{lm.body}</p>
      <ButtonLink href={lm.href} external>
        {lm.cta}
      </ButtonLink>
    </section>
  );
}
