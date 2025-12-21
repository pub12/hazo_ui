"use client";

/**
 * Toolbar Button Component
 *
 * Reusable button component for the RTE toolbar with active/disabled states
 * and tooltip support.
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip";

export interface ToolbarButtonProps {
  onClick?: () => void;
  is_active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  children: React.ReactNode;
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(
  (
    { onClick, is_active = false, disabled = false, tooltip, className, children },
    ref
  ) => {
    const button = (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "cls_rte_toolbar_button",
          "inline-flex items-center justify-center",
          "h-8 w-8 rounded-md",
          "text-sm font-medium",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          // Default state
          "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          // Active state
          is_active && "bg-accent text-accent-foreground",
          // Disabled state
          disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground",
          className
        )}
      >
        {children}
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  }
);

ToolbarButton.displayName = "ToolbarButton";
