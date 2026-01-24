// Storybook stories for HazoUiCommand components
// Used for testing and development of command/mention functionality
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CommandPill } from "./components/command_pill";
import { CommandPopover } from "./components/command_popover";
import type { CommandItem } from "./types";
import { FiUser, FiCalendar, FiFlag, FiTag, FiHash } from "react-icons/fi";

// Sample command data for stories
const sample_commands: CommandItem[] = [
  { action: "due_date", action_label: "Due Date", action_description: "Set task due date", icon: <FiCalendar size={14} /> },
  { action: "priority", action_label: "Priority", action_description: "Set priority level", icon: <FiFlag size={14} /> },
  { action: "assign", action_label: "Assign", action_description: "Assign to someone", icon: <FiUser size={14} /> },
  { action: "tag", action_label: "Tag", action_description: "Add a tag", icon: <FiTag size={14} /> },
];

const meta: Meta = {
  title: "Components/HazoUiCommand",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

/**
 * Command Pill - Default variant
 */
export const PillDefault: StoryObj = {
  render: () => {
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Command pills render commands as styled badges with prefix + label display.
          </p>
        </div>

        <div className="cls_pills_showcase flex flex-wrap gap-2">
          <CommandPill
            prefix="@"
            action="user_123"
            action_label="John Doe"
            id="pill_1"
            variant="default"
          />
          <CommandPill
            prefix="/"
            action="due_date"
            action_label="Due Date"
            id="pill_2"
            variant="default"
          />
          <CommandPill
            prefix="#"
            action="urgent"
            action_label="urgent"
            id="pill_3"
            variant="default"
          />
        </div>
      </div>
    );
  },
};

/**
 * Command Pill - All variants
 */
