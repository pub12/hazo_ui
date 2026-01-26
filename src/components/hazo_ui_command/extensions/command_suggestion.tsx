/**
 * Command Suggestion Extension for TipTap
 *
 * Detects prefix characters and triggers the command popover for selection.
 * Works with multiple configurable prefixes (e.g., @, /, #).
 *
 * Each instance uses unique plugin keys to prevent conflicts when multiple
 * editor instances coexist (e.g., in lists during React transitions).
 */

import { Extension } from "@tiptap/core";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";
import { PluginKey } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/core";
import type { PrefixConfig, CommandItem, SuggestionState, PrefixColor } from "../types";

/**
 * Props for creating the suggestion extension
 */
export interface CommandSuggestionConfig {
  /** Prefix configurations */
  prefixes: PrefixConfig[];
  /** Callback when suggestion state changes */
  on_suggestion_change: (state: SuggestionState | null) => void;
  /** Callback to insert a command */
  on_insert_command: (
    command: CommandItem,
    prefix: string,
    range: { from: number; to: number }
  ) => void;
  /**
   * Unique instance identifier for plugin key generation.
   * Prevents "Adding different instances of a keyed plugin (suggestion$)" errors
   * when multiple editor instances exist simultaneously.
   */
  instance_id: string;
}

/**
 * Create a suggestion configuration for a specific prefix
 */
const create_suggestion_config = (
  prefix_config: PrefixConfig,
  on_suggestion_change: CommandSuggestionConfig["on_suggestion_change"],
  on_insert_command: CommandSuggestionConfig["on_insert_command"]
): Partial<SuggestionOptions> => {
  return {
    char: prefix_config.char,
    allowSpaces: false,
    startOfLine: false,

    items: ({ query }) => {
      if (!query) return prefix_config.commands;

      const lower_query = query.toLowerCase();
      return prefix_config.commands.filter(
        (cmd) =>
          cmd.action_label.toLowerCase().includes(lower_query) ||
          cmd.action.toLowerCase().includes(lower_query) ||
          cmd.action_description?.toLowerCase().includes(lower_query)
      );
    },

    render: () => {
      return {
        onStart: (props) => {
          // Defer React state update to avoid flushSync error during TipTap's render cycle
          queueMicrotask(() => {
            on_suggestion_change({
              is_active: true,
              query: props.query,
              prefix: prefix_config.char,
              client_rect: props.clientRect as () => DOMRect | null,
              commands: prefix_config.commands,
              range: props.range,
            });
          });
        },

        onUpdate: (props) => {
          // Defer React state update to avoid flushSync error during TipTap's render cycle
          queueMicrotask(() => {
            on_suggestion_change({
              is_active: true,
              query: props.query,
              prefix: prefix_config.char,
              client_rect: props.clientRect as () => DOMRect | null,
              commands: prefix_config.commands,
              range: props.range,
            });
          });
        },

        onKeyDown: (props) => {
          if (props.event.key === "Escape") {
            queueMicrotask(() => {
              on_suggestion_change(null);
            });
            return true;
          }
          // Let the popover handle arrow keys and enter
          if (
            props.event.key === "ArrowUp" ||
            props.event.key === "ArrowDown" ||
            props.event.key === "Enter"
          ) {
            return true;
          }
          return false;
        },

        onExit: () => {
          // Defer React state update to avoid flushSync error during TipTap's render cycle
          queueMicrotask(() => {
            on_suggestion_change(null);
          });
        },
      };
    },

    command: ({ range, props }) => {
      const command = props as unknown as CommandItem;
      on_insert_command(command, prefix_config.char, range);
    },
  };
};

/**
 * Create a combined suggestion extension for all configured prefixes
 *
 * Each suggestion plugin receives a unique key based on the instance_id
 * to prevent conflicts when multiple editor instances exist.
 */
export const create_command_suggestion_extension = (
  config: CommandSuggestionConfig
): Extension[] => {
  const { prefixes, on_suggestion_change, on_insert_command, instance_id } = config;

  // Create an extension for each prefix with unique plugin keys
  return prefixes.map((prefix_config, index) => {
    // Generate a unique plugin key for this specific instance and prefix
    const plugin_key = new PluginKey(`suggestion_${instance_id}_${prefix_config.char}_${index}`);

    return Extension.create({
      name: `commandSuggestion_${instance_id}_${prefix_config.char}_${index}`,

      addProseMirrorPlugins() {
        return [
          Suggestion({
            editor: this.editor,
            pluginKey: plugin_key,
            ...create_suggestion_config(
              prefix_config,
              on_suggestion_change,
              on_insert_command
            ),
          }),
        ];
      },
    });
  });
};

/**
 * Utility to get current suggestion range and delete trigger text
 */
export const delete_suggestion_range = (
  editor: Editor,
  range: { from: number; to: number }
): void => {
  editor
    .chain()
    .focus()
    .deleteRange(range)
    .run();
};

/**
 * Utility to insert command at current position
 */
export const insert_command_at_position = (
  editor: Editor,
  command: CommandItem,
  prefix: string,
  range: { from: number; to: number },
  variant: "default" | "outline" | "subtle" = "default",
  color?: PrefixColor
): void => {
  editor
    .chain()
    .focus()
    .deleteRange(range)
    .insertCommand({
      prefix,
      action: command.action,
      action_label: command.action_label,
      variant,
      color,
    })
    .run();
};
