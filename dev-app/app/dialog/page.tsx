/**
 * Dialog test page
 * Tests complex dialogs with various controls, fields, and themes
 */
"use client";

import { useState } from "react";
import { HazoUiDialog } from "hazo_ui";

export default function DialogPage() {
  // State for minimal dialog
  const [is_minimal_open, set_is_minimal_open] = useState<boolean>(false);

  // State for complex form dialog
  const [is_form_open, set_is_form_open] = useState<boolean>(false);
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    start_date: "",
    notifications_enabled: true,
    preferred_contact: "email",
    bio: "",
    salary: "",
  });

  // State for themed dialogs
  const [is_success_open, set_is_success_open] = useState<boolean>(false);
  const [is_warning_open, set_is_warning_open] = useState<boolean>(false);
  const [is_danger_open, set_is_danger_open] = useState<boolean>(false);
  const [is_info_open, set_is_info_open] = useState<boolean>(false);

  // State for size variants
  const [is_small_open, set_is_small_open] = useState<boolean>(false);
  const [is_medium_open, set_is_medium_open] = useState<boolean>(false);
  const [is_large_open, set_is_large_open] = useState<boolean>(false);
  const [is_xlarge_open, set_is_xlarge_open] = useState<boolean>(false);
  const [is_fullwidth_open, set_is_fullwidth_open] = useState<boolean>(false);

  // State for animation variants
  const [is_zoom_open, set_is_zoom_open] = useState<boolean>(false);
  const [is_slide_open, set_is_slide_open] = useState<boolean>(false);
  const [is_fade_open, set_is_fade_open] = useState<boolean>(false);

  // Form handlers
  const handleFormSubmit = () => {
    console.log("Form submitted:", form_data);
    set_is_form_open(false);
  };

  const resetForm = () => {
    set_form_data({
      name: "",
      email: "",
      role: "",
      department: "",
      start_date: "",
      notifications_enabled: true,
      preferred_contact: "email",
      bio: "",
      salary: "",
    });
  };

  return (
    <div className="cls_test_page p-8">
      <header className="cls_page_header mb-8">
        <h1 className="text-3xl font-bold mb-2">Dialog Component</h1>
        <p className="text-muted-foreground">
          Modal dialog with complex forms, controls, and themed variants
        </p>
      </header>

      <div className="cls_test_sections space-y-12">
        {/* Section 1: Minimal Dialog */}
        <section id="test-minimal" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Minimal Dialog</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Basic dialog with simple content and confirmation
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <button
              onClick={() => set_is_minimal_open(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Minimal Dialog
            </button>

            <HazoUiDialog
              open={is_minimal_open}
              onOpenChange={set_is_minimal_open}
              title="Confirm Action"
              description="This action cannot be undone. Are you sure you want to proceed?"
              onConfirm={() => {
                console.log("Confirmed");
                set_is_minimal_open(false);
              }}
              onCancel={() => {
                console.log("Cancelled");
              }}
            >
              <p className="text-sm text-muted-foreground">
                This is a simple confirmation dialog with minimal content.
              </p>
            </HazoUiDialog>
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">State:</h3>
            <pre className="text-xs">
              {JSON.stringify({ is_minimal_open }, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 2: Complex Form Dialog */}
        <section id="test-complex-form" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Complex Form Dialog</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Dialog with multiple form controls and field types
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
            <button
              onClick={() => set_is_form_open(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Form Dialog
            </button>

            <HazoUiDialog
              open={is_form_open}
              onOpenChange={set_is_form_open}
              title="New Employee Registration"
              description="Please fill out all required fields to register a new employee."
              actionButtonText="Register"
              onConfirm={handleFormSubmit}
              onCancel={() => {
                resetForm();
              }}
              sizeWidth="min(90vw, 700px)"
              sizeHeight="min(85vh, 900px)"
            >
              <div className="cls_form_fields space-y-6">
                {/* Text Input - Name */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form_data.name}
                    onChange={(e) =>
                      set_form_data({ ...form_data, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                {/* Email Input */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john.doe@company.com"
                    value={form_data.email}
                    onChange={(e) =>
                      set_form_data({ ...form_data, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                {/* Select Dropdown - Role */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Role *</label>
                  <select
                    value={form_data.role}
                    onChange={(e) =>
                      set_form_data({ ...form_data, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="">Select a role</option>
                    <option value="engineer">Software Engineer</option>
                    <option value="designer">UI/UX Designer</option>
                    <option value="manager">Product Manager</option>
                    <option value="analyst">Data Analyst</option>
                    <option value="devops">DevOps Engineer</option>
                  </select>
                </div>

                {/* Select Dropdown - Department */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Department *</label>
                  <select
                    value={form_data.department}
                    onChange={(e) =>
                      set_form_data({ ...form_data, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="">Select a department</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="product">Product</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="hr">Human Resources</option>
                  </select>
                </div>

                {/* Date Input - Start Date */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Start Date *</label>
                  <input
                    type="date"
                    value={form_data.start_date}
                    onChange={(e) =>
                      set_form_data({ ...form_data, start_date: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                {/* Number Input - Salary */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Annual Salary (USD)</label>
                  <input
                    type="number"
                    placeholder="75000"
                    value={form_data.salary}
                    onChange={(e) =>
                      set_form_data({ ...form_data, salary: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                {/* Radio Group - Preferred Contact */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Preferred Contact Method</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="contact-email"
                        name="contact"
                        value="email"
                        checked={form_data.preferred_contact === "email"}
                        onChange={(e) =>
                          set_form_data({ ...form_data, preferred_contact: e.target.value })
                        }
                        className="cursor-pointer"
                      />
                      <label htmlFor="contact-email" className="cursor-pointer text-sm">
                        Email
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="contact-phone"
                        name="contact"
                        value="phone"
                        checked={form_data.preferred_contact === "phone"}
                        onChange={(e) =>
                          set_form_data({ ...form_data, preferred_contact: e.target.value })
                        }
                        className="cursor-pointer"
                      />
                      <label htmlFor="contact-phone" className="cursor-pointer text-sm">
                        Phone
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="contact-slack"
                        name="contact"
                        value="slack"
                        checked={form_data.preferred_contact === "slack"}
                        onChange={(e) =>
                          set_form_data({ ...form_data, preferred_contact: e.target.value })
                        }
                        className="cursor-pointer"
                      />
                      <label htmlFor="contact-slack" className="cursor-pointer text-sm">
                        Slack
                      </label>
                    </div>
                  </div>
                </div>

                {/* Checkbox - Notifications */}
                <div className="cls_field_group flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Notifications</label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form_data.notifications_enabled}
                    onChange={(e) =>
                      set_form_data({ ...form_data, notifications_enabled: e.target.checked })
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>

                {/* Textarea - Bio */}
                <div className="cls_field_group space-y-2">
                  <label className="text-sm font-medium">Bio / Notes</label>
                  <textarea
                    placeholder="Enter any additional information about the employee..."
                    value={form_data.bio}
                    onChange={(e) =>
                      set_form_data({ ...form_data, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>
            </HazoUiDialog>
          </div>

          <div className="cls_output_display p-4 border rounded-lg bg-muted">
            <h3 className="font-medium mb-2">Form Data:</h3>
            <pre className="text-xs overflow-auto max-h-64">
              {JSON.stringify(form_data, null, 2)}
            </pre>
          </div>
        </section>

        {/* Section 3: Themed Dialogs */}
        <section id="test-themed" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Themed Dialogs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Dialogs with different color themes and styles
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4 space-y-4">
            {/* Success Theme */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_success_open(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Success Theme
              </button>
              <HazoUiDialog
                open={is_success_open}
                onOpenChange={set_is_success_open}
                title="✓ Operation Successful"
                description="Your changes have been saved successfully."
                actionButtonText="Done"
                actionButtonVariant="default"
                showCancelButton={false}
                onConfirm={() => set_is_success_open(false)}
                overlayClassName="bg-green-950/50"
                borderColor="rgb(34, 197, 94)"
                headerBackgroundColor="rgb(220, 252, 231)"
                headerTextColor="rgb(22, 101, 52)"
                accentColor="rgb(34, 197, 94)"
              >
                <div className="cls_success_content space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">
                        All changes saved
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        3 items updated successfully
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your data has been synchronized across all devices.
                  </p>
                </div>
              </HazoUiDialog>
            </div>

            {/* Warning Theme */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_warning_open(true)}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
              >
                Warning Theme
              </button>
              <HazoUiDialog
                open={is_warning_open}
                onOpenChange={set_is_warning_open}
                title="⚠ Warning: Action Required"
                description="Please review the following before proceeding."
                actionButtonText="I Understand"
                actionButtonVariant="default"
                cancelButtonText="Go Back"
                onConfirm={() => set_is_warning_open(false)}
                overlayClassName="bg-yellow-950/50"
                borderColor="rgb(234, 179, 8)"
                headerBackgroundColor="rgb(254, 249, 195)"
                headerTextColor="rgb(113, 63, 18)"
                accentColor="rgb(234, 179, 8)"
              >
                <div className="cls_warning_content space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      !
                    </div>
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">
                        Unsaved Changes Detected
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        You have 5 unsaved changes that will be lost if you continue.
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Profile information updates</li>
                    <li>Password change</li>
                    <li>Notification preferences</li>
                  </ul>
                </div>
              </HazoUiDialog>
            </div>

            {/* Danger Theme */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_danger_open(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Danger Theme
              </button>
              <HazoUiDialog
                open={is_danger_open}
                onOpenChange={set_is_danger_open}
                title="⛔ Destructive Action"
                description="This action is permanent and cannot be undone."
                actionButtonText="Delete Permanently"
                actionButtonVariant="destructive"
                cancelButtonText="Cancel"
                onConfirm={() => {
                  console.log("Destructive action confirmed");
                  set_is_danger_open(false);
                }}
                overlayClassName="bg-red-950/50"
                borderColor="rgb(239, 68, 68)"
                headerBackgroundColor="rgb(254, 226, 226)"
                headerTextColor="rgb(127, 29, 29)"
              >
                <div className="cls_danger_content space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      ✕
                    </div>
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-100">
                        Delete 247 Items
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        All selected files will be permanently deleted from the server.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">This will delete:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>All associated files and attachments</li>
                      <li>Related metadata and tags</li>
                      <li>Shared links and permissions</li>
                      <li>Version history</li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Type "DELETE" to confirm this action
                  </p>
                  <input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </HazoUiDialog>
            </div>

            {/* Info Theme */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_info_open(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Info Theme
              </button>
              <HazoUiDialog
                open={is_info_open}
                onOpenChange={set_is_info_open}
                title="ℹ Information"
                description="Learn more about this feature and how to use it."
                actionButtonText="Got It"
                actionButtonVariant="default"
                showCancelButton={false}
                onConfirm={() => set_is_info_open(false)}
                overlayClassName="bg-blue-950/50"
                borderColor="rgb(59, 130, 246)"
                headerBackgroundColor="rgb(219, 234, 254)"
                headerTextColor="rgb(30, 58, 138)"
                accentColor="rgb(59, 130, 246)"
              >
                <div className="cls_info_content space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      i
                    </div>
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        New Feature Available
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        We've added advanced filtering options to help you find what you need faster.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Features:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Filter by date range</li>
                      <li>Multiple field sorting</li>
                      <li>Save custom filter presets</li>
                      <li>Export filtered results</li>
                    </ul>
                  </div>
                </div>
              </HazoUiDialog>
            </div>
          </div>
        </section>

        {/* Section 4: Size Variants */}
        <section id="test-sizes" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Size Variants</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Dialogs with different size configurations
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4 space-y-4">
            {/* Small Dialog - 400px */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_small_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Small (400px)
              </button>
              <HazoUiDialog
                open={is_small_open}
                onOpenChange={set_is_small_open}
                title="Small Dialog"
                description="Compact size for simple confirmations"
                sizeWidth="min(90vw, 400px)"
                sizeHeight="min(70vh, 300px)"
                onConfirm={() => set_is_small_open(false)}
              >
                <p className="text-sm">This is a small, compact dialog (400px) for quick actions.</p>
              </HazoUiDialog>
            </div>

            {/* Medium Dialog - 600px */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_medium_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Medium (600px)
              </button>
              <HazoUiDialog
                open={is_medium_open}
                onOpenChange={set_is_medium_open}
                title="Medium Dialog"
                description="Standard size for typical forms and content"
                sizeWidth="min(90vw, 600px)"
                sizeHeight="min(80vh, 600px)"
                onConfirm={() => set_is_medium_open(false)}
              >
                <div className="space-y-4">
                  <p className="text-sm">
                    This is a medium dialog (600px) - the default recommended size for most use cases.
                  </p>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Example Content</h4>
                    <p className="text-sm text-muted-foreground">
                      Ideal for forms with 5-10 fields or moderate content.
                    </p>
                  </div>
                </div>
              </HazoUiDialog>
            </div>

            {/* Large Dialog - 1000px */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_large_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Large (1000px)
              </button>
              <HazoUiDialog
                open={is_large_open}
                onOpenChange={set_is_large_open}
                title="Large Dialog"
                description="Spacious layout for complex content and forms"
                sizeWidth="min(95vw, 1000px)"
                sizeHeight="min(85vh, 800px)"
                onConfirm={() => set_is_large_open(false)}
              >
                <div className="space-y-4">
                  <p className="text-sm">
                    This is a large dialog (1000px) with plenty of space for detailed content.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Column 1</h4>
                      <p className="text-sm text-muted-foreground">
                        Content area with multiple sections and layouts.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Column 2</h4>
                      <p className="text-sm text-muted-foreground">
                        Additional information and controls.
                      </p>
                    </div>
                  </div>
                </div>
              </HazoUiDialog>
            </div>

            {/* Extra-Large Dialog - 1400px */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_xlarge_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Extra-Large (1400px)
              </button>
              <HazoUiDialog
                open={is_xlarge_open}
                onOpenChange={set_is_xlarge_open}
                title="Extra-Large Dialog"
                description="Very spacious layout for complex multi-column interfaces"
                sizeWidth="min(95vw, 1400px)"
                sizeHeight="min(90vh, 900px)"
                onConfirm={() => set_is_xlarge_open(false)}
              >
                <div className="space-y-4">
                  <p className="text-sm">
                    This is an extra-large dialog (1400px) for complex multi-column content.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Column 1</h4>
                      <p className="text-sm text-muted-foreground">
                        First section of content
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Column 2</h4>
                      <p className="text-sm text-muted-foreground">
                        Second section of content
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Column 3</h4>
                      <p className="text-sm text-muted-foreground">
                        Third section of content
                      </p>
                    </div>
                  </div>
                </div>
              </HazoUiDialog>
            </div>

            {/* Full Width Dialog - 98vw */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_fullwidth_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Full Width (98vw)
              </button>
              <HazoUiDialog
                open={is_fullwidth_open}
                onOpenChange={set_is_fullwidth_open}
                title="Full Width Dialog"
                description="Maximum width for dashboard-like interfaces"
                sizeWidth="98vw"
                sizeHeight="min(90vh, 1000px)"
                onConfirm={() => set_is_fullwidth_open(false)}
              >
                <div className="space-y-4">
                  <p className="text-sm">
                    This dialog uses almost the full viewport width (98vw) for maximum content area.
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Section {i}</h4>
                        <p className="text-sm text-muted-foreground">
                          Content area #{i}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </HazoUiDialog>
            </div>
          </div>
        </section>

        {/* Section 5: Animation Variants */}
        <section id="test-animations" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Animation Variants</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Different animation styles for dialog entrance and exit
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4 space-y-4">
            {/* Zoom Animation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_zoom_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Zoom Animation
              </button>
              <HazoUiDialog
                open={is_zoom_open}
                onOpenChange={set_is_zoom_open}
                title="Zoom Animation"
                description="Scales in and out from center"
                openAnimation="zoom"
                closeAnimation="zoom"
                onConfirm={() => set_is_zoom_open(false)}
              >
                <p className="text-sm">This dialog zooms in and out with a scale animation.</p>
              </HazoUiDialog>
            </div>

            {/* Slide Animation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_slide_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Slide Animation
              </button>
              <HazoUiDialog
                open={is_slide_open}
                onOpenChange={set_is_slide_open}
                title="Slide Animation"
                description="Slides up from bottom"
                openAnimation="slide"
                closeAnimation="slide"
                onConfirm={() => set_is_slide_open(false)}
              >
                <p className="text-sm">This dialog slides in from the bottom of the screen.</p>
              </HazoUiDialog>
            </div>

            {/* Fade Animation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_fade_open(true)}
                className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
              >
                Fade Animation
              </button>
              <HazoUiDialog
                open={is_fade_open}
                onOpenChange={set_is_fade_open}
                title="Fade Animation"
                description="Simple fade in and out"
                openAnimation="fade"
                closeAnimation="fade"
                onConfirm={() => set_is_fade_open(false)}
              >
                <p className="text-sm">This dialog fades in and out smoothly.</p>
              </HazoUiDialog>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
