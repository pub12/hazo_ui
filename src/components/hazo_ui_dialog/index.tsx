/**
 * hazo_ui_dialog/index.tsx
 *
 * Purpose: Standardized, reusable dialog component built on shadcn's Dialog primitive
 * Features:
 * - Standardized header and footer layout
 * - Customizable content area
 * - Flexible animation system (presets + custom)
 * - Responsive sizing (viewport-relative up to limits)
 * - Background overlay customization
 * - CSS variable-based theming
 */

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "../ui/dialog";

// Animation preset types
export type AnimationPreset = 'zoom' | 'slide' | 'fade' | 'none';
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

// Animation preset configurations
const ANIMATION_PRESETS = {
  zoom: {
    open: "data-[state=open]:animate-in data-[state=open]:zoom-in-50 data-[state=open]:fade-in-0 data-[state=open]:duration-500",
    close: "data-[state=closed]:animate-out data-[state=closed]:zoom-out-50 data-[state=closed]:fade-out-0 data-[state=closed]:duration-300"
  },
  slide: {
    open: "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:duration-500",
    close: "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=closed]:duration-300"
  },
  fade: {
    open: "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-700",
    close: "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-500"
  },
  none: { open: "", close: "" }
};

// Props interface
export interface HazoUiDialogProps {
  // Dialog State Control
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Content & Callbacks
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;

  // Header Configuration
  title?: string;
  description?: string;

  // Button Configuration
  actionButtonText?: string;
  actionButtonVariant?: ButtonVariant;
  cancelButtonText?: string;
  showCancelButton?: boolean;

  // Size Configuration (responsive)
  sizeWidth?: string;
  sizeHeight?: string;

  // Animation Configuration
  openAnimation?: AnimationPreset | string;
  closeAnimation?: AnimationPreset | string;

  // Color Customization
  headerBackgroundColor?: string;
  headerTextColor?: string;
  bodyBackgroundColor?: string;
  footerBackgroundColor?: string;
  borderColor?: string;
  accentColor?: string;

  // Styling Customization
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
}

/**
 * Helper function to resolve animation classes
 * Supports both presets and custom Tailwind classes
 */
function resolveAnimationClasses(
  openAnim: AnimationPreset | string = 'zoom',
  closeAnim: AnimationPreset | string = 'zoom'
): string {
  const openClasses = (openAnim in ANIMATION_PRESETS)
    ? ANIMATION_PRESETS[openAnim as AnimationPreset].open
    : openAnim;

  const closeClasses = (closeAnim in ANIMATION_PRESETS)
    ? ANIMATION_PRESETS[closeAnim as AnimationPreset].close
    : closeAnim;

  return `${openClasses} ${closeClasses}`;
}

/**
 * HazoUiDialog Component
 *
 * A flexible dialog component with standardized layout and customizable behavior
 */
export function HazoUiDialog({
  open,
  onOpenChange,
  children,
  onConfirm,
  onCancel,
  title = "Action required",
  description,
  actionButtonText = "Confirm",
  actionButtonVariant = "default",
  cancelButtonText = "Cancel",
  showCancelButton = true,
  sizeWidth = "min(90vw, 600px)",
  sizeHeight = "min(80vh, 800px)",
  openAnimation = "zoom",
  closeAnimation = "zoom",
  headerBackgroundColor,
  headerTextColor,
  bodyBackgroundColor,
  footerBackgroundColor,
  borderColor,
  accentColor,
  className,
  contentClassName,
  overlayClassName,
  headerClassName,
  footerClassName,
  showCloseButton = true,
}: HazoUiDialogProps) {
  // Button click handlers
  const handleConfirm = () => {
    onConfirm?.();
    // Don't auto-close - let consumer control via onConfirm callback
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false); // Auto-close on cancel
  };

  // Resolve animation classes
  const animationClasses = resolveAnimationClasses(openAnimation, closeAnimation);

  // Build inline styles for color customization
  const contentStyles: React.CSSProperties = {
    width: sizeWidth,
    maxHeight: sizeHeight,
    ...(borderColor && { borderColor }),
  };

  const headerStyles: React.CSSProperties = {
    ...(headerBackgroundColor && { backgroundColor: headerBackgroundColor }),
    ...(headerTextColor && { color: headerTextColor }),
  };

  const bodyStyles: React.CSSProperties = {
    ...(bodyBackgroundColor && { backgroundColor: bodyBackgroundColor }),
  };

  const footerStyles: React.CSSProperties = {
    ...(footerBackgroundColor && { backgroundColor: footerBackgroundColor }),
  };

  // Build button styles for accent color
  const actionButtonStyles: React.CSSProperties = {
    ...(accentColor && actionButtonVariant === "default" && {
      backgroundColor: accentColor,
      borderColor: accentColor,
    }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Custom DialogOverlay for background customization */}
        <DialogOverlay
          className={cn("cls_hazo_dialog_overlay", overlayClassName)}
        />

        {/* DialogContent - manually rendered to support overlay customization */}
        <DialogPrimitive.Content
          className={cn(
            "cls_hazo_dialog_content",
            "fixed left-[50%] top-[50%] z-50 flex flex-col",
            "translate-x-[-50%] translate-y-[-50%]",
            "gap-0 border bg-background shadow-lg",
            "duration-200",
            animationClasses,
            "sm:rounded-lg",
            "focus:outline-none",
            className
          )}
          style={contentStyles}
        >
          {/* Header - Fixed */}
          <DialogHeader
            className={cn("cls_dialog_header p-6 pb-4", headerClassName)}
            style={headerStyles}
          >
            <DialogTitle className="cls_dialog_title">{title}</DialogTitle>
            {description && (
              <DialogDescription className="cls_dialog_description">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Body - Scrollable */}
          <div
            className={cn(
              "cls_dialog_body",
              "px-6 py-4 overflow-y-auto flex-1",
              contentClassName
            )}
            style={bodyStyles}
          >
            {children}
          </div>

          {/* Footer - Fixed, Right-aligned buttons */}
          <DialogFooter
            className={cn("cls_dialog_footer p-6 pt-4", footerClassName)}
            style={footerStyles}
          >
            {showCancelButton && (
              <Button
                type="button"
                className="cls_cancel_button"
                variant="outline"
                onClick={handleCancel}
              >
                {cancelButtonText}
              </Button>
            )}
            <Button
              type="button"
              className="cls_confirm_button"
              variant={actionButtonVariant}
              onClick={handleConfirm}
              style={actionButtonStyles}
            >
              {actionButtonText}
            </Button>
          </DialogFooter>

          {/* Close button */}
          {showCloseButton && (
            <DialogPrimitive.Close
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              style={headerTextColor ? { color: headerTextColor } : undefined}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
