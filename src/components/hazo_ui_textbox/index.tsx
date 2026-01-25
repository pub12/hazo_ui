"use client";

/**
 * HazoUiTextbox - Single-line Input with Command Support
 *
 * A TipTap-based single-line text input that supports prefix-triggered
 * command pills (e.g., @mentions, /commands, #tags).
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";

import { cn } from "../../lib/utils";
import {
  CommandNodeExtension,
  create_command_suggestion_extension,
  insert_command_at_position,
  text_to_tiptap_content,
} from "../hazo_ui_command";
import { CommandPopover } from "../hazo_ui_command/components/command_popover";
import type {
  HazoUiTextboxProps,
  CommandTextOutput,
  SuggestionState,
  CommandItem,
  InsertedCommand,
  CommandEditContext,
} from "../hazo_ui_command/types";

// Re-export types
export type { HazoUiTextboxProps, CommandTextOutput } from "./types";

/**
 * Custom Document that only allows a single paragraph (single-line)
 */
const SingleLineDocument = Document.extend({
  content: "paragraph",
});

/**
 * Extract output from editor
 */
const get_editor_output = (
  editor: ReturnType<typeof useEditor>
): CommandTextOutput => {
  if (!editor) {
    return { plain_text: "", display_text: "", commands: [] };
  }

  const plain_text = editor.getText();
  const commands: InsertedCommand[] = [];
  let display_text = "";
  let position = 0;

  // Walk through the document to build output
  editor.state.doc.descendants((node, _pos) => {
    if (node.type.name === "text") {
      display_text += node.text || "";
      position += (node.text || "").length;
    } else if (node.type.name === "commandNode") {
      const { id, prefix, action, action_label } = node.attrs;
      const cmd_plain_text = `${prefix}${action}`;
      const cmd_display_text = `${prefix}${action_label}`;

      commands.push({
        id,
        prefix,
        action,
        action_label,
        position,
        length: cmd_plain_text.length,
      });

      display_text += cmd_display_text;
      position += cmd_plain_text.length;
    }
  });

  return { plain_text, display_text, commands };
};

/**
 * HazoUiTextbox Component
 */
