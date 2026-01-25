/**
 * Command Popover Component
 *
 * Dropdown menu for searching and selecting commands.
 * Supports keyboard navigation and command grouping.
 *
 * Rendered via React Portal to document.body to escape parent stacking
 * contexts and ensure the dropdown floats above all page content.
 *
 * Note: The query filtering is handled by TipTap's suggestion extension,
 * so typing continues in the editor and filters the list automatically.
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/utils";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../ui/command";
import type { CommandItem as CommandItemType, CommandPopoverProps } from "../types";

/**
 * Group commands by their group property
 */
const group_commands = (commands: CommandItemType[]): Map<string, CommandItemType[]> => {
  const groups = new Map<string, CommandItemType[]>();

  for (const cmd of commands) {
    const group_name = cmd.group || "";
    if (!groups.has(group_name)) {
      groups.set(group_name, []);
    }
    groups.get(group_name)!.push(cmd);
  }

  return groups;
};

/**
 * CommandPopover - Dropdown for command selection
 */
export const CommandPopover: React.FC<CommandPopoverProps> = ({
  is_open,
  commands,
  prefix,
  query,
  selected_index,
  position,
  on_select,
  on_close,
  on_selection_change: _on_selection_change,
}) => {
  const container_ref = React.useRef<HTMLDivElement>(null);

  // Grouped commands for display
  const grouped_commands = React.useMemo(
    () => group_commands(commands),
    [commands]
  );

  // Close on click outside
  React.useEffect(() => {
    const handle_click_outside = (e: MouseEvent) => {
      if (
        container_ref.current &&
        !container_ref.current.contains(e.target as Node)
      ) {
        on_close();
      }
    };

    if (is_open) {
      document.addEventListener("mousedown", handle_click_outside);
      return () => {
        document.removeEventListener("mousedown", handle_click_outside);
      };
    }
  }, [is_open, on_close]);

  // Track if we're in a browser environment for SSR compatibility
  const [mounted, set_mounted] = React.useState(false);

  React.useEffect(() => {
    set_mounted(true);
  }, []);

  if (!is_open || !mounted) return null;

  const popover_content = (
    <div
      ref={container_ref}
      className={cn(
        "cls_command_popover",
        "fixed",
        "w-64 min-w-[200px] max-w-[300px]",
        "rounded-md border bg-popover text-popover-foreground shadow-lg",
        "animate-in fade-in-0 zoom-in-95"
      )}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 9999,
        // Fallback background for consuming apps that may use hex CSS variables
        // (Tailwind's bg-popover generates hsl(var(--popover)) which fails with hex values)
        backgroundColor: "var(--popover, hsl(0 0% 100%))",
        color: "var(--popover-foreground, hsl(222.2 84% 4.9%))",
      }}
    >
      <Command className="rounded-md">
        {/* Show query hint if user is typing */}
        {query && (
          <div className="px-3 py-2 text-xs text-muted-foreground border-b">
            Searching: <span className="font-medium">{prefix}{query}</span>
          </div>
        )}
        <CommandList className="max-h-[200px]">
          {commands.length === 0 && (
            <CommandEmpty>No commands found.</CommandEmpty>
          )}
          {Array.from(grouped_commands.entries()).map(([group_name, group_commands]) => (
            <CommandGroup
              key={group_name || "default"}
              heading={group_name || undefined}
            >
              {group_commands.map((cmd, idx) => {
                // Calculate flat index for this command
                let flat_idx = 0;
                for (const [g, cmds] of grouped_commands.entries()) {
                  if (g === group_name) {
                    flat_idx += idx;
                    break;
                  }
                  flat_idx += cmds.length;
                }

                return (
                  <CommandItem
                    key={cmd.action}
                    value={cmd.action}
                    onSelect={() => on_select(cmd)}
                    selected={flat_idx === selected_index}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {cmd.icon && (
                        <span className="flex-shrink-0 text-muted-foreground">
                          {cmd.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {prefix}
                          {cmd.action_label}
                        </div>
                        {cmd.action_description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {cmd.action_description}
                          </div>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  );

  // Render via portal to escape parent stacking contexts
  return createPortal(popover_content, document.body);
};

CommandPopover.displayName = "CommandPopover";

export default CommandPopover;
