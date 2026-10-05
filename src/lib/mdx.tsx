import "server-only";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import { ExternalLink } from "@/components/ExternalLink";

/**
 * MDX is trusted, repo-authored content only (never user-submitted, never
 * fetched remotely). JS expressions are blocked (`blockJS`) and only the
 * components below can be used. Anything else renders as plain HTML.
 */

function A({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (/^https:\/\//.test(href)) return <ExternalLink href={href}>{children}</ExternalLink>;
  // Drop any other scheme (javascript:, data:, http:, …)
  return <span>{children}</span>;
}

function Img({ src, alt }: ComponentPropsWithoutRef<"img">) {
  // Only local, repo-hosted images. No remote image loading from MDX.
  if (typeof src !== "string" || !src.startsWith("/")) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <aside className="callout">{children}</aside>;
}

const components = { a: A, img: Img, Callout };

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      blockJS: true,
      blockDangerousJS: true,
    },
  });
  return content;
}
