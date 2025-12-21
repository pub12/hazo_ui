// Home page for hazo_ui dev app
// Test components here before publishing
"use client";

import { useState } from "react";
import { HazoUiMultiFilterDialog, type FilterField, type FilterConfig, HazoUiRte, type RteOutput, type RteVariable } from "hazo_ui";

/**
 * Main page for testing hazo_ui components
 * Test HazoUiMultiFilterDialog component with various field types
 */
export default function Home() {
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [rte_output, set_rte_output] = useState<RteOutput>({
    html: "",
    plain_text: "",
    attachments: [],
  });

  // RTE test variables
  const rte_variables: RteVariable[] = [
    { name: "first_name", description: "First name" },
    { name: "last_name", description: "Last name" },
    { name: "company", description: "Company name" },
  ];

  // Define available filter fields for testing
  const availableFields: FilterField[] = [
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
        { label: "Completed", value: "completed" },
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
    {
      value: "description",
      label: "Description",
      type: "text",
      textConfig: {
        minLength: 0,
        maxLength: 500,
      },
    },
  ];

  /**
   * Handle filter changes from HazoUiMultiFilterDialog
   * @param filterConfig - Array of active filter configurations
   */
  const handleFilterChange = (filterConfig: FilterConfig[]) => {
    setFilters(filterConfig);
    console.log("Filters changed:", filterConfig);
  };

  return (
    <div className="cls_dev_app_container min-h-screen p-8 bg-background">
      <div className="cls_dev_app_header mb-8">
        <h1 className="cls_dev_app_title text-3xl font-bold mb-2">
          hazo_ui Component Library - Dev App
        </h1>
        <p className="cls_dev_app_subtitle text-muted-foreground">
          Testing HazoUiMultiFilterDialog component
        </p>
      </div>

      <div className="cls_dev_app_content space-y-6">
        {/* HazoUiMultiFilterDialog Component */}
        <div className="cls_filter_section space-y-4">
          <div className="cls_filter_header">
            <h2 className="cls_filter_title text-xl font-semibold mb-2">
              HazoUiMultiFilterDialog Component
            </h2>
            <p className="cls_filter_description text-sm text-muted-foreground mb-4">
              Click the filter button to add multiple filter criteria. Test different field types:
              text, number, combobox, boolean, and date.
            </p>
          </div>

          <div className="cls_filter_component_container">
            <HazoUiMultiFilterDialog
              availableFields={availableFields}
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </div>
        </div>

        {/* RTE Component Test */}
        <div className="cls_rte_section space-y-4 mt-8">
          <div className="cls_rte_header">
            <h2 className="cls_rte_title text-xl font-semibold mb-2">
              HazoUiRte Component (Rich Text Editor)
            </h2>
            <p className="cls_rte_description text-sm text-muted-foreground mb-4">
              Test the rich text editor with variables support.
            </p>
          </div>

          <HazoUiRte
            variables={rte_variables}
            on_change={set_rte_output}
            placeholder="Start typing..."
            min_height="200px"
          />

          <div className="cls_rte_output p-3 border rounded-md bg-card">
            <h3 className="font-medium mb-2">Output:</h3>
            <pre className="text-xs overflow-auto max-h-32">
              {JSON.stringify(rte_output, null, 2)}
            </pre>
          </div>
        </div>

        {/* Display Active Filters */}
        <div className="cls_active_filters_section space-y-4">
          <h2 className="cls_active_filters_title text-xl font-semibold">
            Active Filters
          </h2>
          {filters.length > 0 ? (
            <div className="cls_active_filters_list space-y-2">
              {filters.map((filter, index) => {
                const field = availableFields.find((f) => f.value === filter.field);
                let displayValue = String(filter.value);

                if (field?.type === "boolean") {
                  displayValue = filter.value
                    ? field.booleanLabels?.trueLabel || "Yes"
                    : field.booleanLabels?.falseLabel || "No";
                } else if (field?.type === "combobox") {
                  const option = field.comboboxOptions?.find(
                    (opt) => opt.value === filter.value
                  );
                  displayValue = option?.label || displayValue;
                } else if (field?.type === "date") {
                  const dateValue =
                    filter.value instanceof Date
                      ? filter.value
                      : new Date(filter.value);
                  if (!isNaN(dateValue.getTime())) {
                    displayValue = dateValue.toLocaleDateString();
                  }
                }

                const operatorLabel = filter.operator
                  ? ` ${filter.operator.replace("_", " ")}`
                  : "";

                return (
                  <div
                    key={index}
                    className="cls_filter_item p-3 border rounded-md bg-card"
                  >
                    <span className="cls_filter_field_name font-medium">
                      {field?.label || filter.field}:
                    </span>{" "}
                    <span className="cls_filter_operator">{operatorLabel}</span>{" "}
                    <span className="cls_filter_value">{displayValue}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="cls_no_filters text-sm text-muted-foreground">
              No active filters. Add filters using the button above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

