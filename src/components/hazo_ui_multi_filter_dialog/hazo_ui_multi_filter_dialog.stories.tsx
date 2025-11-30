// Storybook stories for HazoUiMultiFilterDialog component
// Used for testing and development of the component
import type { Meta, StoryObj } from "@storybook/react";
import { HazoUiMultiFilterDialog, type FilterField, type FilterConfig } from "./index";
import { useState } from "react";

const meta: Meta<typeof HazoUiMultiFilterDialog> = {
  title: "Components/HazoUiMultiFilterDialog",
  component: HazoUiMultiFilterDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HazoUiMultiFilterDialog>;

// Sample filter fields for stories
const sampleFields: FilterField[] = [
  {
    value: "name",
    label: "Name",
    type: "text",
    textConfig: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    value: "age",
    label: "Age",
    type: "number",
    numberConfig: {
      min: 0,
      max: 120,
      allowDecimal: false,
    },
  },
  {
    value: "price",
    label: "Price",
    type: "number",
    numberConfig: {
      min: 0,
      max: 10000,
      allowDecimal: true,
      decimalLength: 2,
    },
  },
  {
    value: "status",
    label: "Status",
    type: "combobox",
    comboboxOptions: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
    ],
  },
  {
    value: "is_verified",
    label: "Verified",
    type: "boolean",
    booleanLabels: {
      trueLabel: "Yes",
      falseLabel: "No",
    },
  },
  {
    value: "created_date",
    label: "Created Date",
    type: "date",
  },
];

/**
 * Default story with all field types available
 */
export const Default: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([]);
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiMultiFilterDialog
          availableFields={sampleFields}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            console.log("Filters changed:", newFilters);
          }}
          initialFilters={filters}
        />
        
        {/* Display return values */}
        {filters.length > 0 && (
          <div className="cls_filter_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Filter Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        )}
        {filters.length === 0 && (
          <div className="cls_filter_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No filters applied. Apply filters using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Story with pre-existing filters
 */
export const WithInitialFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState([
      {
        field: "name",
        value: "John",
      },
      {
        field: "status",
        value: "active",
      },
      {
        field: "is_verified",
        value: true,
      },
    ]);
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiMultiFilterDialog
          availableFields={sampleFields}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            console.log("Filters changed:", newFilters);
          }}
          initialFilters={filters}
        />
        
        {/* Display return values */}
        {filters.length > 0 && (
          <div className="cls_filter_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Filter Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        )}
        {filters.length === 0 && (
          <div className="cls_filter_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No filters applied. Apply filters using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Story with only text fields
 */
export const TextFieldsOnly: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([]);
    const textFields: FilterField[] = [
      {
        value: "name",
        label: "Name",
        type: "text",
      },
      {
        value: "email",
        label: "Email",
        type: "text",
      },
      {
        value: "description",
        label: "Description",
        type: "text",
        textConfig: {
          maxLength: 200,
        },
      },
    ];
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiMultiFilterDialog
          availableFields={textFields}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            console.log("Filters changed:", newFilters);
          }}
          initialFilters={filters}
        />
        
        {/* Display return values */}
        {filters.length > 0 && (
          <div className="cls_filter_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Filter Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        )}
        {filters.length === 0 && (
          <div className="cls_filter_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No filters applied. Apply filters using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Story with number fields and operators
 */
export const NumberFields: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([]);
    const numberFields: FilterField[] = [
      {
        value: "age",
        label: "Age",
        type: "number",
        numberConfig: {
          min: 0,
          max: 120,
        },
      },
      {
        value: "price",
        label: "Price",
        type: "number",
        numberConfig: {
          min: 0,
          allowDecimal: true,
          decimalLength: 2,
        },
      },
    ];
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <HazoUiMultiFilterDialog
          availableFields={numberFields}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            console.log("Filters changed:", newFilters);
          }}
          initialFilters={filters}
        />
        
        {/* Display return values */}
        {filters.length > 0 && (
          <div className="cls_filter_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Filter Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        )}
        {filters.length === 0 && (
          <div className="cls_filter_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No filters applied. Apply filters using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

