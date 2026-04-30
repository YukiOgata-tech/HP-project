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
        "border border-gray-300 rounded-lg overflow-hidden bg-white",
        className,
      ].join(" ")}
    >
      {editable && (
        <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      )}
      <EditorContent
        editor={editor}
        className="
          [&_.ProseMirror]:min-h-[320px]
          [&_.ProseMirror]:p-4
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:prose
          [&_.ProseMirror]:prose-sm
          [&_.ProseMirror]:max-w-none
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
          [&_.ProseMirror_table]:border-collapse
          [&_.ProseMirror_table]:w-full
          [&_.ProseMirror_td,&_.ProseMirror_th]:border
          [&_.ProseMirror_td,&_.ProseMirror_th]:border-gray-300
          [&_.ProseMirror_td,&_.ProseMirror_th]:p-2
          [&_.ProseMirror_th]:bg-gray-50
          [&_.ProseMirror_th]:font-semibold
          [&_.ProseMirror_blockquote]:border-l-4
          [&_.ProseMirror_blockquote]:border-gray-300
          [&_.ProseMirror_blockquote]:pl-4
          [&_.ProseMirror_blockquote]:text-gray-600
          [&_.ProseMirror_img]:max-w-full
          [&_.ProseMirror_img]:h-auto
          [&_.ProseMirror_img]:rounded
        "
      />
    </div>
  );
}
