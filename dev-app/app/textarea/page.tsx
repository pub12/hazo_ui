/**
 * Textarea test page
 * Note: HazoUiTextarea requires custom prefix configuration
 */
"use client";

export default function TextareaPage() {
  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Textarea</h1>
        <p className="text-muted-foreground">
          Multi-line input with command and mention support
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        <section id="test-info" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Component Information</h2>
          <p className="text-sm text-muted-foreground mb-4">
            HazoUiTextarea provides multi-line text input with command/mention support.
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <h3 className="font-medium mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Multi-line text editing with command triggers</li>
              <li>Configurable prefixes for @mentions, /commands, #tags</li>
              <li>Command pill rendering inline with text</li>
              <li>Adjustable height with min_height and max_height</li>
              <li>Submit callback on Cmd/Ctrl+Enter</li>
              <li>Plain text and display text output</li>
            </ul>
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Required Props:</h3>
            <ul className="text-xs space-y-1">
              <li>• <code>prefixes</code> - Array of prefix configurations (char, commands, color)</li>
              <li>• <code>value</code> or <code>default_value</code> - Text content</li>
              <li>• <code>on_change</code> - Callback with CommandTextOutput</li>
              <li>• <code>min_height</code> / <code>max_height</code> - Height constraints (optional)</li>
            </ul>
            <p className="text-xs mt-3 text-muted-foreground">
              See hazo_ui documentation for detailed configuration examples.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
