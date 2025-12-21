"use client";

/**
 * Hazo UI Rich Text Editor Component
 *
 * A comprehensive rich text editor for email template generation with
 * variable insertion support, file attachments, and full formatting controls.
 */

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import { cn } from "../../lib/utils";
import { Toolbar } from "./toolbar/toolbar";
import { AttachmentsList } from "./attachments/attachments_list";
import { FontSizeExtension } from "./extensions/font_size_extension";
import { VariableExtension } from "./extensions/variable_extension";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import type {
  HazoUiRteProps,
  RteOutput,
  RteAttachment,
  RteVariable,
} from "./types";

// Re-export types for external use
export type { HazoUiRteProps, RteOutput, RteAttachment, RteVariable };

/**
 * Debounce utility for rate-limiting callbacks
 */
function debounce_fn<T extends RteOutput>(
  func: (output: T) => void,
  wait: number
): (output: T) => void {
  let timeout_id: ReturnType<typeof setTimeout> | null = null;

  return (output: T) => {
    if (timeout_id) {
      clearTimeout(timeout_id);
    }
    timeout_id = setTimeout(() => {
      func(output);
    }, wait);
  };
}

/**
 * HazoUiRte - Rich Text Editor Component
 */
export const HazoUiRte: React.FC<HazoUiRteProps> = ({
  html = "",
  attachments: initial_attachments = [],
  variables = [],
  on_change,
  placeholder = "Start typing...",
  min_height = "200px",
  max_height = "400px",
  disabled = false,
  className,
  show_output_viewer = false,
}) => {
  const [attachments, set_attachments] = React.useState<RteAttachment[]>(
    initial_attachments
  );
  const [active_tab, set_active_tab] = React.useState<"html" | "plain_text" | "raw_html">("html");

  // Determine if toolbar should be disabled (view-only modes)
  const is_view_only = active_tab !== "html";

  // Store latest attachments in a ref for the debounced callback
  const attachments_ref = React.useRef(attachments);
  attachments_ref.current = attachments;

  // Create debounced change handler
  const debounced_on_change = React.useMemo(
    () =>
      debounce_fn<RteOutput>((output: RteOutput) => {
        if (on_change) {
          on_change(output);
        }
      }, 300),
    [on_change]
  );

  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      FontFamily,
      FontSizeExtension,
      Underline,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "cls_rte_link text-primary underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "cls_rte_image max-w-full h-auto rounded",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      HorizontalRule,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "cls_rte_table border-collapse w-full",
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-border p-2",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-border p-2 bg-muted font-semibold",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "cls_rte_task_list list-none pl-0",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "cls_rte_task_item flex items-start gap-2",
        },
      }),
      VariableExtension,
    ],
    content: html,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: cn(
          "cls_rte_editor",
          "prose prose-sm dark:prose-invert max-w-none",
          "p-4 focus:outline-none",
          "min-h-[inherit] overflow-auto"
        ),
        style: `min-height: ${min_height}; max-height: ${max_height}`,
      },
    },
    onUpdate: ({ editor }) => {
      const output: RteOutput = {
        html: editor.getHTML(),
        plain_text: editor.getText(),
        attachments: attachments_ref.current,
      };
      debounced_on_change(output);
    },
  });

  // Update editor content when html prop changes externally
  React.useEffect(() => {
    if (editor && html !== undefined) {
      const current_html = editor.getHTML();
      // Only update if content is actually different to avoid cursor jumps
      if (html !== current_html && !editor.isFocused) {
        editor.commands.setContent(html, { emitUpdate: false });
      }
    }
  }, [html, editor]);

  // Update editor editable state when disabled changes
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  // Track if attachments were set from props to avoid circular updates
  const attachments_from_props_ref = React.useRef(false);
  const prev_initial_attachments_ref = React.useRef(initial_attachments);

  // Sync attachments with initial prop (only if changed externally)
  React.useEffect(() => {
    // Only update if initial_attachments actually changed (not from our own on_change)
    if (JSON.stringify(initial_attachments) !== JSON.stringify(prev_initial_attachments_ref.current)) {
      prev_initial_attachments_ref.current = initial_attachments;
      attachments_from_props_ref.current = true;
      set_attachments(initial_attachments);
    }
  }, [initial_attachments]);

  // Notify parent when attachments change (but not if set from props)
  React.useEffect(() => {
    if (attachments_from_props_ref.current) {
      attachments_from_props_ref.current = false;
      return;
    }
    if (editor && on_change) {
      const output: RteOutput = {
        html: editor.getHTML(),
        plain_text: editor.getText(),
        attachments,
      };
      on_change(output);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachments]);

  // Handle attachment removal
  const handle_remove_attachment = (index: number) => {
    set_attachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle attachments change from toolbar
  const handle_attachments_change = (new_attachments: RteAttachment[]) => {
    set_attachments(new_attachments);
  };

  // Format HTML with indentation for raw view
  const format_html = (html_str: string): string => {
    let formatted = "";
    let indent = 0;
    const tags = html_str.split(/(<[^>]+>)/g).filter(Boolean);

    for (const tag of tags) {
      if (tag.startsWith("</")) {
        indent = Math.max(0, indent - 1);
        formatted += "  ".repeat(indent) + tag + "\n";
      } else if (tag.startsWith("<") && !tag.startsWith("<!") && !tag.endsWith("/>")) {
        formatted += "  ".repeat(indent) + tag + "\n";
        if (!tag.includes("br") && !tag.includes("hr") && !tag.includes("img")) {
          indent++;
        }
      } else if (tag.startsWith("<")) {
        formatted += "  ".repeat(indent) + tag + "\n";
      } else if (tag.trim()) {
        formatted += "  ".repeat(indent) + tag.trim() + "\n";
      }
    }
    return formatted.trim();
  };

  return (
    <div
      className={cn(
        "cls_rte_container",
        "rounded-md border border-input bg-background",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Toolbar - always visible, disabled in view-only modes */}
      <Toolbar
        editor={editor}
        variables={variables}
        attachments={attachments}
        on_attachments_change={handle_attachments_change}
        disabled={disabled || is_view_only}
      />

      {/* View Mode Tabs */}
      {show_output_viewer && editor && (
        <div className="cls_rte_tabs border-b border-border px-2 pt-2">
          <Tabs value={active_tab} onValueChange={(v) => set_active_tab(v as typeof active_tab)}>
            <TabsList className="h-9">
              <TabsTrigger value="html" className="text-sm">HTML</TabsTrigger>
              <TabsTrigger value="plain_text" className="text-sm">Plain Text</TabsTrigger>
              <TabsTrigger value="raw_html" className="text-sm">Raw HTML</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Content Area */}
      <div style={{ minHeight: min_height, maxHeight: max_height }} className="overflow-auto">
        {/* HTML Edit Mode */}
        {active_tab === "html" && (
          <EditorContent
            editor={editor}
            className={cn(
              "cls_rte_content",
              disabled && "pointer-events-none"
            )}
          />
        )}

        {/* Plain Text View */}
        {active_tab === "plain_text" && (
          <pre className="cls_rte_plain_text p-4 text-sm whitespace-pre-wrap font-mono h-full">
            {editor?.getText() || "(empty)"}
          </pre>
        )}

        {/* Raw HTML View */}
        {active_tab === "raw_html" && (
          <pre className="cls_rte_raw_html p-4 text-xs whitespace-pre-wrap font-mono text-muted-foreground h-full">
            {format_html(editor?.getHTML() || "") || "(empty)"}
          </pre>
        )}
      </div>

      {/* Attachments List */}
      <AttachmentsList
        attachments={attachments}
        on_remove={handle_remove_attachment}
        disabled={disabled}
      />
    </div>
  );
};

HazoUiRte.displayName = "HazoUiRte";
