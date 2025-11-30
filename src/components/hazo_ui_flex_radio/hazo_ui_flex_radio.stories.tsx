// Storybook stories for HazoUiFlexRadio component
// Used for testing and development of the component
import type { Meta, StoryObj } from "@storybook/react";
import { HazoUiFlexRadio, type HazoUiFlexRadioItem } from "./index";
import { useState } from "react";

const meta: Meta<typeof HazoUiFlexRadio> = {
  title: "Components/HazoUiFlexRadio",
  component: HazoUiFlexRadio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    style: {
      control: "select",
      options: ["radio", "icons"],
    },
    display_label: {
      control: "boolean",
    },
    selection: {
      control: "select",
      options: ["single", "multi"],
    },
    compressed: {
      control: "boolean",
      description: "When true, removes padding and spacing between elements",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HazoUiFlexRadio>;

// Sample data for basic stories
const basicData: HazoUiFlexRadioItem[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

// Sample data with icons (FontAwesome)
const iconData: HazoUiFlexRadioItem[] = [
  {
    label: "Home",
    value: "home",
    icon_selected: "FaHome",
    icon_unselected: "FaRegHome",
  },
  {
    label: "User",
    value: "user",
    icon_selected: "FaUser",
    icon_unselected: "FaRegUser",
  },
  {
    label: "Settings",
    value: "settings",
    icon_selected: "FaCog",
    icon_unselected: "FaRegCog",
  },
  {
    label: "Search",
    value: "search",
    icon_selected: "FaSearch",
    icon_unselected: "FaRegSearch",
  },
];

// Sample data with Material Design icons
const mdIconData: HazoUiFlexRadioItem[] = [
  {
    label: "Favorite",
    value: "favorite",
    icon_selected: "MdFavorite",
    icon_unselected: "MdFavoriteBorder",
  },
  {
    label: "Star",
    value: "star",
    icon_selected: "MdStar",
    icon_unselected: "MdStarBorder",
  },
  {
    label: "Thumb Up",
    value: "thumb_up",
    icon_selected: "MdThumbUp",
    icon_unselected: "MdThumbUpOffAlt",
  },
  {
    label: "Bookmark",
    value: "bookmark",
    icon_selected: "MdBookmark",
    icon_unselected: "MdBookmarkBorder",
  },
];

/**
 * Default story - Basic horizontal radio buttons with labels
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("option1");
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiFlexRadio
          data={basicData}
          value={value}
          onChange={(val) => setValue(val as string)}
          selection="single"
          layout="horizontal"
          style="radio"
          display_label={true}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Value:</p>
          <p className="cls_output_value text-sm">{value}</p>
        </div>
      </div>
    );
  },
};

/**
 * Vertical layout - Radio buttons arranged vertically
 */
export const VerticalLayout: Story = {
  render: () => {
    const [value, setValue] = useState<string>("option2");
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiFlexRadio
          data={basicData}
          value={value}
          onChange={(val) => setValue(val as string)}
          selection="single"
          layout="vertical"
          style="radio"
          display_label={true}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Value:</p>
          <p className="cls_output_value text-sm">{value}</p>
        </div>
      </div>
    );
  },
};

/**
 * Icon style - Icon-only buttons (no radio indicators)
 */
export const IconStyle: Story = {
  render: () => {
    const [value, setValue] = useState<string>("home");
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiFlexRadio
          data={iconData}
          value={value}
          onChange={(val) => setValue(val as string)}
          selection="single"
          layout="horizontal"
          style="icons"
          display_label={true}
          icon_set="fa"
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Value:</p>
          <p className="cls_output_value text-sm">{value}</p>
        </div>
      </div>
    );
  },
};

/**
 * No labels - Hide labels, show only icons/radios
 */
export const NoLabels: Story = {
  render: () => {
    const [value, setValue] = useState<string>("home");
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <div className="cls_example_section mb-4">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Icon Style (No Labels):</h3>
          <HazoUiFlexRadio
            data={iconData}
            value={value}
            onChange={(val) => setValue(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={false}
            icon_set="fa"
          />
        </div>
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Radio Style (No Labels):</h3>
          <HazoUiFlexRadio
            data={basicData}
            value={value}
            onChange={(val) => setValue(val as string)}
            selection="single"
            layout="horizontal"
            style="radio"
            display_label={false}
          />
        </div>
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Value:</p>
          <p className="cls_output_value text-sm">{value}</p>
        </div>
      </div>
    );
  },
};

/**
 * Multi selection - Multiple selection mode
 */
export const MultiSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["option1", "option3"]);
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <div className="cls_example_section mb-4">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Radio Style (Multi):</h3>
          <HazoUiFlexRadio
            data={basicData}
            value={value}
            onChange={(val) => setValue(val as string[])}
            selection="multi"
            layout="horizontal"
            style="radio"
            display_label={true}
          />
        </div>
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Icon Style (Multi):</h3>
          <HazoUiFlexRadio
            data={iconData}
            value={value}
            onChange={(val) => setValue(val as string[])}
            selection="multi"
            layout="horizontal"
            style="icons"
            display_label={true}
            icon_set="fa"
          />
        </div>
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Values:</p>
          <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

/**
 * Different icon sets - Examples with different react-icons packages
 */
export const DifferentIconSets: Story = {
  render: () => {
    const [faValue, setFaValue] = useState<string>("home");
    const [mdValue, setMdValue] = useState<string>("favorite");
    
    return (
      <div className="cls_storybook_container p-4 space-y-6">
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">FontAwesome Icons (fa):</h3>
          <HazoUiFlexRadio
            data={iconData}
            value={faValue}
            onChange={(val) => setFaValue(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={true}
            icon_set="fa"
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {faValue}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Material Design Icons (md):</h3>
          <HazoUiFlexRadio
            data={mdIconData}
            value={mdValue}
            onChange={(val) => setMdValue(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={true}
            icon_set="md"
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {mdValue}</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Combined variations - Complex examples combining multiple props
 */
export const CombinedVariations: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("home");
    const [value2, setValue2] = useState<string[]>([]);
    const [value3, setValue3] = useState<string>("option1");
    
    return (
      <div className="cls_storybook_container p-4 space-y-6">
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Vertical Icons with Labels (Single):
          </h3>
          <HazoUiFlexRadio
            data={iconData}
            value={value1}
            onChange={(val) => setValue1(val as string)}
            selection="single"
            layout="vertical"
            style="icons"
            display_label={true}
            icon_set="fa"
          />
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Horizontal Radio Multi-Selection:
          </h3>
          <HazoUiFlexRadio
            data={basicData}
            value={value2}
            onChange={(val) => setValue2(val as string[])}
            selection="multi"
            layout="horizontal"
            style="radio"
            display_label={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">
              Selected: {value2.length > 0 ? value2.join(", ") : "None"}
            </p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Vertical Radio Single (No Labels):
          </h3>
          <HazoUiFlexRadio
            data={basicData}
            value={value3}
            onChange={(val) => setValue3(val as string)}
            selection="single"
            layout="vertical"
            style="radio"
            display_label={false}
          />
        </div>
      </div>
    );
  },
};

/**
 * Responsive demo - Show responsive behavior
 */
export const ResponsiveDemo: Story = {
  render: () => {
    const [value, setValue] = useState<string>("home");
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <p className="cls_description text-sm text-muted-foreground mb-4">
          Resize the viewport to see responsive spacing adjustments. The layout remains horizontal
          but spacing adapts to screen size.
        </p>
        <HazoUiFlexRadio
          data={iconData}
          value={value}
          onChange={(val) => setValue(val as string)}
          selection="single"
          layout="horizontal"
          style="icons"
          display_label={true}
          icon_set="fa"
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Value:</p>
          <p className="cls_output_value text-sm">{value}</p>
        </div>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

/**
 * Controlled examples - Demonstrate controlled component usage
 */
export const ControlledExample: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>("option2");
    const [multiValue, setMultiValue] = useState<string[]>(["option1"]);
    
    return (
      <div className="cls_storybook_container p-4 space-y-6">
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Single Selection (Controlled):</h3>
          <HazoUiFlexRadio
            data={basicData}
            value={singleValue}
            onChange={(val) => setSingleValue(val as string)}
            selection="single"
            layout="horizontal"
            style="radio"
            display_label={true}
          />
          <div className="cls_controls mt-2 flex gap-2">
            <button
              onClick={() => setSingleValue("option1")}
              className="cls_control_btn px-2 py-1 text-xs border rounded hover:bg-accent"
            >
              Set to Option 1
            </button>
            <button
              onClick={() => setSingleValue("option3")}
              className="cls_control_btn px-2 py-1 text-xs border rounded hover:bg-accent"
            >
              Set to Option 3
            </button>
            <button
              onClick={() => setSingleValue("")}
              className="cls_control_btn px-2 py-1 text-xs border rounded hover:bg-accent"
            >
              Clear
            </button>
          </div>
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Current: {singleValue || "None"}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">Multi Selection (Controlled):</h3>
          <HazoUiFlexRadio
            data={basicData}
            value={multiValue}
            onChange={(val) => setMultiValue(val as string[])}
            selection="multi"
            layout="horizontal"
            style="radio"
            display_label={true}
          />
          <div className="cls_controls mt-2 flex gap-2">
            <button
              onClick={() => setMultiValue(["option1", "option2"])}
              className="cls_control_btn px-2 py-1 text-xs border rounded hover:bg-accent"
            >
              Set to [1, 2]
            </button>
            <button
              onClick={() => setMultiValue(["option3", "option4"])}
              className="cls_control_btn px-2 py-1 text-xs border rounded hover:bg-accent"
            >
              Set to [3, 4]
            </button>
            <button
              onClick={() => setMultiValue([])}
              className="cls_control_btn px-2 py-1 text-xs border rounded hover:bg-accent"
            >
              Clear All
            </button>
          </div>
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">
              Current: {multiValue.length > 0 ? JSON.stringify(multiValue) : "[]"}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Compressed mode - Elements next to each other with no padding and spacing
 */
export const CompressedMode: Story = {
  args: {
    layout: "horizontal",
    style: "icons",
    display_label: false,
    selection: "multi"
  },

  render: () => {
    const [value1, setValue1] = useState<string>("option1");
    const [value2, setValue2] = useState<string>("home");
    const [value3, setValue3] = useState<string[]>([]);
    const [value4, setValue4] = useState<string[]>([]);
    
    return (
      <div className="cls_storybook_container p-4 space-y-6">
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Radio Style (Single Selection):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Elements are placed next to each other with no padding or spacing between them.
          </p>
          <HazoUiFlexRadio
            data={basicData}
            value={value1}
            onChange={(val) => setValue1(val as string)}
            selection="single"
            layout="horizontal"
            style="radio"
            display_label={true}
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value1}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Icon Style (Single Selection):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Icons are placed directly next to each other with no gaps.
          </p>
          <HazoUiFlexRadio
            data={iconData}
            value={value2}
            onChange={(val) => setValue2(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={true}
            icon_set="fa"
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value2}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Multi-Selection:
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Multiple selection with compressed spacing.
          </p>
          <HazoUiFlexRadio
            data={basicData}
            value={value3}
            onChange={(val) => setValue3(val as string[])}
            selection="multi"
            layout="horizontal"
            style="radio"
            display_label={true}
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">
              Selected: {value3.length > 0 ? JSON.stringify(value3) : "[]"}
            </p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Radio Style (No Labels):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Radio buttons only, no labels, compressed spacing.
          </p>
          <HazoUiFlexRadio
            data={basicData}
            value={value1}
            onChange={(val) => setValue1(val as string)}
            selection="single"
            layout="horizontal"
            style="radio"
            display_label={false}
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value1}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Icon Style (No Labels):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Icons only, no labels, placed directly next to each other.
          </p>
          <HazoUiFlexRadio
            data={iconData}
            value={value2}
            onChange={(val) => setValue2(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={false}
            icon_set="fa"
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value2}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Multi-Selection (No Labels):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Multi-selection with checkboxes only, no labels, compressed spacing.
          </p>
          <HazoUiFlexRadio
            data={basicData}
            value={value3}
            onChange={(val) => setValue3(val as string[])}
            selection="multi"
            layout="horizontal"
            style="radio"
            display_label={false}
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">
              Selected: {value3.length > 0 ? JSON.stringify(value3) : "[]"}
            </p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Compressed Icon Multi-Selection (No Labels):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Multi-selection with icons only, no labels, compressed spacing.
          </p>
          <HazoUiFlexRadio
            data={iconData}
            value={value4}
            onChange={(val) => setValue4(val as string[])}
            selection="multi"
            layout="horizontal"
            style="icons"
            display_label={false}
            icon_set="fa"
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">
              Selected: {value4.length > 0 ? JSON.stringify(value4) : "[]"}
            </p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Comparison: Normal vs Compressed:
          </h3>
          <div className="cls_comparison space-y-4">
            <div>
              <p className="cls_comparison_label text-xs font-medium mb-2">Normal (default):</p>
              <HazoUiFlexRadio
                data={basicData.slice(0, 3)}
                value={value1}
                onChange={(val) => setValue1(val as string)}
                selection="single"
                layout="horizontal"
                style="radio"
                display_label={true}
                compressed={false}
              />
            </div>
            <div>
              <p className="cls_comparison_label text-xs font-medium mb-2">Compressed:</p>
              <HazoUiFlexRadio
                data={basicData.slice(0, 3)}
                value={value1}
                onChange={(val) => setValue1(val as string)}
                selection="single"
                layout="horizontal"
                style="radio"
                display_label={true}
                compressed={true}
              />
            </div>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Comparison: With Labels vs No Labels (Compressed):
          </h3>
          <div className="cls_comparison space-y-4">
            <div>
              <p className="cls_comparison_label text-xs font-medium mb-2">Compressed with Labels:</p>
              <HazoUiFlexRadio
                data={iconData.slice(0, 3)}
                value={value2}
                onChange={(val) => setValue2(val as string)}
                selection="single"
                layout="horizontal"
                style="icons"
                display_label={true}
                icon_set="fa"
                compressed={true}
              />
            </div>
            <div>
              <p className="cls_comparison_label text-xs font-medium mb-2">Compressed without Labels:</p>
              <HazoUiFlexRadio
                data={iconData.slice(0, 3)}
                value={value2}
                onChange={(val) => setValue2(val as string)}
                selection="single"
                layout="horizontal"
                style="icons"
                display_label={false}
                icon_set="fa"
                compressed={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Sample data with Circum Icons (ci)
const ciIconData: HazoUiFlexRadioItem[] = [
  {
    label: "Home",
    value: "home",
    icon_selected: "CiHome",
    icon_unselected: "CiHome1",
  },
  {
    label: "User",
    value: "user",
    icon_selected: "CiUser",
    icon_unselected: "CiUser1",
  },
  {
    label: "Settings",
    value: "settings",
    icon_selected: "CiSettings",
    icon_unselected: "CiSettings1",
  },
  {
    label: "Search",
    value: "search",
    icon_selected: "CiSearch",
    icon_unselected: "CiSearch1",
  },
];

// Sample data with custom colors
const coloredIconData: HazoUiFlexRadioItem[] = [
  {
    label: "Red",
    value: "red",
    icon_selected: "FaCircle",
    icon_unselected: "FaRegCircle",
    fgcolor: "#ffffff",
    bgcolor: "#ef4444",
  },
  {
    label: "Blue",
    value: "blue",
    icon_selected: "FaCircle",
    icon_unselected: "FaRegCircle",
    fgcolor: "#ffffff",
    bgcolor: "#3b82f6",
  },
  {
    label: "Green",
    value: "green",
    icon_selected: "FaCircle",
    icon_unselected: "FaRegCircle",
    fgcolor: "#ffffff",
    bgcolor: "#22c55e",
  },
  {
    label: "Yellow",
    value: "yellow",
    icon_selected: "FaCircle",
    icon_unselected: "FaRegCircle",
    fgcolor: "#000000",
    bgcolor: "#eab308",
  },
];

/**
 * Circum Icons (ci) - Example with CI icon set
 */
export const CircumIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>("home");
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiFlexRadio
          data={ciIconData}
          value={value}
          onChange={(val) => setValue(val as string)}
          selection="single"
          layout="horizontal"
          style="icons"
          display_label={true}
          icon_set="ci"
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Selected Value:</p>
          <p className="cls_output_value text-sm">{value}</p>
        </div>
      </div>
    );
  },
};

/**
 * Custom Colors - Example with fgcolor and bgcolor
 */
export const CustomColors: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("red");
    const [value2, setValue2] = useState<string>("blue");
    const [value3, setValue3] = useState<string[]>([]);
    
    return (
      <div className="cls_storybook_container p-4 space-y-6">
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Custom Colors (Single Selection):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Each option has custom foreground and background colors defined.
          </p>
          <HazoUiFlexRadio
            data={coloredIconData}
            value={value1}
            onChange={(val) => setValue1(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={true}
            icon_set="fa"
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value1}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Custom Colors (No Labels):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Custom colors with labels hidden.
          </p>
          <HazoUiFlexRadio
            data={coloredIconData}
            value={value2}
            onChange={(val) => setValue2(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={false}
            icon_set="fa"
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value2}</p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Custom Colors (Multi-Selection):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Multi-selection with custom colors.
          </p>
          <HazoUiFlexRadio
            data={coloredIconData}
            value={value3}
            onChange={(val) => setValue3(val as string[])}
            selection="multi"
            layout="horizontal"
            style="icons"
            display_label={true}
            icon_set="fa"
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">
              Selected: {value3.length > 0 ? JSON.stringify(value3) : "[]"}
            </p>
          </div>
        </div>
        
        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Custom Colors (Compressed):
          </h3>
          <p className="cls_description text-xs text-muted-foreground mb-2">
            Compressed layout with custom colors.
          </p>
          <HazoUiFlexRadio
            data={coloredIconData}
            value={value1}
            onChange={(val) => setValue1(val as string)}
            selection="single"
            layout="horizontal"
            style="icons"
            display_label={false}
            icon_set="fa"
            compressed={true}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Selected: {value1}</p>
          </div>
        </div>
      </div>
    );
  },
};

