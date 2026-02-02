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
export type AnimationPreset = 'zoom' | 'slide' | 'fade' | 'bounce' | 'scale-up' | 'flip' | 'slide-left' | 'slide-right' | 'slide-top' | 'none';
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

// Animation preset configurations
const ANIMATION_PRESETS = {
  zoom: {
    open: "animate-dialog-zoom",
    close: "animate-dialog-zoom"
  },
  slide: {
    open: "animate-dialog-slide-bottom",
    close: "animate-dialog-slide-bottom"
  },
  fade: {
    open: "animate-dialog-fade",
    close: "animate-dialog-fade"
  },
  bounce: {
    open: "animate-dialog-bounce",
    close: "animate-dialog-bounce"
  },
  "scale-up": {
    open: "animate-dialog-scale",
    close: "animate-dialog-scale"
  },
  flip: {
    open: "animate-dialog-flip",
    close: "animate-dialog-flip"
  },
  "slide-left": {
    open: "animate-dialog-slide-left",
    close: "animate-dialog-slide-left"
  },
  "slide-right": {
    open: "animate-dialog-slide-right",
    close: "animate-dialog-slide-right"
  },
  "slide-top": {
    open: "animate-dialog-slide-top",
    close: "animate-dialog-slide-top"
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

  // Header Bar (full-width colored bar)
  headerBar?: boolean;              // Enable full-width colored header bar
  headerBarColor?: string;          // Color for the header bar (e.g., "#1e293b", "rgb(30, 41, 59)")

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
  headerBar = false,
  headerBarColor = "#1e293b",
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

  // Header styles - combine headerBar with custom colors
  const headerStyles: React.CSSProperties = {
    ...(headerBar && {
      backgroundColor: headerBarColor,
      marginLeft: "-1.5rem",
      marginRight: "-1.5rem",
      marginTop: "0",
      marginBottom: "0",
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
    }),
    ...(headerBackgroundColor && !headerBar && { backgroundColor: headerBackgroundColor }),
    ...(headerTextColor && { color: headerTextColor }),
  };

  // Title styles - white text for header bar with !important to override inherited colors
  const titleClassName = cn(
    "cls_dialog_title",
    headerBar && "!text-white"
  );

  // Description styles - lighter white for header bar with !important to override inherited colors
  const descriptionClassName = cn(
    "cls_dialog_description",
    headerBar && "!text-white/80"
  );

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
            "overflow-hidden",
            "focus:outline-none",
            className
          )}
          style={contentStyles}
        >
          {/* Header - Fixed */}
          <DialogHeader
            className={cn(
              "cls_dialog_header",
              !headerBar && "p-6 pb-4",
              headerClassName
            )}
            style={headerStyles}
          >
            <DialogTitle className={titleClassName}>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className={descriptionClassName}>
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
              style={
                headerBar
                  ? { color: "white" }
                  : headerTextColor
                  ? { color: headerTextColor }
                  : undefined
              }
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
