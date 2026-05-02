import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Lightweight markdown + LaTeX renderer for AI tutor responses.
 * Supports: $$display$$, $inline$, **bold**, *italic*, `code`, lists, paragraphs.
 * Avoids react-markdown to keep bundle small and SSR safe.
 */
function renderMath(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: "ignore",
      output: "html",
    });
  } catch {
    return `<code>${escapeHtml(tex)}</code>`;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
  // Inline math first, with placeholders to avoid markdown collisions
  const placeholders: string[] = [];
  let working = text.replace(/\$([^$\n]+?)\$/g, (_m, tex) => {
    placeholders.push(renderMath(tex, false));
    return `\u0000${placeholders.length - 1}\u0000`;
  });

  working = escapeHtml(working);
  // Bold
  working = working.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic
  working = working.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  // Inline code
  working = working.replace(/`([^`]+)`/g, '<code class="rounded bg-muted px-1 py-0.5 text-xs">$1</code>');

  // Restore math
  working = working.replace(/\u0000(\d+)\u0000/g, (_m, i) => placeholders[Number(i)]);
  return working;
}

function renderBlocks(md: string): string {
  // Extract display math blocks first
  const blocks: string[] = [];
  let working = md.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex) => {
    blocks.push(`<div class="my-3 overflow-x-auto">${renderMath(tex.trim(), true)}</div>`);
    return `\u0001${blocks.length - 1}\u0001`;
  });

  const lines = working.split("\n");
  const out: string[] = [];
  let listType: "ol" | "ul" | null = null;
  const flushList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    // Restore display math placeholder lines
    const phMatch = line.match(/^\u0001(\d+)\u0001$/);
    if (phMatch) {
      flushList();
      out.push(blocks[Number(phMatch[1])]);
      continue;
    }
    // Headings
    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      flushList();
      const lvl = h[1].length + 2; // h3,h4,h5
      out.push(`<h${lvl} class="font-display mt-4 mb-2 text-lg">${renderInline(h[2])}</h${lvl}>`);
      continue;
    }
    // Ordered list
    const ol = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ol) {
      if (listType !== "ol") {
        flushList();
        out.push('<ol class="ml-5 list-decimal space-y-1.5 my-2">');
        listType = "ol";
      }
      out.push(`<li>${renderInline(ol[1])}</li>`);
      continue;
    }
    // Unordered list
    const ul = line.match(/^\s*[-*]\s+(.+)$/);
    if (ul) {
      if (listType !== "ul") {
        flushList();
        out.push('<ul class="ml-5 list-disc space-y-1.5 my-2">');
        listType = "ul";
      }
      out.push(`<li>${renderInline(ul[1])}</li>`);
      continue;
    }
    flushList();
    out.push(`<p class="my-2 leading-relaxed">${renderInline(line)}</p>`);
  }
  flushList();
  // Restore any leftover placeholders that were inline (shouldn't happen)
  let html = out.join("\n");
  html = html.replace(/\u0001(\d+)\u0001/g, (_m, i) => blocks[Number(i)]);
  return html;
}

export function MathMarkdown({ content }: { content: string }) {
  const html = useMemo(() => renderBlocks(content), [content]);
  return (
    <div
      className="text-sm text-foreground [&_strong]:text-gold"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
