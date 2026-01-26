// Storybook stories for HazoUiTextarea component
// Used for testing multi-line input with command/mention support
import type { Meta, StoryObj } from "@storybook/react";
import { HazoUiTextarea } from "./index";
import { useState } from "react";
import type { CommandTextOutput, PrefixConfig, CommandItem, PrefixColor } from "../hazo_ui_command/types";
import { FiUser, FiCalendar, FiFlag, FiLink, FiCode, FiImage } from "react-icons/fi";

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
  { action: "link", action_label: "Link", action_description: "Add a link", icon: <FiLink size={14} /> },
  { action: "code", action_label: "Code", action_description: "Add code block", icon: <FiCode size={14} /> },
  { action: "image", action_label: "Image", action_description: "Add an image", icon: <FiImage size={14} /> },
];

const sample_tags: CommandItem[] = [
  { action: "bug", action_label: "bug", action_description: "Bug report" },
  { action: "feature", action_label: "feature", action_description: "Feature request" },
  { action: "urgent", action_label: "urgent", action_description: "Urgent issue" },
  { action: "review", action_label: "review", action_description: "Needs review" },
  { action: "documentation", action_label: "documentation", action_description: "Documentation" },
];

const meta: Meta<typeof HazoUiTextarea> = {
  title: "Components/HazoUiTextarea",
  component: HazoUiTextarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HazoUiTextarea>;

/**
 * Basic textarea with slash commands
 */
export const Default: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Multi-line textarea. Type "/" to see available commands.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Type / for commands..."
          prefixes={prefixes}
          min_height="100px"
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <div className="cls_output_values space-y-1 text-xs">
            <p><strong>Plain text:</strong></p>
            <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
              {output?.plain_text || "(empty)"}
            </pre>
            <p><strong>Commands:</strong> {output?.commands.length || 0}</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textarea with multiple prefixes
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
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Supports multiple prefixes: @ for mentions, / for commands, # for tags.
            Try writing a multi-line message with different commands.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Write a message...&#10;Use @ to mention, / for commands, # for tags"
          prefixes={prefixes}
          min_height="120px"
          max_height="300px"
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <div className="cls_output_values space-y-1 text-xs">
            <p><strong>Display text:</strong></p>
            <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
              {output?.display_text || "(empty)"}
            </pre>
            <p><strong>Commands ({output?.commands.length || 0}):</strong></p>
            {output?.commands.map((cmd, i) => (
              <p key={i} className="ml-2">{cmd.prefix}{cmd.action} → {cmd.action_label}</p>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textarea with submit (Cmd/Ctrl+Enter)
 */
export const WithSubmit: Story = {
  render: () => {
    const [submitted, set_submitted] = useState<string | null>(null);

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: sample_users },
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Press Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux) to submit.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Type a message and press Cmd/Ctrl+Enter to submit..."
          prefixes={prefixes}
          min_height="100px"
          on_submit={(out) => {
            set_submitted(out.plain_text);
          }}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Last Submitted:</p>
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
            {submitted || "(none)"}
          </pre>
        </div>
      </div>
    );
  },
};

/**
 * Textarea with different heights
 */
export const HeightVariations: Story = {
  render: () => {
    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Textarea supports configurable min/max heights.
          </p>
        </div>

        <div className="cls_height_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Small (min: 60px, max: 120px)</h3>
          <HazoUiTextarea
            placeholder="Small textarea..."
            prefixes={prefixes}
            min_height="60px"
            max_height="120px"
          />
        </div>

        <div className="cls_height_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Medium (min: 100px, max: 200px)</h3>
          <HazoUiTextarea
            placeholder="Medium textarea..."
            prefixes={prefixes}
            min_height="100px"
            max_height="200px"
          />
        </div>

        <div className="cls_height_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Large (min: 150px, max: 400px)</h3>
          <HazoUiTextarea
            placeholder="Large textarea..."
            prefixes={prefixes}
            min_height="150px"
            max_height="400px"
          />
        </div>
      </div>
    );
  },
};

/**
 * Textarea using rows prop
 */
