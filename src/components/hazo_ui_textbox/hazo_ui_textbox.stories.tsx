// Storybook stories for HazoUiTextbox component
// Used for testing single-line input with command/mention support
import type { Meta, StoryObj } from "@storybook/react";
import { HazoUiTextbox } from "./index";
import { useState } from "react";
import type { CommandTextOutput, PrefixConfig, CommandItem } from "../hazo_ui_command/types";
import { FiUser, FiCalendar, FiFlag } from "react-icons/fi";

// Sample command configurations
const sample_users: CommandItem[] = [
  { action: "user_1", action_label: "John Doe", action_description: "Engineering", group: "Team" },
  { action: "user_2", action_label: "Jane Smith", action_description: "Design", group: "Team" },
  { action: "user_3", action_label: "Bob Wilson", action_description: "Product", group: "Team" },
  { action: "user_4", action_label: "Alice Chen", action_description: "QA", group: "Team" },
];

const sample_commands: CommandItem[] = [
  { action: "due_date", action_label: "Due Date", action_description: "Set task due date", icon: <FiCalendar size={14} /> },
  { action: "priority", action_label: "Priority", action_description: "Set priority level", icon: <FiFlag size={14} /> },
  { action: "assign", action_label: "Assign", action_description: "Assign to someone", icon: <FiUser size={14} /> },
];

const sample_tags: CommandItem[] = [
  { action: "bug", action_label: "bug", action_description: "Bug report" },
  { action: "feature", action_label: "feature", action_description: "Feature request" },
  { action: "urgent", action_label: "urgent", action_description: "Urgent issue" },
  { action: "review", action_label: "review", action_description: "Needs review" },
];

const meta: Meta<typeof HazoUiTextbox> = {
  title: "Components/HazoUiTextbox",
  component: HazoUiTextbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HazoUiTextbox>;

/**
 * Basic textbox with slash commands
 */
export const Default: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Type "/" to see available commands. Select a command to insert it as a pill.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Type / for commands..."
          prefixes={prefixes}
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <div className="cls_output_values space-y-1 text-xs">
            <p><strong>Plain text:</strong> {output?.plain_text || "(empty)"}</p>
            <p><strong>Display text:</strong> {output?.display_text || "(empty)"}</p>
            <p><strong>Commands:</strong> {output?.commands.length || 0}</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textbox with mentions (@)
 */
export const WithMentions: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: sample_users },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Type "@" to mention a team member.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Type @ to mention someone..."
          prefixes={prefixes}
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <div className="cls_output_values space-y-1 text-xs">
            <p><strong>Plain text:</strong> {output?.plain_text || "(empty)"}</p>
            <p><strong>Display text:</strong> {output?.display_text || "(empty)"}</p>
            <p><strong>Commands:</strong> {JSON.stringify(output?.commands.map(c => `${c.prefix}${c.action}`))}</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textbox with tags (#)
 */
export const WithTags: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "#", commands: sample_tags },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Type "#" to add a tag.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Type # to add a tag..."
          prefixes={prefixes}
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <div className="cls_output_values space-y-1 text-xs">
            <p><strong>Plain text:</strong> {output?.plain_text || "(empty)"}</p>
            <p><strong>Display text:</strong> {output?.display_text || "(empty)"}</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textbox with multiple prefixes
 */
