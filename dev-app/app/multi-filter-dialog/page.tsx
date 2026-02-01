/**
 * Multi Filter Dialog test page
 * Tests all field types and configurations
 */
"use client";

import { useState } from "react";
import { HazoUiMultiFilterDialog, type FilterField, type FilterConfig } from "hazo_ui";

export default function MultiFilterDialogPage() {
  const [filters_default, set_filters_default] = useState<FilterConfig[]>([]);
  const [filters_with_initial, set_filters_with_initial] = useState<FilterConfig[]>([
    { field: "name", operator: "contains", value: "John" },
    { field: "age", operator: "greater_than", value: 25 },
  ]);
  const [filters_text_only, set_filters_text_only] = useState<FilterConfig[]>([]);
  const [filters_number, set_filters_number] = useState<FilterConfig[]>([]);

  // All field types
  const all_fields: FilterField[] = [
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
  ];

  // Text fields only
  const text_fields: FilterField[] = [
    {
      value: "email",
      label: "Email",
      type: "text",
      textConfig: { minLength: 5, maxLength: 100 },
    },
    {
      value: "description",
      label: "Description",
      type: "text",
      textConfig: { minLength: 0, maxLength: 500 },
    },
    {
      value: "username",
      label: "Username",
      type: "text",
      textConfig: { minLength: 3, maxLength: 20 },
    },
  ];

  // Number fields
  const number_fields: FilterField[] = [
    {
      value: "quantity",
      label: "Quantity",
      type: "number",
      numberConfig: { min: 1, max: 1000, allowDecimal: false },
    },
    {
      value: "discount",
      label: "Discount %",
      type: "number",
      numberConfig: { min: 0, max: 100, allowDecimal: true, decimalLength: 2 },
    },
    {
      value: "rating",
      label: "Rating",
      type: "number",
      numberConfig: { min: 0, max: 5, allowDecimal: true, decimalLength: 1 },
    },
  ];

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Multi Filter Dialog</h1>
        <p className="text-muted-foreground">
          Advanced multi-field filtering with text, number, date, boolean, and combobox support
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Default with all field types */}
        <section id="test-default" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Default - All Field Types</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Tests all available field types: text, number, combobox, boolean, and date
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiFilterDialog
              availableFields={all_fields}
              onFilterChange={set_filters_default}
              initialFilters={filters_default}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Filters:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(filters_default, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 2: With initial filters */}
        <section id="test-with-initial" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">With Initial Filters</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Pre-loaded with filters: name contains "John" and age greater than 25
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiFilterDialog
              availableFields={all_fields}
              onFilterChange={set_filters_with_initial}
              initialFilters={filters_with_initial}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Filters:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(filters_with_initial, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 3: Text fields only */}
        <section id="test-text-only" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Text Fields Only</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Testing text validation with different min/max length constraints
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiFilterDialog
              availableFields={text_fields}
              onFilterChange={set_filters_text_only}
              initialFilters={filters_text_only}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Filters:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(filters_text_only, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 4: Number fields */}
        <section id="test-number" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Number Fields</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Testing number constraints with integer and decimal support
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiFilterDialog
              availableFields={number_fields}
              onFilterChange={set_filters_number}
              initialFilters={filters_number}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Filters:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(filters_number, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
