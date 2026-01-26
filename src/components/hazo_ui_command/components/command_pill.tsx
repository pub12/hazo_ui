/**
 * Command Pill Component
 *
 * Standalone pill component for displaying commands outside the editor.
 * Used in edit popovers and previews.
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import type { CommandPillProps } from "../types";

/**
 * Get variant-specific classes for the pill
 */
const get_variant_classes = (variant: CommandPillProps["variant"] = "default"): string => {
  switch (variant) {
    case "outline":
      return "bg-transparent border-primary/40 text-primary hover:bg-primary/5";
    case "subtle":
      return "bg-muted border-transparent text-muted-foreground hover:bg-muted/80";
    case "default":
    default:
      return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15";
  }
};

/**
 * Build custom inline styles from PrefixColor
 */
const get_custom_color_styles = (
  color?: CommandPillProps["color"]
): React.CSSProperties => {
  if (!color) {
    return {};
  }
  return {
    ...(color.bg && { backgroundColor: color.bg }),
    ...(color.fg && { color: color.fg }),
    ...(color.border && { borderColor: color.border }),
  };
};

/**
 * CommandPill - Displays a command as a styled badge/pill
 */
export const CommandPill: React.FC<CommandPillProps> = ({
  prefix,
  action,
  action_label,
  id,
  selected = false,
  variant = "default",
  color,
  on_click,
}) => {
  const use_custom_colors = Boolean(color?.bg || color?.fg || color?.border);
  const custom_styles = get_custom_color_styles(color);

  return (
    <span
      className={cn(
        "cls_command_pill_standalone",
        "inline-flex items-center",
        "px-1.5 py-0.5",
        "rounded-md",
        "text-sm font-medium",
        "border",
        "transition-all duration-150",
        // Only apply variant classes if no custom colors
        !use_custom_colors && get_variant_classes(variant),
        selected && "ring-2 ring-ring ring-offset-1",
        on_click && "cursor-pointer"
      )}
      style={custom_styles}
      data-command-id={id}
      data-command-prefix={prefix}
      data-command-action={action}
      onClick={on_click}
      role={on_click ? "button" : undefined}
      tabIndex={on_click ? 0 : undefined}
      onKeyDown={(e) => {
        if (on_click && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          on_click();
        }
      }}
    >
      <span className={cn(!use_custom_colors && "text-muted-foreground opacity-70")} style={use_custom_colors ? { opacity: 0.7 } : undefined}>{prefix}</span>
      <span>{action_label}</span>
    </span>
  );
};

CommandPill.displayName = "CommandPill";

export default CommandPill;
