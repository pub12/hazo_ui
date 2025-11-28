"use client";

/**
 * Multi State Radio Component
 * 
 * Flexible radio button/icon selection component with support for single and multi-selection modes,
 * customizable layouts, and react-icons integration.
 */

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { cn } from "../../lib/utils";
// Import icon sets - tree-shaking will remove unused ones
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";
import * as CiIcons from "react-icons/ci";

// Icon set mapping
const iconSetMap: Record<string, any> = {
  fa: FaIcons,
  md: MdIcons,
  hi: HiIcons,
  bi: BiIcons,
  ai: AiIcons,
  bs: BsIcons,
  fi: FiIcons,
  io: IoIcons,
  io5: IoIcons,
  ri: RiIcons,
  tb: TbIcons,
  ci: CiIcons,
};

/**
 * Get icon library for a given icon set
 */
function getIconLibrary(iconSet: string): any {
  if (!iconSet) return null;
  const normalizedSet = iconSet.toLowerCase();
  return iconSetMap[normalizedSet] || null;
}

export interface MultiStateRadioItem {
  label: string;
  value: string;
  icon_selected?: string;
  icon_unselected?: string;
  fgcolor?: string; // Foreground color for the icon (text/icon color)
  bgcolor?: string; // Background color for the icon button
}

export interface MultiStateRadioProps {
  layout?: "horizontal" | "vertical";
  style?: "radio" | "icons";
  display_label?: boolean;
  icon_set?: string; // Package name like 'fa', 'md', etc.
  data: MultiStateRadioItem[];
  selection: "single" | "multi";
  value: string | string[];
  onChange: (value: string | string[]) => void;
  className?: string;
  compressed?: boolean; // When true, removes padding and spacing between elements
}

/**
 * Get icon component from react-icons based on icon set and icon name
 */
function getIconComponent(iconSet: string | undefined, iconName: string | undefined): React.ComponentType<any> | null {
  if (!iconSet || !iconName) return null;
  
  const iconLibrary = getIconLibrary(iconSet);
  if (!iconLibrary) return null;
  
  const IconComponent = iconLibrary[iconName];
  return IconComponent || null;
}

/**
 * Multi State Radio Component
 * Supports single and multi-selection with radio buttons or icons
 */