export const WithRows: Story = {
  render: () => {
    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Height can also be set using the rows prop.
          </p>
        </div>

        <div className="cls_rows_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">3 Rows</h3>
          <HazoUiTextarea
            placeholder="3 rows..."
            prefixes={prefixes}
            rows={3}
          />
        </div>

        <div className="cls_rows_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">6 Rows</h3>
          <HazoUiTextarea
            placeholder="6 rows..."
            prefixes={prefixes}
            rows={6}
          />
        </div>
      </div>
    );
  },
};

/**
 * Textarea with pill variants
 */
export const PillVariants: Story = {
  render: () => {
    const prefixes: PrefixConfig[] = [
      { char: "@", commands: sample_users },
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Pills can be styled with different variants.
          </p>
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Default Variant</h3>
          <HazoUiTextarea
            placeholder="Type @ or / to insert..."
            prefixes={prefixes}
            pill_variant="default"
            min_height="80px"
          />
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Outline Variant</h3>
          <HazoUiTextarea
            placeholder="Type @ or / to insert..."
            prefixes={prefixes}
            pill_variant="outline"
            min_height="80px"
          />
        </div>

        <div className="cls_variant_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Subtle Variant</h3>
          <HazoUiTextarea
            placeholder="Type @ or / to insert..."
            prefixes={prefixes}
            pill_variant="subtle"
            min_height="80px"
          />
        </div>
      </div>
    );
  },
};

/**
 * Textarea - Disabled state
 */
