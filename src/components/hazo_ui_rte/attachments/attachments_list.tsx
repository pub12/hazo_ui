"use client";

/**
 * Attachments List Component
 *
 * Displays attached files with preview and remove functionality.
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { LuX, LuFile, LuImage, LuFileText, LuFileCode } from "react-icons/lu";
import type { RteAttachment } from "../types";
import { format_file_size, get_file_extension, is_image_file } from "../utils";

interface AttachmentsListProps {
  attachments: RteAttachment[];
  on_remove: (index: number) => void;
  disabled?: boolean;
}

/**
 * Get icon for file type
 */
const get_file_icon = (mime_type: string, filename: string) => {
  if (is_image_file(mime_type)) {
    return <LuImage className="h-4 w-4" />;
  }

  const ext = get_file_extension(filename);
  if (["txt", "md", "doc", "docx", "pdf"].includes(ext)) {
    return <LuFileText className="h-4 w-4" />;
  }
  if (["js", "ts", "jsx", "tsx", "json", "html", "css"].includes(ext)) {
    return <LuFileCode className="h-4 w-4" />;
  }

  return <LuFile className="h-4 w-4" />;
};

/**
 * Calculate base64 file size in bytes
 */
const get_base64_size = (base64: string): number => {
  // Remove padding and calculate
  const padding = (base64.match(/=+$/) || [""])[0].length;
  return Math.floor((base64.length * 3) / 4) - padding;
};

export const AttachmentsList: React.FC<AttachmentsListProps> = ({
  attachments,
  on_remove,
  disabled = false,
}) => {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "cls_rte_attachments",
        "flex flex-wrap gap-2 p-2",
        "border-t border-border bg-muted/50 rounded-b-md"
      )}
    >
      {attachments.map((attachment, index) => {
        const size = get_base64_size(attachment.data);
        const is_image = is_image_file(attachment.mime_type);

        return (
          <div
            key={`${attachment.filename}-${index}`}
            className={cn(
              "cls_rte_attachment_item",
              "flex items-center gap-2",
              "px-2 py-1.5 rounded-md",
              "bg-background border border-border",
              "text-xs"
            )}
          >
            {/* Preview thumbnail for images */}
            {is_image ? (
              <img
                src={`data:${attachment.mime_type};base64,${attachment.data}`}
                alt={attachment.filename}
                className="h-8 w-8 rounded object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                {get_file_icon(attachment.mime_type, attachment.filename)}
              </div>
            )}

            {/* File info */}
            <div className="flex flex-col min-w-0">
              <span className="truncate max-w-[120px] font-medium">
                {attachment.filename}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {format_file_size(size)}
              </span>
            </div>

            {/* Remove button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 ml-1"
              onClick={() => on_remove(index)}
              disabled={disabled}
            >
              <LuX className="h-3 w-3" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
