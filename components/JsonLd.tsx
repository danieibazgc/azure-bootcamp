// Renders a JSON-LD <script> tag for structured data (see
// https://json-ld.org/). JSON.stringify doesn't sanitize the "<" character,
// so a literal "</script>" inside any field could break out of the tag;
// escaping it to \u003c (per Next.js's own JSON-LD guide) prevents that.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
