/**
 * Flex Input test page
 * Tests input validation and constraints
 */
"use client";

import { useState } from "react";
import { HazoUiFlexInput } from "hazo_ui";

export default function FlexInputPage() {
  const [value_mixed, set_value_mixed] = useState<string>("");
  const [value_numeric, set_value_numeric] = useState<string>("");
  const [value_email, set_value_email] = useState<string>("");
  const [value_alpha, set_value_alpha] = useState<string>("");

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Flex Input</h1>
        <p className="text-muted-foreground">
          Enhanced input with validation and constraints
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Mixed input */}
        <section id="test-mixed" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Mixed Input (Default)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Accepts any text input
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <label className="block mb-2 text-sm font-medium">Default Input</label>
            <HazoUiFlexInput
              value={value_mixed}
              onChange={(e) => set_value_mixed(e.target.value)}
              placeholder="Enter any text..."
              input_type="mixed"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Value:</h3>
            <pre className="text-xs">{value_mixed || "(empty)"}</pre>
          </div>
        </section>

        {/* Section 2: Numeric input */}
        <section id="test-numeric" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Numeric Input</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Only allows numeric values with optional min/max constraints
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <label className="block mb-2 text-sm font-medium">Percentage (0-100)</label>
            <HazoUiFlexInput
              value={value_numeric}
              onChange={(e) => set_value_numeric(e.target.value)}
              placeholder="0.00"
              input_type="numeric"
              num_min={0}
              num_max={100}
              num_decimals={2}
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Value:</h3>
            <pre className="text-xs">{value_numeric || "(empty)"}</pre>
          </div>
        </section>

        {/* Section 3: Email input */}
        <section id="test-email" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Email Input</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Validates email format
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <label className="block mb-2 text-sm font-medium">Email Address</label>
            <HazoUiFlexInput
              value={value_email}
              onChange={(e) => set_value_email(e.target.value)}
              placeholder="user@example.com"
              input_type="email"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Value:</h3>
            <pre className="text-xs">{value_email || "(empty)"}</pre>
          </div>
        </section>

        {/* Section 4: Alpha input */}
        <section id="test-alpha" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Alpha Input</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Only allows letters and spaces
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <HazoUiFlexInput
              value={value_alpha}
              onChange={(e) => set_value_alpha(e.target.value)}
              placeholder="Enter name..."
              input_type="alpha"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Value:</h3>
            <pre className="text-xs">{value_alpha || "(empty)"}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