export const HazoUiTextbox: React.FC<HazoUiTextboxProps> = ({
  value,
  default_value,
  prefixes,
  placeholder = "Type here...",
  disabled = false,
  className,
  pill_variant = "default",
  on_change,
  on_submit,
  on_command_insert,
  on_command_change,
  on_command_remove,
}) => {
  // Suggestion state for popover
  const [suggestion_state, set_suggestion_state] =
    React.useState<SuggestionState | null>(null);
  const [selected_index, set_selected_index] = React.useState(0);
  const [popover_position, set_popover_position] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Edit context for pill editing
  const [edit_context, set_edit_context] = React.useState<CommandEditContext | null>(null);
  const [edit_selected_index, set_edit_selected_index] = React.useState(0);

  // Refs for tracking state
  const is_controlled = value !== undefined;
  const editor_container_ref = React.useRef<HTMLDivElement>(null);
  const edit_popover_ref = React.useRef<HTMLDivElement>(null);

  // Track if we're in a browser environment for SSR compatibility
  const [mounted, set_mounted] = React.useState(false);

  React.useEffect(() => {
    set_mounted(true);
  }, []);

  // Create suggestion extensions
  const suggestion_extensions = React.useMemo(() => {
    return create_command_suggestion_extension({
      prefixes,
      on_suggestion_change: (state) => {
        set_suggestion_state(state);
        set_selected_index(0);
      },
      on_insert_command: (_command, _prefix, _range) => {
        // This is handled by the popover selection
      },
    });
  }, [prefixes]);

  // Initialize editor
  const editor = useEditor({
    extensions: [
      SingleLineDocument,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder,
      }),
      CommandNodeExtension.configure({}),
      ...suggestion_extensions,
    ],
    content: is_controlled
      ? text_to_tiptap_content(value || "", prefixes, pill_variant)
      : text_to_tiptap_content(default_value || "", prefixes, pill_variant),
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "cls_textbox_editor",
          "w-full outline-none",
          "whitespace-nowrap overflow-x-auto"
        ),
      },
      handleKeyDown: (_view, event) => {
        // Prevent Enter from creating new lines (single-line input)
        if (event.key === "Enter" && !suggestion_state?.is_active) {
          event.preventDefault();
          if (on_submit && editor) {
            on_submit(get_editor_output(editor));
          }
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (on_change) {
        on_change(get_editor_output(editor));
      }
    },
  });

  // Update popover position when suggestion state changes
  // Now uses viewport coordinates since popover is rendered via portal
  React.useEffect(() => {
    if (suggestion_state?.is_active && editor) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        // Get cursor position using TipTap's view.coordsAtPos
        const { from } = suggestion_state.range;
        try {
          const coords = editor.view.coordsAtPos(from);
          if (coords) {
            // Use viewport coordinates directly for fixed positioning
            set_popover_position({
              top: coords.bottom + 4,
              left: coords.left,
            });
          }
        } catch {
          // Fallback to client_rect if coordsAtPos fails
          const rect = suggestion_state.client_rect?.();
          if (rect) {
            set_popover_position({
              top: rect.bottom + 4,
              left: rect.left,
            });
          }
        }
      });
    }
  }, [suggestion_state, editor]);

  // Sync controlled value
  React.useEffect(() => {
    if (is_controlled && editor && !editor.isFocused) {
      const current_text = editor.getText();
      if (value !== current_text) {
        const content = text_to_tiptap_content(value || "", prefixes, pill_variant);
        editor.commands.setContent(content, { emitUpdate: false });
      }
    }
  }, [value, editor, is_controlled, prefixes, pill_variant]);

  // Update editable state
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  // Handle command selection from popover
  const handle_command_select = React.useCallback(
    (command: CommandItem) => {
      if (!editor || !suggestion_state) return;

      insert_command_at_position(
        editor,
        command,
        suggestion_state.prefix,
        suggestion_state.range,
        pill_variant
      );

      if (on_command_insert) {
        on_command_insert(command, suggestion_state.prefix);
      }

      set_suggestion_state(null);
    },
    [editor, suggestion_state, pill_variant, on_command_insert]
  );

  // Handle popover close
  const handle_popover_close = React.useCallback(() => {
    set_suggestion_state(null);
    editor?.commands.focus();
  }, [editor]);

  // Handle edit popover close
  const handle_edit_close = React.useCallback(() => {
    set_edit_context(null);
    editor?.commands.focus();
  }, [editor]);

  // Handle command update from edit popover
  const handle_command_update = React.useCallback(
    (new_command: CommandItem) => {
      if (!editor || !edit_context) return;

      const old_command = edit_context.command;

      // Update the node attributes
      editor.commands.updateCommand(old_command.id, {
        action: new_command.action,
        action_label: new_command.action_label,
      });

      // Call the change callback if provided
      if (on_command_change) {
        on_command_change(old_command, new_command);
      }

      set_edit_context(null);
      editor.commands.focus();
    },
    [editor, edit_context, on_command_change]
  );

  // Handle command removal from edit popover
  const handle_command_remove = React.useCallback(() => {
    if (!editor || !edit_context) return;

    const command = edit_context.command;

    // Find and delete the node
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "commandNode" && node.attrs.id === command.id) {
        editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run();
        return false;
      }
    });

    // Call the remove callback if provided
    if (on_command_remove) {
      on_command_remove(command);
    }

    set_edit_context(null);
  }, [editor, edit_context, on_command_remove]);

  // Filter commands based on query
  const filtered_commands = React.useMemo(() => {
    if (!suggestion_state) return [];

    const query = suggestion_state.query.toLowerCase();
    if (!query) return suggestion_state.commands;

    return suggestion_state.commands.filter(
      (cmd) =>
        cmd.action_label.toLowerCase().includes(query) ||
        cmd.action.toLowerCase().includes(query) ||
        cmd.action_description?.toLowerCase().includes(query)
    );
  }, [suggestion_state]);

  // Handle keyboard navigation in popover
  React.useEffect(() => {
    if (!suggestion_state?.is_active) return;

    const handle_keydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          set_selected_index((prev) =>
            Math.min(prev + 1, filtered_commands.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          set_selected_index((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filtered_commands[selected_index]) {
            handle_command_select(filtered_commands[selected_index]);
          }
          break;
        case "Escape":
          e.preventDefault();
          handle_popover_close();
          break;
      }
    };

    window.addEventListener("keydown", handle_keydown);
    return () => window.removeEventListener("keydown", handle_keydown);
  }, [
    suggestion_state?.is_active,
    filtered_commands,
    selected_index,
    handle_command_select,
    handle_popover_close,
  ]);

  // Close edit popover on click outside
  React.useEffect(() => {
    if (!edit_context) return;

    const handle_click_outside = (e: MouseEvent) => {
      if (
        edit_popover_ref.current &&
        !edit_popover_ref.current.contains(e.target as Node)
      ) {
        set_edit_context(null);
      }
    };

    // Delay to avoid immediate close from the pill click
    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handle_click_outside);
    }, 100);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handle_click_outside);
    };
  }, [edit_context]);

  // Get commands for edit popover
  const edit_commands = React.useMemo(() => {
    if (!edit_context) return [];
    const prefix_config = prefixes.find((p) => p.char === edit_context.command.prefix);
    return prefix_config?.commands || [];
  }, [edit_context, prefixes]);

  // Handle keyboard navigation in edit popover
  React.useEffect(() => {
    if (!edit_context) return;

    const handle_keydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          set_edit_selected_index((prev) =>
            Math.min(prev + 1, edit_commands.length)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          set_edit_selected_index((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          // Last item is "Remove" option
          if (edit_selected_index === edit_commands.length) {
            handle_command_remove();
          } else if (edit_commands[edit_selected_index]) {
            handle_command_update(edit_commands[edit_selected_index]);
          }
          break;
        case "Escape":
          e.preventDefault();
          handle_edit_close();
          break;
      }
    };

    window.addEventListener("keydown", handle_keydown);
    return () => window.removeEventListener("keydown", handle_keydown);
  }, [
    edit_context,
    edit_commands,
    edit_selected_index,
    handle_command_update,
    handle_command_remove,
    handle_edit_close,
  ]);

  // Listen for pill click events (for editing)
  React.useEffect(() => {
    const handle_pill_click = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const { id, prefix, action, action_label, node_pos } = detail;

      // Find the pill element to get its position
      if (editor) {
        // Get the position of the clicked pill node
        try {
          const coords = editor.view.coordsAtPos(node_pos);
          if (coords) {
            // Find the current command index in the prefix commands
            const prefix_config = prefixes.find((p) => p.char === prefix);
            const current_index = prefix_config?.commands.findIndex(
              (cmd) => cmd.action === action
            ) ?? 0;

            // Use viewport coordinates directly for fixed positioning
            set_edit_context({
              command: {
                id,
                prefix,
                action,
                action_label,
                position: node_pos,
                length: 0,
              },
              node_pos,
              rect: new DOMRect(
                coords.left,
                coords.bottom + 4,
                0,
                0
              ),
            });
            set_edit_selected_index(Math.max(0, current_index));
          }
        } catch {
          // Ignore positioning errors
        }
      }
    };

    document.addEventListener("command-pill-click", handle_pill_click);
    return () =>
      document.removeEventListener("command-pill-click", handle_pill_click);
  }, [editor, prefixes]);

  return (
    <div
      ref={editor_container_ref}
      className={cn(
        "cls_hazo_ui_textbox",
        "relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
        "text-sm ring-offset-background",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <EditorContent
        editor={editor}
        className={cn(
          "cls_textbox_content",
          "flex-1 min-w-0",
          "[&_.ProseMirror]:outline-none",
          "[&_.ProseMirror_p]:m-0",
          "[&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
          "[&_.ProseMirror_.is-editor-empty:first-child::before]:text-muted-foreground",
          "[&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none",
          "[&_.ProseMirror_.is-editor-empty:first-child::before]:float-left",
          "[&_.ProseMirror_.is-editor-empty:first-child::before]:h-0"
        )}
      />

      {/* Command Popover */}
      {suggestion_state?.is_active && (
        <CommandPopover
          is_open={true}
          commands={filtered_commands}
          prefix={suggestion_state.prefix}
          query={suggestion_state.query}
          selected_index={selected_index}
          position={popover_position}
          on_query_change={() => {}}
          on_select={handle_command_select}
          on_close={handle_popover_close}
          on_selection_change={set_selected_index}
        />
      )}

      {/* Edit Popover - rendered via portal to escape stacking contexts */}
      {edit_context && mounted && createPortal(
        <div
          ref={edit_popover_ref}
          className={cn(
            "cls_edit_popover",
            "fixed z-[9999]",
            "w-64 min-w-[200px] max-w-[300px]",
            "rounded-md border bg-popover text-popover-foreground shadow-lg",
            "animate-in fade-in-0 zoom-in-95"
          )}
          style={{
            top: edit_context.rect.y,
            left: edit_context.rect.x,
          }}
        >
          <div className="py-1">
            <div className="px-3 py-2 text-xs text-muted-foreground border-b">
              Change command
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {edit_commands.map((cmd, idx) => (
                <div
                  key={cmd.action}
                  className={cn(
                    "px-3 py-2 cursor-pointer flex items-center gap-2",
                    "hover:bg-accent",
                    idx === edit_selected_index && "bg-accent",
                    cmd.action === edit_context.command.action && "font-medium"
                  )}
                  onClick={() => handle_command_update(cmd)}
                >
                  {cmd.icon && (
                    <span className="flex-shrink-0 text-muted-foreground">
                      {cmd.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="truncate">
                      {edit_context.command.prefix}
                      {cmd.action_label}
                    </div>
                    {cmd.action_description && (
                      <div className="text-xs text-muted-foreground truncate">
                        {cmd.action_description}
                      </div>
                    )}
                  </div>
                  {cmd.action === edit_context.command.action && (
                    <span className="text-xs text-muted-foreground">current</span>
                  )}
                </div>
              ))}
              {/* Remove option */}
              <div
                className={cn(
                  "px-3 py-2 cursor-pointer flex items-center gap-2 text-destructive border-t",
                  "hover:bg-destructive/10",
                  edit_selected_index === edit_commands.length && "bg-destructive/10"
                )}
                onClick={handle_command_remove}
              >
                <span>Remove</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

HazoUiTextbox.displayName = "HazoUiTextbox";
