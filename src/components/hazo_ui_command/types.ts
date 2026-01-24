/**
 * Types for HazoUiCommand - Command/Mention System
 *
 * Shared type definitions for command pills in text inputs with
 * prefix-triggered command menus (e.g., @mentions, /commands, #tags).
 */

import * as React from "react";

/**
 * Individual command item that can be selected from the command menu
 */
export interface CommandItem {
  /** Unique identifier for this command (e.g., "user_123", "due_date") */
  action: string;
  /** Display label shown in the pill and dropdown (e.g., "John Doe", "Due Date") */
  action_label: string;
  /** Optional description shown in the dropdown */
  action_description?: string;
  /** Optional icon to display alongside the command */
  icon?: React.ReactNode;
  /** Optional group name for categorizing commands in the dropdown */
  group?: string;
}

/**
 * Configuration for a prefix trigger character
 */
export interface PrefixConfig {
  /** Trigger character (e.g., "/", "@", "#") */
  char: string;
  /** Available commands for this prefix */
  commands: CommandItem[];
  /** Allow free text entries that don't match existing commands */
  allow_free_text?: boolean;
}

/**
 * Represents a command that has been inserted into the text
 */
export interface InsertedCommand {
  /** Unique identifier for this insertion (for tracking position) */
  id: string;
  /** The prefix character used (e.g., "@", "/") */
  prefix: string;
  /** The action identifier */
  action: string;
  /** The display label */
  action_label: string;
  /** Position in the plain text output */
  position: number;
  /** Length of the command string in plain text */
  length: number;
}

/**
 * Output format for text with commands
 */
export interface CommandTextOutput {
  /** Plain text with prefix + action format (e.g., "Hello @user_123 /due_date tomorrow") */
  plain_text: string;
  /** Display text with prefix + label format (e.g., "Hello @John Doe /Due Date tomorrow") */
  display_text: string;
  /** Array of all inserted commands with position info */
  commands: InsertedCommand[];
}

/**
 * Props for the command popover component
 */
export interface CommandPopoverProps {
  /** Whether the popover is open */
  is_open: boolean;
  /** Commands to display, filtered by current query */
  commands: CommandItem[];
  /** The current prefix being used */
  prefix: string;
  /** Current search/filter query */
  query: string;
  /** Currently selected index for keyboard navigation */
  selected_index: number;
  /** Position for the popover */
  position: { top: number; left: number };
  /** Called when query changes */
  on_query_change: (query: string) => void;
  /** Called when a command is selected */
  on_select: (command: CommandItem) => void;
  /** Called when the popover should close */
  on_close: () => void;
  /** Called when selection changes via keyboard */
  on_selection_change: (index: number) => void;
}

/**
 * Props for the command pill component
 */
export interface CommandPillProps {
  /** The prefix character */
  prefix: string;
  /** The action identifier */
  action: string;
  /** The display label */
  action_label: string;
  /** Unique ID for this pill instance */
  id: string;
  /** Whether the pill is currently selected in the editor */
  selected?: boolean;
  /** Pill style variant */
  variant?: "default" | "outline" | "subtle";
  /** Called when the pill is clicked (to open edit popover) */
  on_click?: () => void;
}

/**
 * Suggestion state passed from TipTap suggestion extension
 */
export interface SuggestionState {
  /** Whether suggestion mode is active */
  is_active: boolean;
  /** Current query string (text after prefix) */
  query: string;
  /** The prefix character that triggered this suggestion */
  prefix: string;
  /** Client rect for positioning the popover */
  client_rect: (() => DOMRect | null) | null;
  /** Commands available for this prefix */
  commands: CommandItem[];
  /** TipTap range for the suggestion */
  range: { from: number; to: number };
}

/**
 * Props shared between HazoUiTextbox and HazoUiTextarea
 */
export interface BaseCommandInputProps {
  /** Controlled value - plain text with prefix + action format */
  value?: string;
  /** Default value for uncontrolled mode */
  default_value?: string;
  /** Prefix configurations for command triggers */
  prefixes: PrefixConfig[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Pill style variant */
  pill_variant?: "default" | "outline" | "subtle";
  /** Called when the content changes */
  on_change?: (output: CommandTextOutput) => void;
  /** Called when a command is inserted */
  on_command_insert?: (command: CommandItem, prefix: string) => void;
  /** Called when an existing command is changed */
  on_command_change?: (old_command: InsertedCommand, new_command: CommandItem) => void;
  /** Called when a command is removed */
  on_command_remove?: (command: InsertedCommand) => void;
}

/**
 * Props for HazoUiTextbox (single-line input)
 */
export interface HazoUiTextboxProps extends BaseCommandInputProps {
  /** Called when Enter is pressed */
  on_submit?: (output: CommandTextOutput) => void;
}

/**
 * Props for HazoUiTextarea (multi-line input)
 */
export interface HazoUiTextareaProps extends BaseCommandInputProps {
  /** Minimum height for the textarea */
  min_height?: string;
  /** Maximum height for the textarea */
  max_height?: string;
  /** Number of visible rows */
  rows?: number;
  /** Called when Cmd/Ctrl+Enter is pressed */
  on_submit?: (output: CommandTextOutput) => void;
}

/**
 * Context type for command editing
 */
export interface CommandEditContext {
  /** The command being edited */
  command: InsertedCommand;
  /** Position of the node in the document */
  node_pos: number;
  /** Client rect for positioning the edit popover */
  rect: DOMRect;
}
