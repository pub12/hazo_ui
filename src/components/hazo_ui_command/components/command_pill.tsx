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
 * CommandPill - Displays a command as a styled badge/pill
 */
export const CommandPill: React.FC<CommandPillProps> = ({
  prefix,
  action,
  action_label,
  id,
  selected = false,
  variant = "default",
  on_click,
}) => {
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
        get_variant_classes(variant),
        selected && "ring-2 ring-ring ring-offset-1",
        on_click && "cursor-pointer"
      )}
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
      <span className="text-muted-foreground opacity-70">{prefix}</span>
      <span>{action_label}</span>
    </span>
  );
};

CommandPill.displayName = "CommandPill";

export default CommandPill;
