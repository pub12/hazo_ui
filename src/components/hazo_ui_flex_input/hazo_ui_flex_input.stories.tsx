// Storybook stories for HazoUiFlexInput component
// Used for testing and development of the component
import type { Meta, StoryObj } from "@storybook/react";
import { HazoUiFlexInput } from "./index";
import { useState } from "react";

const meta: Meta<typeof HazoUiFlexInput> = {
  title: "Components/HazoUiFlexInput",
  component: HazoUiFlexInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    input_type: {
      control: "select",
      options: ["mixed", "numeric", "email", "alpha"],
    },
    format_guide_info: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HazoUiFlexInput>;

/**
 * Default story - Mixed input with basic validation
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <HazoUiFlexInput
          input_type="mixed"
          placeholder="Enter any text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Numeric input with min/max and decimals
 */
export const NumericWithConstraints: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Numeric input: min 0, max 100, 2 decimal places. Try typing letters or numbers outside range.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="numeric"
          placeholder="Enter a number (0-100)..."
          num_min={0}
          num_max={100}
          num_decimals={2}
          format_guide="Enter a number between 0 and 100 with up to 2 decimal places"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Numeric input with no decimals
 */
export const NumericInteger: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Integer input: only whole numbers allowed, min 1, max 1000.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="numeric"
          placeholder="Enter a whole number (1-1000)..."
          num_min={1}
          num_max={1000}
          num_decimals={0}
          format_guide="Enter a whole number between 1 and 1000"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Alpha input (letters only)
 */
export const AlphaOnly: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Alpha input: only letters and spaces allowed. Numbers and special characters are prevented.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="alpha"
          placeholder="Enter letters only..."
          format_guide="Only letters and spaces are allowed"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Email input with validation
 */
export const EmailValidation: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Email input: validates email format on blur. Try entering invalid email and blur the field.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="email"
          placeholder="Enter email address..."
          format_guide="Enter a valid email address (e.g., user@example.com)"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Mixed input with length constraints
 */
export const MixedWithLengthConstraints: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Mixed input: min 5 characters, max 20 characters. Try entering text outside this range and blur.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="mixed"
          placeholder="Enter 5-20 characters..."
          text_len_min={5}
          text_len_max={20}
          format_guide="Must be between 5 and 20 characters"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
          <p className="cls_output_length text-xs text-muted-foreground mt-1">
            Length: {value.length} / 20
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Input with regex validation
 */
export const RegexValidation: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Regex validation: Must match pattern for phone number (XXX-XXX-XXXX). Try entering invalid format and blur.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="mixed"
          placeholder="Enter phone number (XXX-XXX-XXXX)..."
          regex={/^\d{3}-\d{3}-\d{4}$/}
          format_guide="Format: XXX-XXX-XXXX (e.g., 123-456-7890)"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Input with format guide info displayed
 */
export const WithFormatGuideInfo: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="cls_storybook_container p-4 space-y-4 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Format guide info is displayed below the input as helpful text.
          </p>
        </div>
        <HazoUiFlexInput
          input_type="mixed"
          placeholder="Enter username..."
          text_len_min={3}
          text_len_max={15}
          format_guide="Username must be 3-15 characters, alphanumeric only"
          format_guide_info={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="cls_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="cls_output_label text-sm font-semibold mb-2">Current Value:</p>
          <p className="cls_output_value text-sm">{value || "(empty)"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Error state examples - showing validation errors
 */
export const ErrorStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("abc");
    const [value2, setValue2] = useState<string>("5");
    const [value3, setValue3] = useState<string>("invalid-email");
    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-md">
        <div className="cls_description mb-2">
          <p className="cls_description_text text-sm text-muted-foreground mb-4">
            Examples showing error states. Click in each field and then click outside to trigger validation.
          </p>
        </div>

        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Too Short (min 5 characters):
          </h3>
          <HazoUiFlexInput
            input_type="mixed"
            placeholder="Enter at least 5 characters..."
            text_len_min={5}
            format_guide="Must be at least 5 characters"
            format_guide_info={true}
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </div>

        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Number Too Small (min 10):
          </h3>
          <HazoUiFlexInput
            input_type="numeric"
            placeholder="Enter number >= 10..."
            num_min={10}
            num_max={100}
            format_guide="Must be between 10 and 100"
            format_guide_info={true}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>

        <div className="cls_example_section">
          <h3 className="cls_section_title text-sm font-semibold mb-2">
            Invalid Email Format:
          </h3>
          <HazoUiFlexInput
            input_type="email"
            placeholder="Enter valid email..."
            format_guide="Enter a valid email address"
            format_guide_info={true}
            value={value3}
            onChange={(e) => setValue3(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

/**
 * All validation scenarios combined
 */
export const AllValidationScenarios: Story = {
  render: () => {
    const [numericValue, setNumericValue] = useState<string>("");
    const [alphaValue, setAlphaValue] = useState<string>("");
    const [emailValue, setEmailValue] = useState<string>("");
    const [mixedValue, setMixedValue] = useState<string>("");
    const [regexValue, setRegexValue] = useState<string>("");

    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-md">
        <div className="cls_description mb-4">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Comprehensive examples showing all validation types. Try different inputs and blur to see validation.
          </p>
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Numeric (0-100, 2 decimals):</h3>
          <HazoUiFlexInput
            input_type="numeric"
            placeholder="0.00 - 100.00"
            num_min={0}
            num_max={100}
            num_decimals={2}
            format_guide="Enter a number between 0 and 100 with up to 2 decimal places"
            format_guide_info={true}
            value={numericValue}
            onChange={(e) => setNumericValue(e.target.value)}
          />
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Alpha (letters only):</h3>
          <HazoUiFlexInput
            input_type="alpha"
            placeholder="Letters only..."
            format_guide="Only letters and spaces allowed"
            format_guide_info={true}
            value={alphaValue}
            onChange={(e) => setAlphaValue(e.target.value)}
          />
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Email:</h3>
          <HazoUiFlexInput
            input_type="email"
            placeholder="user@example.com"
            format_guide="Enter a valid email address"
            format_guide_info={true}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Mixed (5-20 chars):</h3>
          <HazoUiFlexInput
            input_type="mixed"
            placeholder="5-20 characters..."
            text_len_min={5}
            text_len_max={20}
            format_guide="Must be between 5 and 20 characters"
            format_guide_info={true}
            value={mixedValue}
            onChange={(e) => setMixedValue(e.target.value)}
          />
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Regex (Phone: XXX-XXX-XXXX):</h3>
          <HazoUiFlexInput
            input_type="mixed"
            placeholder="123-456-7890"
            regex={/^\d{3}-\d{3}-\d{4}$/}
            format_guide="Format: XXX-XXX-XXXX"
            format_guide_info={true}
            value={regexValue}
            onChange={(e) => setRegexValue(e.target.value)}
          />
        </div>

        <div className="cls_output mt-6 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <h3 className="cls_output_title text-sm font-semibold mb-2">All Values:</h3>
          <div className="cls_output_values space-y-1 text-xs">
            <p>Numeric: {numericValue || "(empty)"}</p>
            <p>Alpha: {alphaValue || "(empty)"}</p>
            <p>Email: {emailValue || "(empty)"}</p>
            <p>Mixed: {mixedValue || "(empty)"}</p>
            <p>Regex: {regexValue || "(empty)"}</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Controlled vs Uncontrolled
 */
export const ControlledExample: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = useState<string>("");
    const [uncontrolledValue, setUncontrolledValue] = useState<string>("");

    return (
      <div className="cls_storybook_container p-4 space-y-6 w-full max-w-md">
        <div className="cls_description mb-4">
          <p className="cls_description_text text-sm text-muted-foreground mb-2">
            Demonstrating controlled and uncontrolled usage patterns.
          </p>
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Controlled (with value prop):</h3>
          <HazoUiFlexInput
            input_type="mixed"
            placeholder="Controlled input..."
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Value: {controlledValue || "(empty)"}</p>
          </div>
        </div>

        <div className="cls_example_section space-y-2">
          <h3 className="cls_section_title text-sm font-semibold">Uncontrolled (no value prop):</h3>
          <HazoUiFlexInput
            input_type="mixed"
            placeholder="Uncontrolled input..."
            defaultValue="Initial value"
            onChange={(e) => setUncontrolledValue(e.target.value)}
          />
          <div className="cls_output mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_output_value text-xs">Value: {uncontrolledValue || "(empty)"}</p>
          </div>
        </div>
      </div>
    );
  },
};