export function MultiStateRadio({
  layout = "horizontal",
  style = "radio",
  display_label = true,
  icon_set,
  data,
  selection = "single",
  value,
  onChange,
  className,
  compressed = false,
}: MultiStateRadioProps) {
  // Icon library is loaded lazily when needed

  /**
   * Handle single selection change
   */
  const handleSingleSelection = (selectedValue: string) => {
    onChange(selectedValue);
  };

  /**
   * Handle multi selection change
   */
  const handleMultiSelection = (selectedValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const isSelected = currentValues.includes(selectedValue);
    
    if (isSelected) {
      // Remove from selection
      onChange(currentValues.filter((v) => v !== selectedValue));
    } else {
      // Add to selection
      onChange([...currentValues, selectedValue]);
    }
  };

  /**
   * Check if an item is selected
   */
  const isSelected = (itemValue: string): boolean => {
    if (selection === "single") {
      return value === itemValue;
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      return currentValues.includes(itemValue);
    }
  };

  /**
   * Render radio style option
   */
  const renderRadioOption = (item: MultiStateRadioItem) => {
    const selected = isSelected(item.value);
    
    if (selection === "single") {
      const optionContent = (
        <div
          className={cn(
            "cls_radio_option flex items-center gap-2",
            layout === "horizontal" ? "flex-row" : "flex-col",
            compressed ? "" : "p-2 rounded-md",
            "hover:bg-accent transition-colors",
            selected && "bg-accent"
          )}
        >
          <RadioGroupItem
            value={item.value}
            id={`radio-${item.value}`}
            className="cls_radio_item shrink-0"
          />
          {display_label && (
            <label
              htmlFor={`radio-${item.value}`}
              className="cls_radio_label text-sm font-medium cursor-pointer flex-1"
            >
              {item.label}
            </label>
          )}
        </div>
      );
      
      return (
        <Tooltip key={item.value} delayDuration={1000}>
          <TooltipTrigger asChild>
            {optionContent}
          </TooltipTrigger>
          <TooltipContent>
            <p className="cls_tooltip_text">{item.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    } else {
      // Multi-selection with checkbox-like behavior
      const optionContent = (
        <div
          className={cn(
            "cls_radio_option flex items-center gap-2 cursor-pointer",
            layout === "horizontal" ? "flex-row" : "flex-col",
            compressed ? "" : "p-2 rounded-md",
            "hover:bg-accent transition-colors",
            selected && "bg-accent"
          )}
          onClick={() => handleMultiSelection(item.value)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleMultiSelection(item.value);
            }
          }}
        >
          <div
            className={cn(
              "cls_checkbox_indicator h-4 w-4 rounded-sm border-2 border-primary flex items-center justify-center transition-colors shrink-0",
              selected ? "bg-primary" : "bg-background"
            )}
          >
            {selected && (
              <svg
                className="cls_checkmark h-3 w-3 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          {display_label && (
            <span className="cls_checkbox_label text-sm font-medium flex-1">
              {item.label}
            </span>
          )}
        </div>
      );
      
      return (
        <Tooltip key={item.value} delayDuration={1000}>
          <TooltipTrigger asChild>
            {optionContent}
          </TooltipTrigger>
          <TooltipContent>
            <p className="cls_tooltip_text">{item.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    }
  };

  /**
   * Render icon style option
   */
  const renderIconOption = (item: MultiStateRadioItem) => {
    const selected = isSelected(item.value);
    
    // Get icon components
    const SelectedIcon = icon_set && item.icon_selected
      ? getIconComponent(icon_set, item.icon_selected)
      : null;
    const UnselectedIcon = icon_set && item.icon_unselected
      ? getIconComponent(icon_set, item.icon_unselected)
      : null;
    
    const IconComponent = selected && SelectedIcon ? SelectedIcon : (UnselectedIcon || SelectedIcon);
    
    // Apply custom colors if provided
    const buttonStyles: React.CSSProperties = {};
    if (item.bgcolor) {
      buttonStyles.backgroundColor = item.bgcolor;
    }
    
    const buttonContent = (
      <Button
        variant={selected ? "default" : "ghost"}
        size="default"
        className={cn(
          "cls_icon_option border-0",
          layout === "horizontal" ? "flex-row" : "flex-col",
          "gap-2 h-auto",
          compressed ? "py-0 px-0" : "py-2 px-3 sm:py-3 sm:px-4",
          // Only apply default colors if custom colors are not provided
          !item.bgcolor && selected && "bg-primary text-primary-foreground",
          !item.bgcolor && !selected && "hover:bg-accent"
        )}
        style={Object.keys(buttonStyles).length > 0 ? buttonStyles : undefined}
        onClick={() => {
          if (selection === "single") {
            handleSingleSelection(item.value);
          } else {
            handleMultiSelection(item.value);
          }
        }}
        aria-label={item.label}
        aria-pressed={selected}
      >
        {IconComponent && (
          <IconComponent 
            className="cls_icon h-4 w-4 sm:h-5 sm:w-5" 
            style={item.fgcolor ? { color: item.fgcolor } : undefined}
          />
        )}
        {display_label && (
          <span 
            className="cls_icon_label text-sm font-medium"
            style={item.fgcolor ? { color: item.fgcolor } : undefined}
          >
            {item.label}
          </span>
        )}
      </Button>
    );
    
    return (
      <Tooltip key={item.value} delayDuration={1000}>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent>
          <p className="cls_tooltip_text">{item.label}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  // Container classes with single outline
  const containerClasses = cn(
    "cls_multi_state_radio border border-input rounded-md",
    compressed ? "" : "p-2 sm:p-3",
    layout === "horizontal"
      ? cn(
          "flex flex-row flex-wrap",
          compressed ? "gap-0" : "gap-2 sm:gap-3"
        )
      : cn(
          "flex flex-col",
          compressed ? "gap-0" : "gap-2 sm:gap-3"
        ),
    className
  );
  
  // RadioGroup needs grid override for flex layout
  const radioGroupClasses = cn(
    containerClasses,
    "!flex !flex-row !flex-wrap" // Override RadioGroup's default grid
  );

  if (style === "icons") {
    // Icon style - use buttons
    return (
      <TooltipProvider delayDuration={1000}>
        <div className={containerClasses} role={selection === "single" ? "radiogroup" : "group"}>
          {data.map((item) => renderIconOption(item))}
        </div>
      </TooltipProvider>
    );
    } else {
      // Radio style - use RadioGroup for single, custom for multi
      if (selection === "single") {
        return (
          <TooltipProvider delayDuration={1000}>
            <RadioGroup
              value={typeof value === "string" ? value : ""}
              onValueChange={handleSingleSelection}
              className={layout === "horizontal" 
                ? cn(radioGroupClasses, "!flex-row")
                : cn(radioGroupClasses, "!flex-col")
              }
            >
              {data.map((item) => renderRadioOption(item))}
            </RadioGroup>
          </TooltipProvider>
        );
      } else {
        return (
          <TooltipProvider delayDuration={1000}>
            <div className={containerClasses} role="group">
              {data.map((item) => renderRadioOption(item))}
            </div>
          </TooltipProvider>
        );
      }
    }
}

