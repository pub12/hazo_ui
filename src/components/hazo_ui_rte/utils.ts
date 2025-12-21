/**
 * Hazo UI Rich Text Editor - Utility Functions
 *
 * Helper functions for file handling, text extraction, and other utilities.
 */

import type { RteAttachment } from "./types";

/**
 * Convert a File object to a base64 encoded string
 */
export function file_to_base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix to get just the base64 content
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert a File object to an RteAttachment
 */
export async function file_to_attachment(file: File): Promise<RteAttachment> {
  const data = await file_to_base64(file);
  return {
    filename: file.name,
    mime_type: file.type || "application/octet-stream",
    data,
  };
}

/**
 * Convert a File object to a base64 data URL for inline embedding
 */
export function file_to_data_url(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Extract plain text from HTML content
 */
export function extract_plain_text(html: string): string {
  if (typeof document === "undefined") {
    // Server-side fallback - basic tag stripping
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .trim();
  }

  // Client-side - use DOM parser
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

/**
 * Generate a unique ID for internal use
 */
export function generate_unique_id(): string {
  return `rte_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Debounce function for rate-limiting callbacks
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout_id: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout_id) {
      clearTimeout(timeout_id);
    }
    timeout_id = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Format file size for display
 */
export function format_file_size(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Get file extension from filename
 */
export function get_file_extension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() || "" : "";
}

/**
 * Check if a file is an image based on MIME type
 */
export function is_image_file(mime_type: string): boolean {
  return mime_type.startsWith("image/");
}

/**
 * Parse variable syntax {{variable_name}} from text
 */
export function parse_variables_from_text(text: string): string[] {
  const regex = /\{\{([^}]+)\}\}/g;
  const variables: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1]);
  }
  return variables;
}
