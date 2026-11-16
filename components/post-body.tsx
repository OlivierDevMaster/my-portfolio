import type { PostBlock } from "@/lib/posts";

/** Renders text with `backtick` spans as inline code. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={index}
            className="rounded bg-gray-100 [overflow-wrap:anywhere] px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-900"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6 text-[17px] leading-[1.75] text-gray-700 md:text-lg">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="!mt-12 scroll-mt-24 font-inter-tight text-2xl font-normal leading-snug tracking-tight text-neutral-950 md:!mt-14 md:text-3xl"
              >
                <Inline text={block.text} />
              </h2>
            );
          case "p":
            return (
              <p key={index}>
                <Inline text={block.text} />
              </p>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`space-y-3 pl-6 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-violet-600`}
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </ListTag>
            );
          }
          case "code":
            return (
              <figure
                key={index}
                className="!my-8 overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
              >
                <figcaption className="px-4 pt-3 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                  {block.lang}
                </figcaption>
                <pre className="overflow-x-auto px-4 pb-4 pt-2 font-mono text-[13px] leading-relaxed text-neutral-900 md:text-sm">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "note":
            return (
              <aside
                key={index}
                className="!my-8 rounded-r-lg border-l-2 border-violet-600 bg-violet-50/60 px-5 py-4 text-base leading-relaxed text-gray-700"
              >
                <Inline text={block.text} />
              </aside>
            );
        }
      })}
    </div>
  );
}
