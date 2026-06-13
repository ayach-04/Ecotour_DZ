import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Share your experience, environmental note, seasonal question, or responsible tip...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-emerald-100 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-emerald-100 bg-zinc-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("bold")
              ? "bg-emerald-100 text-emerald-700"
              : "text-zinc-600 hover:bg-zinc-200"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("italic")
              ? "bg-emerald-100 text-emerald-700"
              : "text-zinc-600 hover:bg-zinc-200"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("strike")
              ? "bg-emerald-100 text-emerald-700"
              : "text-zinc-600 hover:bg-zinc-200"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-zinc-300" />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("bulletList")
              ? "bg-emerald-100 text-emerald-700"
              : "text-zinc-600 hover:bg-zinc-200"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("orderedList")
              ? "bg-emerald-100 text-emerald-700"
              : "text-zinc-600 hover:bg-zinc-200"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-zinc-300" />

        <button
          onClick={() => editor.chain().focus().toggleLink({ href: "" }).run()}
          disabled={!editor.can().chain().focus().toggleLink({ href: "" }).run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive("link")
              ? "bg-emerald-100 text-emerald-700"
              : "text-zinc-600 hover:bg-zinc-200"
          }`}
          title="Link"
        >
          <Link className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none focus:outline-none
            [&_.ProseMirror]:min-h-[300px]
            [&_.ProseMirror]:focus:outline-none
            [&_.ProseMirror_p]:text-zinc-900
            [&_.ProseMirror_p]:leading-relaxed
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:ml-4
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:ml-4
            [&_.ProseMirror_li]:text-zinc-900
            [&_.ProseMirror_a]:text-emerald-600
            [&_.ProseMirror_a]:underline
            [&_.ProseMirror_a]:cursor-pointer
            [&_.ProseMirror_blockquote]:border-l-4
            [&_.ProseMirror_blockquote]:border-emerald-300
            [&_.ProseMirror_blockquote]:pl-4
            [&_.ProseMirror_blockquote]:italic
            [&_.ProseMirror_blockquote]:text-zinc-600
            [&_.ProseMirror_code]:bg-zinc-100
            [&_.ProseMirror_code]:px-2
            [&_.ProseMirror_code]:py-1
            [&_.ProseMirror_code]:rounded
            [&_.ProseMirror_pre]:bg-zinc-900
            [&_.ProseMirror_pre]:text-white
            [&_.ProseMirror_pre]:p-4
            [&_.ProseMirror_pre]:rounded-lg
            [&_.ProseMirror_pre_code]:text-white
          "
        />
      </div>
    </div>
  );
}