export const MultiplePrefixes: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: sample_users },
      { char: "/", commands: sample_commands },
      { char: "#", commands: sample_tags },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            This textbox supports multiple prefixes: @ for mentions, / for commands, # for tags.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Type @, /, or # for different commands..."
          prefixes={prefixes}
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <div className="cls_output_values space-y-1 text-xs">
            <p><strong>Plain text:</strong> {output?.plain_text || "(empty)"}</p>
            <p><strong>Display text:</strong> {output?.display_text || "(empty)"}</p>
            <p><strong>Commands ({output?.commands.length || 0}):</strong></p>
            {output?.commands.map((cmd, i) => (
              <p key={i} className="ml-2">{cmd.prefix}{cmd.action} ({cmd.action_label})</p>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textbox with submit handler
 */
export const WithSubmit: Story = {
  render: () => {
    const [submitted, set_submitted] = useState<string | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: sample_users },
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Press Enter to submit. The plain text value will be captured.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Type a message and press Enter..."
          prefixes={prefixes}
          on_submit={(out) => {
            set_submitted(out.plain_text);
          }}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Last Submitted:</p>
          <p className="cls_output_value text-sm">{submitted || "(none)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Textbox with different pill variants
 */
export const PillVariants: Story = {
  render: () => {
    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Pills can be styled with different variants. Type "/" in each to see the difference.
          </p>
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Default Variant</h3>
          <HazoUiTextbox
            placeholder="Type / to insert..."
            prefixes={prefixes}
            pill_variant="default"
          />
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Outline Variant</h3>
          <HazoUiTextbox
            placeholder="Type / to insert..."
            prefixes={prefixes}
            pill_variant="outline"
          />
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Subtle Variant</h3>
          <HazoUiTextbox
            placeholder="Type / to insert..."
            prefixes={prefixes}
            pill_variant="subtle"
          />
        </div>
      </div>
    );
  },
};

/**
 * Textbox - Disabled state
 */
export const Disabled: Story = {
  render: () => {
    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Disabled textbox - cannot be edited or interacted with.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="This is disabled..."
          prefixes={prefixes}
          disabled={true}
          default_value="Some /priority content"
        />
      </div>
    );
  },
};

/**
 * Textbox with command insert callback
 */
export const WithCommandCallbacks: Story = {
  render: () => {
    const [events, set_events] = useState<string[]>([]);

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: sample_users },
      { char: "/", commands: sample_commands },
    ];

    const add_event = (msg: string) => {
      set_events((prev) => [...prev.slice(-4), msg]);
    };

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Callbacks fire when commands are inserted. Try adding some commands.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Type @ or / to insert commands..."
          prefixes={prefixes}
          on_command_insert={(cmd, prefix) => {
            add_event(`Inserted: ${prefix}${cmd.action_label}`);
          }}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Events:</p>
          <div className="cls_output_events space-y-1 text-xs">
            {events.length === 0 && <p className="text-muted-foreground">(no events yet)</p>}
            {events.map((event, i) => (
              <p key={i}>{event}</p>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Task assignment example
 */
export const TaskAssignmentExample: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const team_members: CommandItem[] = [
      { action: "alice", action_label: "Alice Chen", action_description: "Frontend Dev", group: "Engineering" },
      { action: "bob", action_label: "Bob Wilson", action_description: "Backend Dev", group: "Engineering" },
      { action: "carol", action_label: "Carol Jones", action_description: "Designer", group: "Design" },
      { action: "dave", action_label: "Dave Smith", action_description: "PM", group: "Product" },
    ];

    const task_commands: CommandItem[] = [
      { action: "due_today", action_label: "Due Today", icon: <FiCalendar size={14} /> },
      { action: "due_tomorrow", action_label: "Due Tomorrow", icon: <FiCalendar size={14} /> },
      { action: "due_this_week", action_label: "Due This Week", icon: <FiCalendar size={14} /> },
      { action: "high_priority", action_label: "High Priority", icon: <FiFlag size={14} /> },
      { action: "low_priority", action_label: "Low Priority", icon: <FiFlag size={14} /> },
    ];

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: team_members },
      { char: "/", commands: task_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <h3 className="cls_section_title text-base font-semibold mb-2">Task Assignment</h3>
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Create a task: mention someone with @, set due date or priority with /.
          </p>
        </div>

        <HazoUiTextbox
          placeholder="Review PR for login feature @alice /due_tomorrow"
          prefixes={prefixes}
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Task Preview:</p>
          <div className="cls_output_values space-y-2 text-sm">
            <p><strong>Task:</strong> {output?.display_text || "(describe your task)"}</p>
            <p><strong>Assignees:</strong> {
              output?.commands
                .filter(c => c.prefix === "@")
                .map(c => c.action_label)
                .join(", ") || "(none)"
            }</p>
            <p><strong>Settings:</strong> {
              output?.commands
                .filter(c => c.prefix === "/")
                .map(c => c.action_label)
                .join(", ") || "(none)"
            }</p>
          </div>
        </div>
      </div>
    );
  },
};
