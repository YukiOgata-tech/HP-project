"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import type { JSONContent } from "@tiptap/core";
import { EditorToolbar } from "./EditorToolbar";

export interface TiptapEditorProps {
  initialContent?: JSONContent;
  onChange?: (content: JSONContent) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

export function TiptapEditor({
  initialContent,
  onChange,
  onImageUpload,
  placeholder = "本文を入力してください...",
  editable = true,
  className = "",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ code: false, codeBlock: false }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent ?? { type: "doc", content: [] },
    editable,
    onUpdate({ editor }) {
      onChange?.(editor.getJSON());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div
      className={[
        "min-w-0 max-w-full overflow-hidden rounded-lg border border-gray-400 bg-white",
        className,
      ].join(" ")}
    >
      {editable && (
        <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      )}
      <EditorContent
        editor={editor}
        className="
          min-w-0
          max-w-full
          overflow-x-auto
          [&_.ProseMirror]:min-h-[260px]
          sm:[&_.ProseMirror]:min-h-[320px]
          [&_.ProseMirror]:min-w-0
          [&_.ProseMirror]:p-3
          sm:[&_.ProseMirror]:p-4
          [&_.ProseMirror]:text-sm
          sm:[&_.ProseMirror]:text-base
          [&_.ProseMirror]:text-[#1f2933]
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:prose
          [&_.ProseMirror]:prose-sm
          sm:[&_.ProseMirror]:prose-base
          [&_.ProseMirror]:max-w-none
          [&_.ProseMirror_h1]:mb-3
          [&_.ProseMirror_h1]:mt-6
          sm:[&_.ProseMirror_h1]:mb-4
          sm:[&_.ProseMirror_h1]:mt-8
          [&_.ProseMirror_h1]:border-b
          [&_.ProseMirror_h1]:border-gray-300
          [&_.ProseMirror_h1]:pb-1.5
          sm:[&_.ProseMirror_h1]:pb-2
          [&_.ProseMirror_h1]:text-2xl
          sm:[&_.ProseMirror_h1]:text-3xl
          [&_.ProseMirror_h1]:font-black
          [&_.ProseMirror_h1]:leading-tight
          [&_.ProseMirror_h1]:text-gray-950
          [&_.ProseMirror_h2]:mb-2.5
          [&_.ProseMirror_h2]:mt-5
          sm:[&_.ProseMirror_h2]:mb-3
          sm:[&_.ProseMirror_h2]:mt-7
          [&_.ProseMirror_h2]:border-l-4
          [&_.ProseMirror_h2]:border-gray-700
          [&_.ProseMirror_h2]:pl-2.5
          sm:[&_.ProseMirror_h2]:pl-3
          [&_.ProseMirror_h2]:text-xl
          sm:[&_.ProseMirror_h2]:text-2xl
          [&_.ProseMirror_h2]:font-black
          [&_.ProseMirror_h2]:leading-tight
          [&_.ProseMirror_h2]:text-gray-950
          [&_.ProseMirror_h3]:mb-2
          [&_.ProseMirror_h3]:mt-4
          sm:[&_.ProseMirror_h3]:mt-6
          [&_.ProseMirror_h3]:text-lg
          sm:[&_.ProseMirror_h3]:text-xl
          [&_.ProseMirror_h3]:font-bold
          [&_.ProseMirror_h3]:leading-snug
          [&_.ProseMirror_h3]:text-gray-900
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-500
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
          [&_.ProseMirror_table]:border-collapse
          [&_.ProseMirror_table]:min-w-max
          [&_.ProseMirror_table]:w-full
          [&_.ProseMirror_td,&_.ProseMirror_th]:border
          [&_.ProseMirror_td,&_.ProseMirror_th]:border-gray-400
          [&_.ProseMirror_td,&_.ProseMirror_th]:p-1.5
          sm:[&_.ProseMirror_td,&_.ProseMirror_th]:p-2
          [&_.ProseMirror_th]:bg-gray-100
          [&_.ProseMirror_th]:font-semibold
          [&_.ProseMirror_blockquote]:border-l-4
          [&_.ProseMirror_blockquote]:border-gray-400
          [&_.ProseMirror_blockquote]:pl-3
          sm:[&_.ProseMirror_blockquote]:pl-4
          [&_.ProseMirror_blockquote]:text-gray-700
          [&_.ProseMirror_img]:max-w-full
          [&_.ProseMirror_img]:h-auto
          [&_.ProseMirror_img]:rounded
        "
      />
    </div>
  );
}
