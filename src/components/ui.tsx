import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-primary text-on-primary hover:bg-primary-strong"
      : "border border-line bg-paper text-primary hover:bg-primary-soft";
  const cls = `inline-flex h-12 w-full items-center justify-center rounded-md px-5 text-label font-label lg:w-auto ${styles} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-3 text-title font-title">
      {children}
    </h2>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1080px] px-4 ${className}`}>{children}</div>;
}

/** Logo: monogram + "Only Learn". Teks "Learn" memakai brand-teal (hanya untuk wordmark). */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span aria-label="Only Learn" className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/ol-mark.png" alt="" width={38} height={22} />
      <span aria-hidden="true" className="text-[16px] font-extrabold tracking-[-0.01em]">
        <span className="text-primary">Only</span> <span className="text-brand-teal">Learn</span>
      </span>
    </span>
  );
}
