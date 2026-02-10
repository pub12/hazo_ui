/**
 * hazo_ui_config.ts
 *
 * Purpose: Centralized configuration for hazo_ui component library
 * Provides default colors and styling for buttons, headers, and dialogs
 * Can be overridden globally via set_hazo_ui_config or per-component via props
 */

export interface HazoUiConfig {
  // Dialog Header Colors
  header_background_color?: string;
  header_text_color?: string;

  // Submit/Action Button Colors
  submit_button_background_color?: string;
  submit_button_text_color?: string;
  submit_button_hover_color?: string;

  // Cancel Button Colors
  cancel_button_background_color?: string;
  cancel_button_text_color?: string;
  cancel_button_border_color?: string;
  cancel_button_hover_color?: string;

  // Clear/Delete Button Colors
  clear_button_background_color?: string;
  clear_button_text_color?: string;
  clear_button_border_color?: string;
  clear_button_hover_color?: string;
}

// Default configuration
const default_config: HazoUiConfig = {
  // Headers use default theme colors by default (no override)
  header_background_color: undefined,
  header_text_color: undefined,

  // Submit buttons use primary/default variant (no override needed for default styling)
  submit_button_background_color: undefined,
  submit_button_text_color: undefined,
  submit_button_hover_color: undefined,

  // Cancel buttons use outline variant (no override needed for default styling)
  cancel_button_background_color: undefined,
  cancel_button_text_color: undefined,
  cancel_button_border_color: undefined,
  cancel_button_hover_color: undefined,

  // Clear buttons use outline variant (no override needed for default styling)
  clear_button_background_color: undefined,
  clear_button_text_color: undefined,
  clear_button_border_color: undefined,
  clear_button_hover_color: undefined,
};

// Global config instance
let global_config: HazoUiConfig = { ...default_config };

/**
 * Get the current global hazo_ui configuration
 */
export function get_hazo_ui_config(): Readonly<HazoUiConfig> {
  return { ...global_config };
}

/**
 * Set global hazo_ui configuration
 * Merges provided config with existing config (partial update)
 *
 * @param config - Partial configuration to merge with current config
 *
 * @example
 * ```typescript
 * // Set custom submit button color globally
 * set_hazo_ui_config({
 *   submit_button_background_color: '#3b82f6',
 *   header_background_color: '#1e293b',
 *   header_text_color: '#ffffff',
 * });
 * ```
 */
export function set_hazo_ui_config(config: Partial<HazoUiConfig>): void {
  global_config = { ...global_config, ...config };
}

/**
 * Reset hazo_ui configuration to defaults
 */
export function reset_hazo_ui_config(): void {
  global_config = { ...default_config };
}
