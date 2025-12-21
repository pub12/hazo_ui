/**
 * Hazo UI Rich Text Editor - Type Definitions
 *
 * Type definitions for the rich text editor component including
 * attachments, variables, and editor output interfaces.
 */

/**
 * Represents a file attachment stored as base64
 */
export interface RteAttachment {
  filename: string;
  mime_type: string;
  data: string; // base64 encoded content
}

/**
 * Represents a template variable that can be inserted into the editor
 */
export interface RteVariable {
  name: string;
  description: string;
}

/**
 * Output structure returned by the editor on change
 */
export interface RteOutput {
  html: string;
  plain_text: string;
  attachments: RteAttachment[];
}

/**
 * Props for the HazoUiRte component
 */
export interface HazoUiRteProps {
  // Content (all optional)
  html?: string;
  plain_text?: string;
  attachments?: RteAttachment[];

  // Variables for email templates
  variables?: RteVariable[];

  // Callback fired when content changes
  on_change?: (output: RteOutput) => void;

  // Customization
  placeholder?: string;
  min_height?: string;
  max_height?: string;
  disabled?: boolean;
  className?: string;

  // Show output viewer tabs (HTML, Plain Text, Raw HTML)
  show_output_viewer?: boolean;
}

/**
 * Font family options available in the editor
 */
export const FONT_FAMILIES = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
] as const;

/**
 * Font size configuration
 */
export const FONT_SIZE_CONFIG = {
  default: 16,
  min: 8,
  max: 72,
  step: 2,
} as const;

/**
 * Block type options for the paragraph dropdown
 */
export const BLOCK_TYPES = [
  { label: "Paragraph", value: "paragraph", icon: "paragraph" },
  { label: "Heading 1", value: "heading-1", icon: "h1" },
  { label: "Heading 2", value: "heading-2", icon: "h2" },
  { label: "Heading 3", value: "heading-3", icon: "h3" },
  { label: "Numbered List", value: "ordered-list", icon: "list-ordered" },
  { label: "Bulleted List", value: "bullet-list", icon: "list" },
  { label: "Check List", value: "task-list", icon: "list-checks" },
  { label: "Code Block", value: "code-block", icon: "code" },
  { label: "Quote", value: "blockquote", icon: "quote" },
] as const;

/**
 * Text alignment options
 */
export const TEXT_ALIGNMENTS = [
  { label: "Left", value: "left", icon: "align-left" },
  { label: "Center", value: "center", icon: "align-center" },
  { label: "Right", value: "right", icon: "align-right" },
  { label: "Justify", value: "justify", icon: "align-justify" },
] as const;
