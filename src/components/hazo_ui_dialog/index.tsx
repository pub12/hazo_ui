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
import { X, Loader2 } from "lucide-react";
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
import { get_hazo_ui_config } from "../../lib/hazo_ui_config";

// Animation preset types
export type AnimationPreset = 'zoom' | 'slide' | 'fade' | 'bounce' | 'scale-up' | 'flip' | 'slide-left' | 'slide-right' | 'slide-top' | 'none';
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

// Dialog variant types for preset color themes
export type DialogVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

// Variant preset color configurations
interface VariantPreset {
  header_background_color: string;
  description_background_color: string;
  header_text_color: string;
  border_color: string;
  accent_color: string;
  overlay_class_name: string;
  action_button_variant?: ButtonVariant;
}

const VARIANT_PRESETS: Record<Exclude<DialogVariant, 'default'>, VariantPreset> = {
  info: {
    header_background_color: "rgb(191, 219, 254)",
    description_background_color: "rgb(219, 234, 254)",
    header_text_color: "rgb(30, 58, 138)",
    border_color: "rgb(59, 130, 246)",
    accent_color: "rgb(59, 130, 246)",
    overlay_class_name: "bg-blue-950/50",
  },
  success: {
    header_background_color: "rgb(187, 247, 208)",
    description_background_color: "rgb(220, 252, 231)",
    header_text_color: "rgb(22, 101, 52)",
    border_color: "rgb(34, 197, 94)",
    accent_color: "rgb(34, 197, 94)",
    overlay_class_name: "bg-green-950/50",
  },
  warning: {
    header_background_color: "rgb(253, 230, 138)",
    description_background_color: "rgb(254, 249, 195)",
    header_text_color: "rgb(113, 63, 18)",
    border_color: "rgb(234, 179, 8)",
    accent_color: "rgb(234, 179, 8)",
    overlay_class_name: "bg-yellow-950/50",
  },
  danger: {
    header_background_color: "rgb(254, 202, 202)",
    description_background_color: "rgb(254, 226, 226)",
    header_text_color: "rgb(127, 29, 29)",
    border_color: "rgb(239, 68, 68)",
    accent_color: "rgb(239, 68, 68)",
    overlay_class_name: "bg-red-950/50",
    action_button_variant: "destructive",
  },
};

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

  /**
   * Shows a loading spinner and disables the action button.
   * When true, renders a spinner icon before the action button text.
   * Does not affect cancel button.
   * Ignored if footerContent is provided.
   */
  actionButtonLoading?: boolean;

  /**
   * Disables the action button.
   * Ignored if footerContent is provided.
   */
  actionButtonDisabled?: boolean;

  /**
   * Icon element rendered before the action button text.
   * Typically a Lucide icon like <Send className="h-4 w-4 mr-2" />
   * When actionButtonLoading is true, this is replaced with a spinner.
   * Ignored if footerContent is provided.
   */
  actionButtonIcon?: React.ReactNode;

  /**
   * Custom footer content that completely replaces the default footer.
   * When provided, actionButtonText, onConfirm, onCancel, showCancelButton,
   * actionButtonLoading, actionButtonIcon are all ignored.
   * Use this for complex layouts like stats + buttons, multiple actions,
   * or conditional button rendering.
   */
  footerContent?: React.ReactNode;

  // Size Configuration (responsive)
  sizeWidth?: string;
  sizeHeight?: string;

  // Animation Configuration
  openAnimation?: AnimationPreset | string;
  closeAnimation?: AnimationPreset | string;

  // Variant (preset color theme)
  variant?: DialogVariant;

  /**
   * Controls header layout when a variant is active.
   * - true (default): title and description get separate background rows
   * - false: single header background, description rendered as italic subtext
   */
  splitHeader?: boolean;

  // Color Customization (overrides variant preset if both provided)
  headerBackgroundColor?: string;
  descriptionBackgroundColor?: string;
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
  actionButtonVariant,
  cancelButtonText = "Cancel",
  showCancelButton = true,
  actionButtonLoading = false,
  actionButtonDisabled = false,
  actionButtonIcon,
  footerContent,
  sizeWidth = "min(90vw, 600px)",
  sizeHeight = "min(80vh, 800px)",
  openAnimation = "zoom",
  closeAnimation = "zoom",
  variant = "default",
  splitHeader = true,
  headerBackgroundColor,
  descriptionBackgroundColor,
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
  // Get global config as defaults
  const config = get_hazo_ui_config();

  // Resolve variant preset (undefined for 'default' variant)
  const variant_preset = variant !== "default" ? VARIANT_PRESETS[variant] : undefined;

  // Resolve action button variant: prop > variant preset > "default"
  const resolved_action_button_variant = actionButtonVariant ?? variant_preset?.action_button_variant ?? "default";

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
  // Three-tier resolution: prop > variant preset > config
  const resolved_border_color = borderColor ?? variant_preset?.border_color;

  const contentStyles: React.CSSProperties = {
    width: sizeWidth,
    maxHeight: sizeHeight,
    ...(resolved_border_color && { borderColor: resolved_border_color }),
  };

  // Header styles - combine headerBar with custom colors, using variant then config as fallback
  const finalHeaderBackgroundColor = headerBackgroundColor ?? variant_preset?.header_background_color ?? config.header_background_color;
  const finalDescriptionBgColor = descriptionBackgroundColor ?? variant_preset?.description_background_color;
  const finalHeaderTextColor = headerTextColor ?? variant_preset?.header_text_color ?? config.header_text_color;

  // Variant is active when not 'default'
  const is_variant_active = variant !== "default";

  // When splitHeader is true with a description bg, render two separate background rows
  const has_split_header = splitHeader && !headerBar && !!finalDescriptionBgColor && !!description;

  // When splitHeader is false but variant is active, use single bg with italic description
  const has_merged_variant_header = !splitHeader && is_variant_active && !headerBar && !!description;

  const headerStyles: React.CSSProperties = {
    ...(headerBar && {
      backgroundColor: headerBarColor,
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    }),
    ...(!has_split_header && finalHeaderBackgroundColor && !headerBar && { backgroundColor: finalHeaderBackgroundColor }),
    ...(!has_split_header && finalHeaderTextColor && { color: finalHeaderTextColor }),
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

  // Build button styles for accent color and config colors
  const finalSubmitBgColor = accentColor ?? variant_preset?.accent_color ?? config.submit_button_background_color;
  const finalSubmitTextColor = config.submit_button_text_color;
  const finalCancelBgColor = config.cancel_button_background_color;
  const finalCancelTextColor = config.cancel_button_text_color;
  const finalCancelBorderColor = config.cancel_button_border_color;

  const actionButtonStyles: React.CSSProperties = {
    ...(finalSubmitBgColor && resolved_action_button_variant === "default" && {
      backgroundColor: finalSubmitBgColor,
      borderColor: finalSubmitBgColor,
    }),
    ...(finalSubmitTextColor && resolved_action_button_variant === "default" && {
      color: finalSubmitTextColor,
    }),
  };

  const cancelButtonStyles: React.CSSProperties = {
    ...(finalCancelBgColor && { backgroundColor: finalCancelBgColor }),
    ...(finalCancelTextColor && { color: finalCancelTextColor }),
    ...(finalCancelBorderColor && { borderColor: finalCancelBorderColor }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Custom DialogOverlay for background customization */}
        <DialogOverlay
          className={cn("cls_hazo_dialog_overlay", overlayClassName ?? variant_preset?.overlay_class_name)}
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
          {has_split_header ? (
            /* Split header: two rows with different backgrounds */
            <DialogHeader
              className={cn(
                "cls_dialog_header shrink-0 p-0 space-y-0",
                headerClassName
              )}
            >
              {/* Title row - main header background */}
              <div
                className="cls_dialog_header_title px-6 pt-6 pb-3"
                style={{
                  ...(finalHeaderBackgroundColor && { backgroundColor: finalHeaderBackgroundColor }),
                  ...(finalHeaderTextColor && { color: finalHeaderTextColor }),
                }}
              >
                <DialogTitle className={titleClassName}>
                  {title}
                </DialogTitle>
              </div>
              {/* Description row - lighter sub-header background */}
              <div
                className="cls_dialog_header_description px-6 py-1.5"
                style={{
                  backgroundColor: finalDescriptionBgColor,
                  ...(finalHeaderTextColor && { color: finalHeaderTextColor }),
                }}
              >
                <DialogDescription className={cn(descriptionClassName, "italic text-xs")}>
                  {description}
                </DialogDescription>
              </div>
            </DialogHeader>
          ) : (
            /* Single header: one background, italic description when variant is active */
            <DialogHeader
              className={cn(
                "cls_dialog_header shrink-0",
                !headerBar && "p-6 pb-4",
                has_merged_variant_header && "pb-3",
                headerClassName
              )}
              style={headerStyles}
            >
              <DialogTitle className={titleClassName}>
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className={cn(
                  descriptionClassName,
                  has_merged_variant_header && "italic text-xs mt-1"
                )}>
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}

          {/* Body - Scrollable */}
          <div
            className={cn(
              "cls_dialog_body",
              "px-6 py-4 overflow-y-auto flex-1 min-h-0",
              contentClassName
            )}
            style={bodyStyles}
          >
            {children}
          </div>

          {/* Footer - Fixed, Right-aligned buttons */}
          <DialogFooter
            className={cn("cls_dialog_footer shrink-0 p-6 pt-4", footerClassName)}
            style={footerStyles}
          >
            {footerContent ? (
              // Custom footer content replaces default buttons
              footerContent
            ) : (
              // Default footer with action and cancel buttons
              <>
                {showCancelButton && (
                  <Button
                    type="button"
                    className="cls_cancel_button"
                    variant="outline"
                    onClick={handleCancel}
                    style={cancelButtonStyles}
                  >
                    {cancelButtonText}
                  </Button>
                )}
                <Button
                  type="button"
                  className="cls_confirm_button"
                  variant={resolved_action_button_variant}
                  onClick={handleConfirm}
                  style={actionButtonStyles}
                  disabled={actionButtonLoading || actionButtonDisabled}
                >
                  {actionButtonLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    actionButtonIcon
                  )}
                  {actionButtonText}
                </Button>
              </>
            )}
          </DialogFooter>

          {/* Close button */}
          {showCloseButton && (
            <DialogPrimitive.Close
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              style={
                headerBar
                  ? { color: "white" }
                  : finalHeaderTextColor
                  ? { color: finalHeaderTextColor }
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
