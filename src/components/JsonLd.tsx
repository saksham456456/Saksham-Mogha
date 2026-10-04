import { headers } from "next/headers";
import { serializeJsonLd } from "@/lib/seo";

/**
 * The ONLY place dangerouslySetInnerHTML is used: JSON-LD, built from our
 * own typed content and serialized with `<` escaped as \u003c.
 */
export async function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