export const Disabled: Story = {
  render: () => {
    const prefixes: PrefixConfig[] = [
      { char: "/", commands: sample_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Disabled textarea - cannot be edited.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="This is disabled..."
          prefixes={prefixes}
          disabled={true}
          min_height="100px"
          default_value="Some pre-filled content with /priority command"
        />
      </div>
    );
  },
};

/**
 * Comment/Message composer example
 */
export const CommentComposer: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const team_members: CommandItem[] = [
      { action: "alice", action_label: "Alice Chen", action_description: "Frontend Dev" },
      { action: "bob", action_label: "Bob Wilson", action_description: "Backend Dev" },
      { action: "carol", action_label: "Carol Jones", action_description: "Designer" },
      { action: "dave", action_label: "Dave Smith", action_description: "PM" },
    ];

    const slash_commands: CommandItem[] = [
      { action: "approve", action_label: "Approve", action_description: "Approve this item", icon: <FiFlag size={14} /> },
      { action: "request_changes", action_label: "Request Changes", action_description: "Request modifications", icon: <FiFlag size={14} /> },
      { action: "close", action_label: "Close", action_description: "Close this item", icon: <FiFlag size={14} /> },
    ];

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: team_members },
      { char: "/", commands: slash_commands },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-xl">
        <div className="cls_description mb-2">
          <h3 className="cls_section_title text-base font-semibold mb-2">Add Comment</h3>
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Leave a comment on the pull request. Use @ to mention reviewers and / for actions.
          </p>
        </div>

        <div className="cls_composer_container border rounded-md p-4 bg-white dark:bg-gray-950">
          <HazoUiTextarea
            placeholder="Leave a comment...&#10;&#10;Mention with @ or use / for actions"
            prefixes={prefixes}
            min_height="120px"
            max_height="300px"
            on_change={set_output}
          />

          <div className="cls_composer_footer mt-3 flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Cmd+Enter to submit
            </p>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
              onClick={() => {
                console.log("Submitting:", output?.plain_text);
              }}
            >
              Comment
            </button>
          </div>
        </div>

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Preview:</p>
          <div className="cls_output_values space-y-2">
            <p className="text-sm whitespace-pre-wrap">{output?.display_text || "(empty comment)"}</p>
            {output && output.commands.length > 0 && (
              <div className="text-xs text-muted-foreground border-t pt-2 mt-2">
                <p><strong>Mentions:</strong> {output.commands.filter(c => c.prefix === "@").map(c => c.action_label).join(", ") || "None"}</p>
                <p><strong>Actions:</strong> {output.commands.filter(c => c.prefix === "/").map(c => c.action_label).join(", ") || "None"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Issue/Task description example
 */
export const IssueDescription: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    const team_members: CommandItem[] = [
      { action: "frontend", action_label: "Frontend Team", group: "Teams" },
      { action: "backend", action_label: "Backend Team", group: "Teams" },
      { action: "alice", action_label: "Alice Chen", action_description: "Tech Lead", group: "People" },
      { action: "bob", action_label: "Bob Wilson", action_description: "Senior Dev", group: "People" },
    ];

    const labels: CommandItem[] = [
      { action: "bug", action_label: "bug" },
      { action: "feature", action_label: "feature" },
      { action: "enhancement", action_label: "enhancement" },
      { action: "documentation", action_label: "documentation" },
      { action: "good_first_issue", action_label: "good first issue" },
    ];

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: team_members },
      { char: "#", commands: labels },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-xl">
        <div className="cls_description mb-2">
          <h3 className="cls_section_title text-base font-semibold mb-2">Issue Description</h3>
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Describe the issue. Use @ to assign and # to add labels.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Describe the issue...&#10;&#10;Example:&#10;The login button doesn't work on mobile.&#10;&#10;@frontend #bug"
          prefixes={prefixes}
          min_height="200px"
          max_height="400px"
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Issue Details:</p>
          <div className="cls_output_values space-y-2 text-sm">
            <div className="flex gap-2 flex-wrap">
              <strong className="text-xs">Labels:</strong>
              {output?.commands.filter(c => c.prefix === "#").map((c, i) => (
                <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                  {c.action_label}
                </span>
              ))}
              {(!output || output.commands.filter(c => c.prefix === "#").length === 0) && (
                <span className="text-muted-foreground text-xs">None</span>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <strong className="text-xs">Assigned:</strong>
              {output?.commands.filter(c => c.prefix === "@").map((c, i) => (
                <span key={i} className="text-xs">
                  {c.action_label}
                </span>
              ))}
              {(!output || output.commands.filter(c => c.prefix === "@").length === 0) && (
                <span className="text-muted-foreground text-xs">Unassigned</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Textarea with custom prefix colors
 */
export const CustomPrefixColors: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    // Define custom colors for each prefix type
    const mention_color: PrefixColor = {
      bg: "#DBEAFE",     // light blue background
      fg: "#1D4ED8",     // blue text
      border: "#93C5FD", // blue border
    };

    const command_color: PrefixColor = {
      bg: "#FEF3C7",     // light amber background
      fg: "#D97706",     // amber text
      border: "#FCD34D", // amber border
    };

    const tag_color: PrefixColor = {
      bg: "#D1FAE5",     // light green background
      fg: "#059669",     // green text
      border: "#6EE7B7", // green border
    };

    const team_members: CommandItem[] = [
      { action: "alice", action_label: "Alice Chen", action_description: "Frontend Dev" },
      { action: "bob", action_label: "Bob Wilson", action_description: "Backend Dev" },
      { action: "carol", action_label: "Carol Jones", action_description: "Designer" },
    ];

    const slash_commands: CommandItem[] = [
      { action: "due_date", action_label: "Due Date", icon: <FiCalendar size={14} /> },
      { action: "priority", action_label: "Priority", icon: <FiFlag size={14} /> },
      { action: "assign", action_label: "Assign", icon: <FiUser size={14} /> },
    ];

    const tags: CommandItem[] = [
      { action: "bug", action_label: "bug" },
      { action: "feature", action_label: "feature" },
      { action: "urgent", action_label: "urgent" },
    ];

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: team_members, color: mention_color },
      { char: "/", commands: slash_commands, color: command_color },
      { char: "#", commands: tags, color: tag_color },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <h3 className="cls_section_title text-base font-semibold mb-2">Custom Prefix Colors</h3>
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Each prefix type has a unique color scheme. Type @ (blue), / (amber), or # (green) to see colored pills.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Try @mention, /command, or #tag..."
          prefixes={prefixes}
          min_height="120px"
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Color Legend:</p>
          <div className="cls_legend flex flex-wrap gap-3 text-xs mb-4">
            <span className="px-2 py-1 rounded" style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8", border: "1px solid #93C5FD" }}>
              @mentions
            </span>
            <span className="px-2 py-1 rounded" style={{ backgroundColor: "#FEF3C7", color: "#D97706", border: "1px solid #FCD34D" }}>
              /commands
            </span>
            <span className="px-2 py-1 rounded" style={{ backgroundColor: "#D1FAE5", color: "#059669", border: "1px solid #6EE7B7" }}>
              #tags
            </span>
          </div>
          <p className="cls_output_label text-sm font-semibold mb-2">Output:</p>
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
            {output?.plain_text || "(empty)"}
          </pre>
        </div>
      </div>
    );
  },
};

/**
 * Mixed usage - some prefixes with colors, some with variant styling
 */
export const ColorsWithVariants: Story = {
  render: () => {
    const [output, set_output] = useState<CommandTextOutput | null>(null);

    // Only @mentions have custom colors
    const mention_color: PrefixColor = {
      bg: "#FEE2E2",     // light red background
      fg: "#DC2626",     // red text
      border: "#FCA5A5", // red border
    };

    const team_members: CommandItem[] = [
      { action: "alice", action_label: "Alice Chen" },
      { action: "bob", action_label: "Bob Wilson" },
    ];

    const slash_commands: CommandItem[] = [
      { action: "priority", action_label: "Priority", icon: <FiFlag size={14} /> },
      { action: "link", action_label: "Link", icon: <FiLink size={14} /> },
    ];

    const tags: CommandItem[] = [
      { action: "bug", action_label: "bug" },
      { action: "feature", action_label: "feature" },
    ];

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: team_members, color: mention_color }, // Custom color
      { char: "/", commands: slash_commands }, // Uses variant styling
      { char: "#", commands: tags }, // Uses variant styling
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <h3 className="cls_section_title text-base font-semibold mb-2">Mixed Colors and Variants</h3>
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            @mentions use custom red color while /commands and #tags use the default variant styling.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Mix @colored mentions with /default /styled commands..."
          prefixes={prefixes}
          pill_variant="default"
          min_height="120px"
          on_change={set_output}
        />

        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Commands ({output?.commands.length || 0}):</p>
          {output?.commands.map((cmd, i) => (
            <p key={i} className="text-xs ml-2">{cmd.prefix}{cmd.action} → {cmd.action_label}</p>
          ))}
          {(!output || output.commands.length === 0) && (
            <p className="text-xs text-muted-foreground ml-2">No commands yet</p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Pre-populated with colored commands
 */
export const PrefilledWithColors: Story = {
  render: () => {
    const mention_color: PrefixColor = {
      bg: "#E0E7FF",     // light indigo
      fg: "#4338CA",     // indigo
      border: "#A5B4FC", // indigo border
    };

    const tag_color: PrefixColor = {
      bg: "#FCE7F3",     // light pink
      fg: "#DB2777",     // pink
      border: "#F9A8D4", // pink border
    };

    const team_members: CommandItem[] = [
      { action: "alice", action_label: "Alice Chen" },
      { action: "bob", action_label: "Bob Wilson" },
    ];

    const tags: CommandItem[] = [
      { action: "urgent", action_label: "urgent" },
      { action: "review", action_label: "review" },
    ];

    const prefixes: PrefixConfig[] = [
      { char: "@", commands: team_members, color: mention_color },
      { char: "#", commands: tags, color: tag_color },
    ];

    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-lg">
        <div className="cls_description mb-2">
          <h3 className="cls_section_title text-base font-semibold mb-2">Pre-filled with Colored Commands</h3>
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Demonstrates that colored pills render correctly when loaded from a value.
          </p>
        </div>

        <HazoUiTextarea
          placeholder="Type here..."
          prefixes={prefixes}
          default_value="Please review this @alice and @bob. #urgent #review"
          min_height="100px"
        />
      </div>
    );
  },
};