export const PillVariants: StoryObj = {
  render: () => {
    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Pills support three style variants: default, outline, and subtle.
          </p>
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Default</h3>
          <div className="cls_pills flex flex-wrap gap-2">
            <CommandPill prefix="@" action="user" action_label="John" id="v1" variant="default" />
            <CommandPill prefix="/" action="cmd" action_label="Command" id="v2" variant="default" />
          </div>
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Outline</h3>
          <div className="cls_pills flex flex-wrap gap-2">
            <CommandPill prefix="@" action="user" action_label="John" id="v3" variant="outline" />
            <CommandPill prefix="/" action="cmd" action_label="Command" id="v4" variant="outline" />
          </div>
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Subtle</h3>
          <div className="cls_pills flex flex-wrap gap-2">
            <CommandPill prefix="@" action="user" action_label="John" id="v5" variant="subtle" />
            <CommandPill prefix="/" action="cmd" action_label="Command" id="v6" variant="subtle" />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Command Pill - Clickable
 */
export const PillClickable: StoryObj = {
  render: () => {
    const [clicked_pill, set_clicked_pill] = useState<string | null>(null);

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Pills can be clickable for editing. Click any pill to see the event.
          </p>
        </div>

        <div className="cls_pills_showcase flex flex-wrap gap-2">
          <CommandPill
            prefix="@"
            action="user_1"
            action_label="John Doe"
            id="click_1"
            on_click={() => set_clicked_pill("@John Doe")}
          />
          <CommandPill
            prefix="/"
            action="priority"
            action_label="Priority"
            id="click_2"
            on_click={() => set_clicked_pill("/Priority")}
          />
          <CommandPill
            prefix="#"
            action="bug"
            action_label="bug"
            id="click_3"
            on_click={() => set_clicked_pill("#bug")}
          />
        </div>

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Last Clicked:</p>
          <p className="cls_output_value text-sm">{clicked_pill || "(none)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Command Popover - Basic
 */
export const PopoverBasic: StoryObj = {
  render: () => {
    const [is_open, set_is_open] = useState(true);
    const [selected_index, set_selected_index] = useState(0);
    const [selected_command, set_selected_command] = useState<CommandItem | null>(null);

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md relative h-[400px]">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Command popover for searching and selecting commands. Try typing to filter.
          </p>
        </div>

        <button
          className="cls_toggle_button px-4 py-2 border rounded-md text-sm"
          onClick={() => set_is_open(!is_open)}
        >
          {is_open ? "Close Popover" : "Open Popover"}
        </button>

        <CommandPopover
          is_open={is_open}
          commands={sample_commands}
          prefix="/"
          query=""
          selected_index={selected_index}
          position={{ top: 100, left: 20 }}
          on_query_change={() => {}}
          on_select={(cmd) => {
            set_selected_command(cmd);
            set_is_open(false);
          }}
          on_close={() => set_is_open(false)}
          on_selection_change={set_selected_index}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Command:</p>
          <p className="cls_output_value text-sm">
            {selected_command ? `/${selected_command.action_label}` : "(none)"}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Command Popover - With Groups
 */
export const PopoverWithGroups: StoryObj = {
  render: () => {
    const [is_open, set_is_open] = useState(true);
    const [selected_index, set_selected_index] = useState(0);
    const [selected_command, set_selected_command] = useState<CommandItem | null>(null);

    const grouped_commands: CommandItem[] = [
      { action: "due_date", action_label: "Due Date", group: "Date & Time", icon: <FiCalendar size={14} /> },
      { action: "start_date", action_label: "Start Date", group: "Date & Time", icon: <FiCalendar size={14} /> },
      { action: "priority_high", action_label: "High Priority", group: "Priority", icon: <FiFlag size={14} /> },
      { action: "priority_medium", action_label: "Medium Priority", group: "Priority", icon: <FiFlag size={14} /> },
      { action: "priority_low", action_label: "Low Priority", group: "Priority", icon: <FiFlag size={14} /> },
      { action: "tag_bug", action_label: "Bug", group: "Tags", icon: <FiHash size={14} /> },
      { action: "tag_feature", action_label: "Feature", group: "Tags", icon: <FiHash size={14} /> },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md relative h-[500px]">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Commands can be organized into groups for better discoverability.
          </p>
        </div>

        <button
          className="cls_toggle_button px-4 py-2 border rounded-md text-sm"
          onClick={() => set_is_open(!is_open)}
        >
          {is_open ? "Close Popover" : "Open Popover"}
        </button>

        <CommandPopover
          is_open={is_open}
          commands={grouped_commands}
          prefix="/"
          query=""
          selected_index={selected_index}
          position={{ top: 100, left: 20 }}
          on_query_change={() => {}}
          on_select={(cmd) => {
            set_selected_command(cmd);
            set_is_open(false);
          }}
          on_close={() => set_is_open(false)}
          on_selection_change={set_selected_index}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Command:</p>
          <p className="cls_output_value text-sm">
            {selected_command ? `/${selected_command.action_label}` : "(none)"}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Pills in Context
 */
export const PillsInContext: StoryObj = {
  render: () => {
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Example showing how pills appear inline with text content.
          </p>
        </div>

        <div className="cls_text_with_pills p-4 border rounded-md bg-white dark:bg-gray-950">
          <p className="text-sm leading-relaxed">
            Hey{" "}
            <CommandPill prefix="@" action="user_1" action_label="John" id="ctx_1" variant="default" />
            {" "}can you review the PR before{" "}
            <CommandPill prefix="/" action="due_date" action_label="Friday EOD" id="ctx_2" variant="default" />
            ? This is{" "}
            <CommandPill prefix="/" action="priority" action_label="High Priority" id="ctx_3" variant="default" />
            {" "}and tagged as{" "}
            <CommandPill prefix="#" action="review" action_label="review" id="ctx_4" variant="default" />
            .
          </p>
        </div>

        <div className="cls_output_example mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Plain text output:</p>
          <p className="cls_output_value text-xs font-mono">
            Hey @user_1 can you review the PR before /due_date? This is /priority and tagged as #review.
          </p>
        </div>
      </div>
    );
  },
};
