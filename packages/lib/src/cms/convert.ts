import "server-only";
import sanitizeHtml from "sanitize-html";
import type { JSONContent } from "@tiptap/core";

type Mark = {
  type?: string;
  attrs?: Record<string, unknown>;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderAttrs(attrs: Record<string, string | number | undefined>): string {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => ` ${key}="${escapeHtml(String(value))}"`)
    .join("");
}

function renderStyle(node: JSONContent): string | undefined {
  const textAlign = typeof node.attrs?.textAlign === "string" ? node.attrs.textAlign : undefined;
  if (!textAlign || !["left", "center", "right", "justify"].includes(textAlign)) {
    return undefined;
  }
  return `text-align:${textAlign}`;
}

function renderText(text: string, marks?: Mark[]): string {
  let html = escapeHtml(text);

  for (const mark of marks ?? []) {
    switch (mark.type) {
      case "bold":
        html = `<strong>${html}</strong>`;
        break;
      case "italic":
        html = `<em>${html}</em>`;
        break;
      case "underline":
        html = `<u>${html}</u>`;
        break;
      case "strike":
        html = `<s>${html}</s>`;
        break;
      case "link": {
        const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "";
        const target = typeof mark.attrs?.target === "string" ? mark.attrs.target : "_blank";
        const rel = typeof mark.attrs?.rel === "string" ? mark.attrs.rel : "noopener noreferrer";
        html = `<a${renderAttrs({ href, target, rel })}>${html}</a>`;
        break;
      }
      default:
        break;
    }
  }

  return html;
}

function renderChildren(node?: JSONContent): string {
  return (node?.content ?? []).map(renderNode).join("");
}

function renderTableCell(
  tagName: "td" | "th",
  node: JSONContent,
): string {
  const colspan = typeof node.attrs?.colspan === "number" ? node.attrs.colspan : undefined;
  const rowspan = typeof node.attrs?.rowspan === "number" ? node.attrs.rowspan : undefined;
  const style = renderStyle(node);
  return `<${tagName}${renderAttrs({ colspan, rowspan, style })}>${renderChildren(node)}</${tagName}>`;
}

function renderNode(node: JSONContent): string {
  switch (node.type) {
    case "doc":
      return renderChildren(node);
    case "text":
      return renderText(node.text ?? "", node.marks as Mark[] | undefined);
    case "paragraph": {
      const style = renderStyle(node);
      return `<p${renderAttrs({ style })}>${renderChildren(node)}</p>`;
    }
    case "heading": {
      const rawLevel = typeof node.attrs?.level === "number" ? node.attrs.level : 2;
      const level = Math.min(6, Math.max(1, rawLevel));
      const style = renderStyle(node);
      return `<h${level}${renderAttrs({ style })}>${renderChildren(node)}</h${level}>`;
    }
    case "bulletList":
      return `<ul>${renderChildren(node)}</ul>`;
    case "orderedList":
      return `<ol>${renderChildren(node)}</ol>`;
    case "listItem":
      return `<li>${renderChildren(node)}</li>`;
    case "blockquote":
      return `<blockquote>${renderChildren(node)}</blockquote>`;
    case "horizontalRule":
      return "<hr>";
    case "hardBreak":
      return "<br>";
    case "image": {
      const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      const title = typeof node.attrs?.title === "string" ? node.attrs.title : "";
      const width = typeof node.attrs?.width === "number" ? node.attrs.width : undefined;
      const height = typeof node.attrs?.height === "number" ? node.attrs.height : undefined;
      return `<img${renderAttrs({ src, alt, title, width, height })}>`;
    }
    case "table":
      return `<table><tbody>${renderChildren(node)}</tbody></table>`;
    case "tableRow":
      return `<tr>${renderChildren(node)}</tr>`;
    case "tableCell":
      return renderTableCell("td", node);
    case "tableHeader":
      return renderTableCell("th", node);
    default:
      return renderChildren(node);
  }
}

export function tiptapJsonToHtml(content: JSONContent): string {
  const rawHtml = renderNode(content);
  return sanitizeHtml(rawHtml, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "u",
      "hr",
      "br",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "target", "rel"],
      th: ["colspan", "rowspan", "style"],
      td: ["colspan", "rowspan", "style"],
      p: ["style"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      h5: ["style"],
      h6: ["style"],
      "*": ["class"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
  });
}
