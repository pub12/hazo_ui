/**
 * Command Node Extension for TipTap
 *
 * Custom atomic node extension for command pills (mentions, slash commands, etc.).
 * Commands are rendered as non-editable pills and serialize to prefix + action format.
 */

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import * as React from "react";
import { cn } from "../../../lib/utils";
import type { CommandPillProps, PrefixColor } from "../types";

/**
 * Generate unique ID for command nodes
 */
const generate_command_id = (): string => {
  return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get pill variant classes
 */
const get_variant_classes = (variant: CommandPillProps["variant"] = "default"): string => {
  switch (variant) {
    case "outline":
      return "bg-transparent border-primary/40 text-primary";
    case "subtle":
      return "bg-muted border-transparent text-muted-foreground";
    case "default":
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

/**
 * Build custom inline styles from PrefixColor
 */
const get_custom_color_styles = (
  color_bg?: string,
  color_fg?: string,
  color_border?: string
): React.CSSProperties => {
  if (!color_bg && !color_fg && !color_border) {
    return {};
  }
  return {
    ...(color_bg && { backgroundColor: color_bg }),
    ...(color_fg && { color: color_fg }),
    ...(color_border && { borderColor: color_border }),
  };
};

/**
 * Check if custom colors are provided
 */
const has_custom_colors = (
  color_bg?: string,
  color_fg?: string,
  color_border?: string
): boolean => {
  return Boolean(color_bg || color_fg || color_border);
};

/**
 * React component for rendering command pills in the editor
 */
const CommandPillView: React.FC<NodeViewProps> = ({ node, selected, editor }) => {
  const { prefix, action, action_label, id, variant, color_bg, color_fg, color_border } = node.attrs;

  const handle_click = () => {
    // Dispatch a custom event that the parent component can listen to
    const event = new CustomEvent("command-pill-click", {
      detail: {
        id,
        prefix,
        action,
        action_label,
        node_pos: editor.state.selection.from - 1,
      },
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const use_custom_colors = has_custom_colors(color_bg, color_fg, color_border);
  const custom_styles = get_custom_color_styles(color_bg, color_fg, color_border);

  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        className={cn(
          "cls_command_pill",
          "inline-flex items-center",
          "px-1.5 py-0.5 mx-0.5",
          "rounded-md",
          "text-sm font-medium",
          "border",
          "cursor-pointer select-none",
          "transition-all duration-150",
          // Only apply variant classes if no custom colors
          !use_custom_colors && get_variant_classes(variant),
          selected && "ring-2 ring-ring ring-offset-1",
          "hover:opacity-80"
        )}
        style={custom_styles}
        contentEditable={false}
        data-command-id={id}
        data-command-prefix={prefix}
        data-command-action={action}
        onClick={handle_click}
      >
        <span className={cn(!use_custom_colors && "text-muted-foreground opacity-70")} style={use_custom_colors ? { opacity: 0.7 } : undefined}>{prefix}</span>
        <span>{action_label}</span>
      </span>
    </NodeViewWrapper>
  );
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    commandNode: {
      /**
       * Insert a command node
       */
      insertCommand: (attrs: {
        prefix: string;
        action: string;
        action_label: string;
        variant?: "default" | "outline" | "subtle";
        color?: PrefixColor;
      }) => ReturnType;
      /**
       * Update an existing command node by ID
       */
      updateCommand: (
        id: string,
        attrs: { action: string; action_label: string }
      ) => ReturnType;
    };
  }
}

export const CommandNodeExtension = Node.create({
  name: "commandNode",

  group: "inline",

  inline: true,

  // Atomic means the node cannot be split or merged
  atom: true,

  // Draggable in the editor
  draggable: true,

  // Selectable as a whole unit
  selectable: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-command-id"),
        renderHTML: (attributes) => ({
          "data-command-id": attributes.id,
        }),
      },
      prefix: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-command-prefix"),
        renderHTML: (attributes) => ({
          "data-command-prefix": attributes.prefix,
        }),
      },
      action: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-command-action"),
        renderHTML: (attributes) => ({
          "data-command-action": attributes.action,
        }),
      },
      action_label: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-command-label"),
        renderHTML: (attributes) => ({
          "data-command-label": attributes.action_label,
        }),
      },
      variant: {
        default: "default",
        parseHTML: (element) =>
          element.getAttribute("data-command-variant") || "default",
        renderHTML: (attributes) => ({
          "data-command-variant": attributes.variant,
        }),
      },
      color_bg: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-command-color-bg"),
        renderHTML: (attributes) => ({
          "data-command-color-bg": attributes.color_bg,
        }),
      },
      color_fg: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-command-color-fg"),
        renderHTML: (attributes) => ({
          "data-command-color-fg": attributes.color_fg,
        }),
      },
      color_border: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-command-color-border"),
        renderHTML: (attributes) => ({
          "data-command-color-border": attributes.color_border,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-command-id]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class: "cls_command_pill",
        contenteditable: "false",
      }),
      `${HTMLAttributes["data-command-prefix"]}${HTMLAttributes["data-command-label"]}`,
    ];
  },

  // Output format: prefix + action (e.g., "@user_123", "/due_date")
  renderText({ node }) {
    return `${node.attrs.prefix}${node.attrs.action}`;
  },

  addNodeView() {
    return ReactNodeViewRenderer(CommandPillView);
  },

  addCommands() {
    return {
      insertCommand:
        (attrs) =>
        ({ commands }) => {
          // Extract color from attrs and flatten to individual attributes
          const { color, ...rest_attrs } = attrs;
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...rest_attrs,
              id: generate_command_id(),
              ...(color?.bg && { color_bg: color.bg }),
              ...(color?.fg && { color_fg: color.fg }),
              ...(color?.border && { color_border: color.border }),
            },
          });
        },
      updateCommand:
        (id, attrs) =>
        ({ tr, state }) => {
          let updated = false;
          state.doc.descendants((node, pos) => {
            if (node.type.name === this.name && node.attrs.id === id) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                ...attrs,
              });
              updated = true;
              return false;
            }
          });
          return updated;
        },
    };
  },

  // Keyboard behavior - delete entire node on backspace
  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let is_command = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              is_command = true;
              tr.insertText("", pos, pos + node.nodeSize);
              return false;
            }
          });

          return is_command;
        }),
    };
  },
});

export { generate_command_id };
