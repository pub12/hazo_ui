/**
 * Flex Radio test page
 * Tests radio selection with different layouts
 */
"use client";

import { useState } from "react";
import { HazoUiFlexRadio, type HazoUiFlexRadioItem } from "hazo_ui";

export default function FlexRadioPage() {
  const [value_default, set_value_default] = useState<string>("");
  const [value_vertical, set_value_vertical] = useState<string>("");
  const [value_multi, set_value_multi] = useState<string[]>([]);

  const basic_options: HazoUiFlexRadioItem[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const status_options: HazoUiFlexRadioItem[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Flex Radio</h1>
        <p className="text-muted-foreground">
          Flexible radio selection with horizontal/vertical layouts
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Default horizontal */}
        <section id="test-default" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Default - Horizontal Layout</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Standard horizontal radio buttons
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiFlexRadio
              data={basic_options}
              value={value_default}
              onChange={(val) => set_value_default(val as string)}
              selection="single" layout="horizontal"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Selected Value:</h3>
            <pre className="text-xs">{value_default || "(none)"}</pre>
          </div>
        </section>

        {/* Section 2: Vertical layout */}
        <section id="test-vertical" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Vertical Layout</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Options stacked vertically
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiFlexRadio
              data={status_options}
              value={value_vertical}
              onChange={(val) => set_value_vertical(val as string)}
              selection="single" layout="vertical"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Selected Value:</h3>
            <pre className="text-xs">{value_vertical || "(none)"}</pre>
          </div>
        </section>

        {/* Section 3: Multi selection */}
        <section id="test-multi" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Multi Selection</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Multiple selections allowed
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiFlexRadio
              data={status_options}
              value={value_multi}
              onChange={(val) => set_value_multi(val as string[])}
              selection="multi"
              layout="horizontal"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Selected Values:</h3>
            <pre className="text-xs">{JSON.stringify(value_multi, null, 2)}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
