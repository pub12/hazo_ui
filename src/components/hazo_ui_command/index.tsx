/**
 * HazoUiCommand - Headless Command/Mention System
 *
 * Provides TipTap extensions and UI components for implementing
 * command pills with prefix triggers (e.g., @mentions, /commands, #tags).
 *
 * This module exports:
 * - CommandNodeExtension: TipTap node for rendering command pills
 * - CommandPill: Standalone pill component
 * - CommandPopover: Dropdown menu for command selection
 * - create_command_suggestion_extension: Factory for prefix detection
 * - Types for building custom command UIs
 */

// Types
export type {
  CommandItem,
  PrefixConfig,
  PrefixColor,
  InsertedCommand,
  CommandTextOutput,
  CommandPopoverProps,
  CommandPillProps,
  SuggestionState,
  BaseCommandInputProps,
  HazoUiTextboxProps,
  HazoUiTextareaProps,
  CommandEditContext,
} from "./types";

// TipTap Extensions
export {
  CommandNodeExtension,
  generate_command_id,
} from "./extensions/command_node_extension";

export {
  create_command_suggestion_extension,
  delete_suggestion_range,
  insert_command_at_position,
  type CommandSuggestionConfig,
} from "./extensions/command_suggestion";

// UI Components
export { CommandPill } from "./components/command_pill";
export { CommandPopover } from "./components/command_popover";

import type { PrefixColor } from "./types";

/**
 * Extended prefix configuration type for internal parsing
 */
type PrefixConfigForParsing = {
  char: string;
  commands: { action: string; action_label: string }[];
  color?: PrefixColor;
};

/**
 * Utility to parse plain text with commands into structured format
 *
 * @param text - Plain text with prefix + action format (e.g., "Hello @user_123")
 * @param prefixes - Prefix configurations to detect
 * @returns Parsed commands with positions
 */
export const parse_commands_from_text = (
  text: string,
  prefixes: PrefixConfigForParsing[]
): { action: string; action_label: string; prefix: string; position: number; length: number; color?: PrefixColor }[] => {
  const result: {
    action: string;
    action_label: string;
    prefix: string;
    position: number;
    length: number;
    color?: PrefixColor;
  }[] = [];

  // Build a map of action -> label for quick lookup
  const action_to_label = new Map<string, { label: string; prefix: string; color?: PrefixColor }>();
  for (const prefix_config of prefixes) {
    for (const cmd of prefix_config.commands) {
      action_to_label.set(`${prefix_config.char}${cmd.action}`, {
        label: cmd.action_label,
        prefix: prefix_config.char,
        color: prefix_config.color,
      });
    }
  }

  // Build regex pattern for all prefixes
  const prefix_chars = prefixes.map((p) => escape_regex(p.char)).join("|");
  // Match prefix followed by word characters (action)
  const pattern = new RegExp(`(${prefix_chars})(\\w+)`, "g");

  let match;
  while ((match = pattern.exec(text)) !== null) {
    const full_match = match[0];
    const prefix = match[1];
    const action = match[2];
    const lookup_key = `${prefix}${action}`;

    const info = action_to_label.get(lookup_key);
    if (info) {
      result.push({
        action,
        action_label: info.label,
        prefix,
        position: match.index,
        length: full_match.length,
        color: info.color,
      });
    }
  }

  return result;
};

/**
 * Escape special regex characters in a string
 */
const escape_regex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Convert parsed commands to TipTap content structure
 *
 * @param text - Plain text with prefix + action format
 * @param prefixes - Prefix configurations
 * @param variant - Pill variant style
 * @returns TipTap JSON content structure
 */
export const text_to_tiptap_content = (
  text: string,
  prefixes: PrefixConfigForParsing[],
  variant: "default" | "outline" | "subtle" = "default"
): Record<string, unknown> => {
  const commands = parse_commands_from_text(text, prefixes);

  if (commands.length === 0) {
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: text ? [{ type: "text", text }] : [],
        },
      ],
    };
  }

  // Sort commands by position
  commands.sort((a, b) => a.position - b.position);

  // Build content array with text nodes and command nodes
  const content: Record<string, unknown>[] = [];
  let last_end = 0;

  for (const cmd of commands) {
    // Add text before this command
    if (cmd.position > last_end) {
      content.push({
        type: "text",
        text: text.slice(last_end, cmd.position),
      });
    }

    // Add command node with optional color attributes
    content.push({
      type: "commandNode",
      attrs: {
        id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        prefix: cmd.prefix,
        action: cmd.action,
        action_label: cmd.action_label,
        variant,
        ...(cmd.color?.bg && { color_bg: cmd.color.bg }),
        ...(cmd.color?.fg && { color_fg: cmd.color.fg }),
        ...(cmd.color?.border && { color_border: cmd.color.border }),
      },
    });

    last_end = cmd.position + cmd.length;
  }

  // Add remaining text after last command
  if (last_end < text.length) {
    content.push({
      type: "text",
      text: text.slice(last_end),
    });
  }

  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content,
      },
    ],
  };
};
