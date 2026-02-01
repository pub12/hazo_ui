/**
 * Command system test page
 * Tests command pills with different prefixes
 */
"use client";

import { CommandPill } from "hazo_ui";

export default function CommandPage() {
  const commands = [
    { prefix: "@", action: "user_123", action_label: "John Doe", id: "cmd-1" },
    { prefix: "/", action: "help", action_label: "Help Command", id: "cmd-2" },
    { prefix: "#", action: "feature", action_label: "Feature Request", id: "cmd-3" },
  ];

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Command System</h1>
        <p className="text-muted-foreground">
          Command pills with @/# prefix support
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Command pills */}
        <section id="test-command-pills" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Command Pills</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Different prefix types: @mention, /command, #tag
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <div className="flex flex-wrap gap-3">
              {commands.map((cmd) => (
                <CommandPill
                  key={cmd.id}
                  id={cmd.id}
                  prefix={cmd.prefix}
                  action={cmd.action}
                  action_label={cmd.action_label}
                />
              ))}
            </div>
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Usage:</h3>
            <pre className="text-xs overflow-auto">
{`<CommandPill
  id="cmd-1"
  prefix="@"
  action="user_123"
  action_label="John Doe"
/>`}
            </pre>
          </div>
        </section>

        {/* Section 2: More examples */}
        <section id="test-more-examples" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Additional Examples</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Various command pill configurations
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Mentions (@)</p>
                <div className="flex flex-wrap gap-2">
                  <CommandPill id="m1" prefix="@" action="alice" action_label="Alice" />
                  <CommandPill id="m2" prefix="@" action="bob" action_label="Bob" />
                  <CommandPill id="m3" prefix="@" action="charlie" action_label="Charlie" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Commands (/)</p>
                <div className="flex flex-wrap gap-2">
                  <CommandPill id="c1" prefix="/" action="search" action_label="Search" />
                  <CommandPill id="c2" prefix="/" action="filter" action_label="Filter" />
                  <CommandPill id="c3" prefix="/" action="sort" action_label="Sort" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Tags (#)</p>
                <div className="flex flex-wrap gap-2">
                  <CommandPill id="t1" prefix="#" action="urgent" action_label="Urgent" />
                  <CommandPill id="t2" prefix="#" action="bug" action_label="Bug" />
                  <CommandPill id="t3" prefix="#" action="enhancement" action_label="Enhancement" />
                </div>
              </div>
            </div>
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Props:</h3>
            <ul className="text-xs space-y-1">
              <li>• <code>id</code> - Unique identifier for the pill</li>
              <li>• <code>prefix</code> - The prefix character (@, /, #, etc.)</li>
              <li>• <code>action</code> - The action identifier</li>
              <li>• <code>action_label</code> - The display label</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
