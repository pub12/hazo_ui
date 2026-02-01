/**
 * Rich Text Editor test page
 * Tests RTE with variables and attachments
 */
"use client";

import { useState } from "react";
import { HazoUiRte, type RteOutput, type RteVariable } from "hazo_ui";

export default function RtePage() {
  const [output_default, set_output_default] = useState<RteOutput>({
    html: "",
    plain_text: "",
    attachments: [],
  });

  const [output_with_vars, set_output_with_vars] = useState<RteOutput>({
    html: "",
    plain_text: "",
    attachments: [],
  });

  const [output_with_content, set_output_with_content] = useState<RteOutput>({
    html: "",
    plain_text: "",
    attachments: [],
  });

  // Template variables
  const template_variables: RteVariable[] = [
    { name: "first_name", description: "Customer's first name" },
    { name: "last_name", description: "Customer's last name" },
    { name: "email", description: "Customer's email address" },
    { name: "company_name", description: "Company name" },
    { name: "order_id", description: "Order ID number" },
    { name: "order_date", description: "Order date" },
    { name: "total_amount", description: "Order total amount" },
    { name: "tracking_number", description: "Shipping tracking number" },
  ];

  const initial_content = `<h2>Welcome to hazo_ui!</h2><p>This is a <strong>rich text editor</strong> with full formatting support.</p><ul><li>Bullet lists</li><li>Bold, italic, underline</li><li>Headers and more</li></ul>`;

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Rich Text Editor</h1>
        <p className="text-muted-foreground">
          Full-featured RTE with variables, formatting, and attachments
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Default */}
        <section id="test-default" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Default Editor</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Basic rich text editor with formatting toolbar
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiRte
              on_change={set_output_default}
              placeholder="Start typing..."
              min_height="200px"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Output:</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium mb-1">HTML:</p>
                <pre className="text-xs overflow-auto max-h-32 p-2 bg-background rounded">
                  {output_default.html || "(empty)"}
                </pre>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Plain Text:</p>
                <pre className="text-xs overflow-auto max-h-32 p-2 bg-background rounded">
                  {output_default.plain_text || "(empty)"}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: With variables */}
        <section id="test-with-variables" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">With Variables</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Template variables for email/message personalization
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiRte
              on_change={set_output_with_vars}
              variables={template_variables}
              placeholder="Type @ to insert variables..."
              min_height="200px"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Output:</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium mb-1">HTML:</p>
                <pre className="text-xs overflow-auto max-h-32 p-2 bg-background rounded">
                  {output_with_vars.html || "(empty)"}
                </pre>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Plain Text:</p>
                <pre className="text-xs overflow-auto max-h-32 p-2 bg-background rounded">
                  {output_with_vars.plain_text || "(empty)"}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: With initial content */}
        <section id="test-with-content" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">With Initial Content</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Pre-populated with rich content
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <HazoUiRte
              on_change={set_output_with_content}
              html={initial_content}
              min_height="200px"
            />
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Output:</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium mb-1">HTML:</p>
                <pre className="text-xs overflow-auto max-h-32 p-2 bg-background rounded">
                  {output_with_content.html || "(empty)"}
                </pre>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Plain Text:</p>
                <pre className="text-xs overflow-auto max-h-32 p-2 bg-background rounded">
                  {output_with_content.plain_text || "(empty)"}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
