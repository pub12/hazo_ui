// Main entry point for hazo_ui component library
// Export all components here to enable tree-shaking
// Components should be imported individually: import { Button } from 'hazo_ui'

// HazoUiMultiFilterDialog component
export { HazoUiMultiFilterDialog } from "./components/hazo_ui_multi_filter_dialog";
export type { FilterField, FilterConfig } from "./components/hazo_ui_multi_filter_dialog";

// HazoUiMultiSortDialog component
export { HazoUiMultiSortDialog } from "./components/hazo_ui_multi_sort_dialog";
export type { SortField, SortConfig } from "./components/hazo_ui_multi_sort_dialog";

// HazoUiFlexRadio component
export { HazoUiFlexRadio } from "./components/hazo_ui_flex_radio";
export type { HazoUiFlexRadioItem, HazoUiFlexRadioProps } from "./components/hazo_ui_flex_radio";

// HazoUiFlexInput component
export { HazoUiFlexInput } from "./components/hazo_ui_flex_input";
export type { HazoUiFlexInputProps } from "./components/hazo_ui_flex_input";

// HazoUiRte component - Rich Text Editor
export { HazoUiRte } from "./components/hazo_ui_rte";
export type {
  HazoUiRteProps,
  RteOutput,
  RteAttachment,
  RteVariable,
} from "./components/hazo_ui_rte";

// HazoUiCommand - Headless command/mention system
export {
  CommandNodeExtension,
  CommandPill,
  CommandPopover,
  create_command_suggestion_extension,
  parse_commands_from_text,
  text_to_tiptap_content,
} from "./components/hazo_ui_command";
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
  CommandEditContext,
} from "./components/hazo_ui_command";

// HazoUiTextbox - Single-line input with command support
export { HazoUiTextbox } from "./components/hazo_ui_textbox";
export type { HazoUiTextboxProps } from "./components/hazo_ui_textbox";

// HazoUiTextarea - Multi-line input with command support
export { HazoUiTextarea } from "./components/hazo_ui_textarea";
export type { HazoUiTextareaProps } from "./components/hazo_ui_textarea";

