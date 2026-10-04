import type { ReactNode } from "react";

/** All external links: noopener noreferrer, explicit https only. */
export function ExternalLink({
  href,
  children,
  className,
  rel,
  newTab = true,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Extra rel tokens, e.g. "me" for profile links. */
  rel?: string;
  newTab?: boolean;
  ariaLabel?: string;
}) {
  const relValue = ["noopener", "noreferrer", rel].filter(Boolean).join(" ");
  return (
    <a
      href={href}
      className={className}
      rel={relValue}
      target={newTab ? "_blank" : undefined}
      aria-label={ariaLabel}
    >
      {children}
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
