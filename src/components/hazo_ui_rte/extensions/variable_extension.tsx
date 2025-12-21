/**
 * Variable Extension for Tiptap
 *
 * Custom atomic node extension for template variables.
 * Variables are rendered as non-editable pills and serialize to {{variable_name}}.
 */

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import * as React from "react";
import { cn } from "../../../lib/utils";

/**
 * React component for rendering variable pills in the editor
 */
const VariablePill: React.FC<NodeViewProps> = ({ node, selected }) => {
  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        className={cn(
          "cls_rte_variable_pill",
          "inline-flex items-center",
          "px-2 py-0.5 mx-0.5",
          "rounded-full",
          "text-sm font-medium",
          "bg-primary/10 text-primary",
          "border border-primary/20",
          "cursor-default select-none",
          selected && "ring-2 ring-primary ring-offset-1"
        )}
        contentEditable={false}
        data-variable={node.attrs.name}
      >
        {`{{${node.attrs.name}}}`}
      </span>
    </NodeViewWrapper>
  );
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    variable: {
      /**
       * Insert a variable node
       */
      insertVariable: (name: string) => ReturnType;
    };
  }
}

export const VariableExtension = Node.create({
  name: "variable",

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
      name: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-variable"),
        renderHTML: (attributes) => ({
          "data-variable": attributes.name,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-variable]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class: "cls_rte_variable_pill",
        contenteditable: "false",
      }),
      `{{${HTMLAttributes["data-variable"]}}}`,
    ];
  },

  renderText({ node }) {
    return `{{${node.attrs.name}}}`;
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariablePill);
  },

  addCommands() {
    return {
      insertVariable:
        (name: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { name },
          });
        },
    };
  },

  // Keyboard behavior - delete entire node on backspace
  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let is_variable = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              is_variable = true;
              tr.insertText("", pos, pos + node.nodeSize);
              return false;
            }
          });

          return is_variable;
        }),
    };
  },
});
