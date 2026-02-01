/**
 * Multi Sort Dialog test page
 * Tests drag-drop sorting with multiple fields
 */
"use client";

import { useState } from "react";
import { HazoUiMultiSortDialog, type SortField, type SortConfig } from "hazo_ui";

export default function MultiSortDialogPage() {
  const [sorts_default, set_sorts_default] = useState<SortConfig[]>([]);
  const [sorts_with_initial, set_sorts_with_initial] = useState<SortConfig[]>([
    { field: "created_date", direction: "desc" },
    { field: "name", direction: "asc" },
  ]);
  const [sorts_limited, set_sorts_limited] = useState<SortConfig[]>([]);

  // All available sort fields
  const all_sort_fields: SortField[] = [
    { value: "name", label: "Name" },
    { value: "created_date", label: "Created Date" },
    { value: "updated_date", label: "Updated Date" },
    { value: "price", label: "Price" },
    { value: "quantity", label: "Quantity" },
    { value: "status", label: "Status" },
  ];

  // Limited sort fields
  const limited_sort_fields: SortField[] = [
    { value: "name", label: "Name" },
    { value: "created_date", label: "Created Date" },
    { value: "price", label: "Price" },
  ];

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Multi Sort Dialog</h1>
        <p className="text-muted-foreground">
          Drag-and-drop multi-field sorting with ascending/descending controls
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Default */}
        <section id="test-default" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Default - All Available Fields</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Test with all available sort fields. Drag to reorder, toggle direction.
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiSortDialog
              availableFields={all_sort_fields}
              onSortChange={set_sorts_default}
              initialSortFields={sorts_default}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Sorts:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(sorts_default, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 2: With initial sorts */}
        <section id="test-with-initial" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">With Initial Sorts</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Pre-configured with: Created Date (desc), then Name (asc)
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiSortDialog
              availableFields={all_sort_fields}
              onSortChange={set_sorts_with_initial}
              initialSortFields={sorts_with_initial}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Sorts:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(sorts_with_initial, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 3: Limited fields */}
        <section id="test-limited" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Limited Fields</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Subset of fields: Name, Created Date, and Price only
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiMultiSortDialog
              availableFields={limited_sort_fields}
              onSortChange={set_sorts_limited}
              initialSortFields={sorts_limited}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Active Sorts:</h3>
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(sorts_limited, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
