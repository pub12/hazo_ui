// Storybook stories for MultiSortDialog component
// Used for testing and development of the component
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSortDialog, type SortField, type SortConfig } from "./index";
import { useState } from "react";

const meta: Meta<typeof MultiSortDialog> = {
  title: "Components/MultiSortDialog",
  component: MultiSortDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSortDialog>;

// Sample sort fields for stories
const sampleFields: SortField[] = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "age",
    label: "Age",
  },
  {
    value: "price",
    label: "Price",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "created_date",
    label: "Created Date",
  },
  {
    value: "updated_date",
    label: "Updated Date",
  },
];

/**
 * Default story with all field types available
 */
export const Default: Story = {
  render: () => {
    const [sorts, setSorts] = useState<SortConfig[]>([]);
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <MultiSortDialog
          availableFields={sampleFields}
          onSortChange={(newSorts) => {
            setSorts(newSorts);
            console.log("Sorts changed:", newSorts);
          }}
          initialSortFields={sorts}
        />
        
        {/* Display return values */}
        {sorts.length > 0 && (
          <div className="cls_sort_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Sort Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(sorts, null, 2)}
            </pre>
          </div>
        )}
        {sorts.length === 0 && (
          <div className="cls_sort_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No sorts applied. Apply sorts using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Story with pre-existing sort fields
 */
export const WithInitialSorts: Story = {
  render: () => {
    const [sorts, setSorts] = useState<SortConfig[]>([
      {
        field: "name",
        direction: "asc",
      },
      {
        field: "price",
        direction: "desc",
      },
      {
        field: "created_date",
        direction: "desc",
      },
    ]);
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <MultiSortDialog
          availableFields={sampleFields}
          onSortChange={(newSorts) => {
            setSorts(newSorts);
            console.log("Sorts changed:", newSorts);
          }}
          initialSortFields={sorts}
        />
        
        {/* Display return values */}
        {sorts.length > 0 && (
          <div className="cls_sort_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Sort Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(sorts, null, 2)}
            </pre>
          </div>
        )}
        {sorts.length === 0 && (
          <div className="cls_sort_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No sorts applied. Apply sorts using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Story with limited fields
 */
export const LimitedFields: Story = {
  render: () => {
    const [sorts, setSorts] = useState<SortConfig[]>([]);
    const limitedFields: SortField[] = [
      {
        value: "name",
        label: "Name",
      },
      {
        value: "date",
        label: "Date",
      },
    ];
    return (
      <div className="cls_storybook_container p-4 space-y-4">
        <MultiSortDialog
          availableFields={limitedFields}
          onSortChange={(newSorts) => {
            setSorts(newSorts);
            console.log("Sorts changed:", newSorts);
          }}
          initialSortFields={sorts}
        />
        
        {/* Display return values */}
        {sorts.length > 0 && (
          <div className="cls_sort_output mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <h3 className="cls_output_title font-semibold mb-2 text-sm">Current Sort Values:</h3>
            <pre className="cls_output_json text-xs overflow-auto bg-white dark:bg-gray-800 p-3 rounded border">
              {JSON.stringify(sorts, null, 2)}
            </pre>
          </div>
        )}
        {sorts.length === 0 && (
          <div className="cls_sort_output_empty mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <p className="cls_empty_message text-sm text-muted-foreground">
              No sorts applied. Apply sorts using the dialog above to see return values here.
            </p>
          </div>
        )}
      </div>
    );
  },
};

