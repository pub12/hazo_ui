/**
 * Dialog test page
 * Tests complex dialogs with various controls, fields, and themes
 */
"use client";

import { useState } from "react";
import { HazoUiDialog } from "hazo_ui";
import { Send, Lock, Loader2 } from "lucide-react";

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
  const [is_bounce_open, set_is_bounce_open] = useState<boolean>(false);
  const [is_scale_up_open, set_is_scale_up_open] = useState<boolean>(false);
  const [is_flip_open, set_is_flip_open] = useState<boolean>(false);
  const [is_slide_left_open, set_is_slide_left_open] = useState<boolean>(false);
  const [is_slide_right_open, set_is_slide_right_open] = useState<boolean>(false);
  const [is_slide_top_open, set_is_slide_top_open] = useState<boolean>(false);

  // State for header bar variants
  const [is_header_bar_dark_open, set_is_header_bar_dark_open] = useState<boolean>(false);
  const [is_header_bar_blue_open, set_is_header_bar_blue_open] = useState<boolean>(false);
  const [is_header_bar_purple_open, set_is_header_bar_purple_open] = useState<boolean>(false);

  // State for action button enhancement tests
  const [is_loading_test_open, set_is_loading_test_open] = useState<boolean>(false);
  const [test1_loading, set_test1_loading] = useState<boolean>(false);
  const [is_icon_test_open, set_is_icon_test_open] = useState<boolean>(false);
  const [is_icon_loading_test_open, set_is_icon_loading_test_open] = useState<boolean>(false);
  const [test3_loading, set_test3_loading] = useState<boolean>(false);
  const [is_custom_footer_open, set_is_custom_footer_open] = useState<boolean>(false);
  const [stats, set_stats] = useState({ keep: 5, accept: 3, skip: 2 });
  const [is_progress_open, set_is_progress_open] = useState<boolean>(false);
  const [progress, set_progress] = useState<number>(0);

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
            9 different animation styles for dialog entrance and exit
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4 grid grid-cols-2 gap-4">
            {/* Zoom Animation */}
            <button
              onClick={() => set_is_zoom_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Zoom</div>
              <div className="text-xs text-muted-foreground">Scales from 50% size</div>
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
              <p className="text-sm">Zooms from 50% size with dramatic scale effect.</p>
            </HazoUiDialog>

            {/* Slide Bottom */}
            <button
              onClick={() => set_is_slide_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Slide Bottom</div>
              <div className="text-xs text-muted-foreground">Slides from below</div>
            </button>
            <HazoUiDialog
              open={is_slide_open}
              onOpenChange={set_is_slide_open}
              title="Slide Bottom"
              openAnimation="slide"
              closeAnimation="slide"
              onConfirm={() => set_is_slide_open(false)}
            >
              <p className="text-sm">Slides up from bottom of screen.</p>
            </HazoUiDialog>

            {/* Slide Top */}
            <button
              onClick={() => set_is_slide_top_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Slide Top</div>
              <div className="text-xs text-muted-foreground">Slides from above</div>
            </button>
            <HazoUiDialog
              open={is_slide_top_open}
              onOpenChange={set_is_slide_top_open}
              title="Slide Top"
              openAnimation="slide-top"
              closeAnimation="slide-top"
              onConfirm={() => set_is_slide_top_open(false)}
            >
              <p className="text-sm">Slides down from top of screen.</p>
            </HazoUiDialog>

            {/* Slide Left */}
            <button
              onClick={() => set_is_slide_left_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Slide Left</div>
              <div className="text-xs text-muted-foreground">Slides from left</div>
            </button>
            <HazoUiDialog
              open={is_slide_left_open}
              onOpenChange={set_is_slide_left_open}
              title="Slide Left"
              openAnimation="slide-left"
              closeAnimation="slide-left"
              onConfirm={() => set_is_slide_left_open(false)}
            >
              <p className="text-sm">Slides in from left side of screen.</p>
            </HazoUiDialog>

            {/* Slide Right */}
            <button
              onClick={() => set_is_slide_right_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Slide Right</div>
              <div className="text-xs text-muted-foreground">Slides from right</div>
            </button>
            <HazoUiDialog
              open={is_slide_right_open}
              onOpenChange={set_is_slide_right_open}
              title="Slide Right"
              openAnimation="slide-right"
              closeAnimation="slide-right"
              onConfirm={() => set_is_slide_right_open(false)}
            >
              <p className="text-sm">Slides in from right side of screen.</p>
            </HazoUiDialog>

            {/* Fade */}
            <button
              onClick={() => set_is_fade_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Fade</div>
              <div className="text-xs text-muted-foreground">Pure opacity fade</div>
            </button>
            <HazoUiDialog
              open={is_fade_open}
              onOpenChange={set_is_fade_open}
              title="Fade Animation"
              openAnimation="fade"
              closeAnimation="fade"
              onConfirm={() => set_is_fade_open(false)}
            >
              <p className="text-sm">Slow opacity fade with no movement.</p>
            </HazoUiDialog>

            {/* Bounce */}
            <button
              onClick={() => set_is_bounce_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Bounce</div>
              <div className="text-xs text-muted-foreground">Subtle bounce effect</div>
            </button>
            <HazoUiDialog
              open={is_bounce_open}
              onOpenChange={set_is_bounce_open}
              title="Bounce Animation"
              openAnimation="bounce"
              closeAnimation="bounce"
              onConfirm={() => set_is_bounce_open(false)}
            >
              <p className="text-sm">Gentle bounce/spring animation.</p>
            </HazoUiDialog>

            {/* Scale Up */}
            <button
              onClick={() => set_is_scale_up_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Scale Up</div>
              <div className="text-xs text-muted-foreground">Scales from 0%</div>
            </button>
            <HazoUiDialog
              open={is_scale_up_open}
              onOpenChange={set_is_scale_up_open}
              title="Scale Up"
              openAnimation="scale-up"
              closeAnimation="scale-up"
              onConfirm={() => set_is_scale_up_open(false)}
            >
              <p className="text-sm">Scales from 0% to full size.</p>
            </HazoUiDialog>

            {/* Flip */}
            <button
              onClick={() => set_is_flip_open(true)}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors text-left"
            >
              <div className="font-medium">Flip</div>
              <div className="text-xs text-muted-foreground">Flip/rotate effect</div>
            </button>
            <HazoUiDialog
              open={is_flip_open}
              onOpenChange={set_is_flip_open}
              title="Flip Animation"
              openAnimation="flip"
              closeAnimation="flip"
              onConfirm={() => set_is_flip_open(false)}
            >
              <p className="text-sm">Flip/rotate animation effect.</p>
            </HazoUiDialog>
          </div>
        </section>

        {/* Section 6: Header Bar Variants */}
        <section id="test-header-bar" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Header Bar Variants</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Full-width colored header bar like common modal designs
          </p>

          <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4 space-y-4">
            {/* Dark Header Bar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_header_bar_dark_open(true)}
                className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
              >
                Dark Header Bar
              </button>
              <HazoUiDialog
                open={is_header_bar_dark_open}
                onOpenChange={set_is_header_bar_dark_open}
                title="Prefill from Document"
                description="Upload a PDF document to extract and populate form fields"
                headerBar={true}
                headerBarColor="#1e293b"
                actionButtonText="Upload"
                onConfirm={() => set_is_header_bar_dark_open(false)}
                sizeWidth="min(90vw, 700px)"
              >
                <div className="space-y-4">
                  <p className="text-sm">
                    Upload a PDF document (e.g., PAYG summary, ATO statement, prior year return) to automatically extract and populate form fields. Only empty fields will be updated.
                  </p>
                  <div className="p-8 border-2 border-dashed rounded-lg text-center">
                    <div className="text-4xl mb-2">↑</div>
                    <p className="font-medium">Click to select or drag and drop a PDF file</p>
                    <p className="text-sm text-muted-foreground mt-1">Maximum file size: 10MB</p>
                  </div>
                </div>
              </HazoUiDialog>
            </div>

            {/* Blue Header Bar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_header_bar_blue_open(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Blue Header Bar
              </button>
              <HazoUiDialog
                open={is_header_bar_blue_open}
                onOpenChange={set_is_header_bar_blue_open}
                title="Create New Project"
                description="Set up a new project workspace"
                headerBar={true}
                headerBarColor="#2563eb"
                actionButtonText="Create"
                onConfirm={() => set_is_header_bar_blue_open(false)}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    <input
                      type="text"
                      placeholder="My Awesome Project"
                      className="w-full px-3 py-2 border rounded-md mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      placeholder="Enter project description..."
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md mt-1"
                    />
                  </div>
                </div>
              </HazoUiDialog>
            </div>

            {/* Purple Header Bar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => set_is_header_bar_purple_open(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Purple Header Bar
              </button>
              <HazoUiDialog
                open={is_header_bar_purple_open}
                onOpenChange={set_is_header_bar_purple_open}
                title="Invite Team Members"
                description="Add people to your workspace"
                headerBar={true}
                headerBarColor="#9333ea"
                actionButtonText="Send Invites"
                onConfirm={() => set_is_header_bar_purple_open(false)}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email Addresses</label>
                    <input
                      type="text"
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 border rounded-md mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <select className="w-full px-3 py-2 border rounded-md mt-1">
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </div>
              </HazoUiDialog>
            </div>
          </div>
        </section>

        {/* Section: Action Button Enhancement */}
        <section id="test-action-button" className="cls_test_section">
          <h2 className="text-2xl font-semibold mb-4">Action Button Enhancement</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Loading states, icons, and custom footers for enhanced UX
          </p>

          {/* Test Case 1: Action Button Loading State */}
          <div className="cls_test_case mb-8">
            <h3 className="text-lg font-medium mb-2">Test Case 1: Action Button Loading State</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Button shows spinner and is disabled during async operations
            </p>

            <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
              <button
                onClick={() => set_is_loading_test_open(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Save Dialog
              </button>

              <HazoUiDialog
                open={is_loading_test_open}
                onOpenChange={set_is_loading_test_open}
                title="Save Changes"
                description="Your changes will be saved to the server."
                actionButtonText={test1_loading ? "Saving..." : "Save"}
                actionButtonLoading={test1_loading}
                onConfirm={() => {
                  set_test1_loading(true);
                  // Simulate async operation
                  setTimeout(() => {
                    set_test1_loading(false);
                    set_is_loading_test_open(false);
                    console.log("Changes saved");
                  }, 2000);
                }}
                onCancel={() => {
                  console.log("Save cancelled");
                }}
              >
                <p className="text-sm text-muted-foreground">
                  Click Save to see the loading state with spinner and disabled button.
                </p>
              </HazoUiDialog>
            </div>

            <div className="cls_output_display p-4 border rounded-lg bg-muted">
              <h3 className="font-medium mb-2">State:</h3>
              <pre className="text-xs">
                {JSON.stringify({ is_loading_test_open, test1_loading }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Case 2: Action Button with Icon */}
          <div className="cls_test_case mb-8">
            <h3 className="text-lg font-medium mb-2">Test Case 2: Action Button with Icon</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Icon appears before button text for enhanced visual communication
            </p>

            <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
              <button
                onClick={() => set_is_icon_test_open(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Send Dialog
              </button>

              <HazoUiDialog
                open={is_icon_test_open}
                onOpenChange={set_is_icon_test_open}
                title="Send Email"
                description="This will send the email to all recipients."
                actionButtonText="Send Email"
                actionButtonIcon={<Send className="h-4 w-4" />}
                onConfirm={() => {
                  console.log("Email sent");
                  set_is_icon_test_open(false);
                }}
                onCancel={() => {
                  console.log("Send cancelled");
                }}
              >
                <p className="text-sm text-muted-foreground">
                  The Send icon appears before the button text.
                </p>
              </HazoUiDialog>
            </div>

            <div className="cls_output_display p-4 border rounded-lg bg-muted">
              <h3 className="font-medium mb-2">State:</h3>
              <pre className="text-xs">
                {JSON.stringify({ is_icon_test_open }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Case 3: Icon + Loading (Icon Replaced by Spinner) */}
          <div className="cls_test_case mb-8">
            <h3 className="text-lg font-medium mb-2">Test Case 3: Icon + Loading (Icon Replaced by Spinner)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Icon is replaced by spinner during loading state
            </p>

            <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
              <button
                onClick={() => set_is_icon_loading_test_open(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Lock Dialog
              </button>

              <HazoUiDialog
                open={is_icon_loading_test_open}
                onOpenChange={set_is_icon_loading_test_open}
                title="Close Account"
                description="This will permanently close your account."
                actionButtonText={test3_loading ? "Closing..." : "Close"}
                actionButtonIcon={<Lock className="h-4 w-4" />}
                actionButtonLoading={test3_loading}
                onConfirm={() => {
                  set_test3_loading(true);
                  // Simulate async operation
                  setTimeout(() => {
                    set_test3_loading(false);
                    set_is_icon_loading_test_open(false);
                    console.log("Account closed");
                  }, 2000);
                }}
                onCancel={() => {
                  console.log("Close cancelled");
                }}
              >
                <p className="text-sm text-muted-foreground">
                  Lock icon is replaced by spinner when loading.
                </p>
              </HazoUiDialog>
            </div>

            <div className="cls_output_display p-4 border rounded-lg bg-muted">
              <h3 className="font-medium mb-2">State:</h3>
              <pre className="text-xs">
                {JSON.stringify({ is_icon_loading_test_open, test3_loading }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Case 4: Custom Footer Content (Stats + Buttons) */}
          <div className="cls_test_case mb-8">
            <h3 className="text-lg font-medium mb-2">Test Case 4: Custom Footer Content (Stats + Buttons)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Custom footer with stats and multiple action buttons
            </p>

            <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
              <button
                onClick={() => set_is_custom_footer_open(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Review Dialog
              </button>

              <HazoUiDialog
                open={is_custom_footer_open}
                onOpenChange={set_is_custom_footer_open}
                title="Review Items"
                description="Review and process the items below."
                footerContent={
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      Keep: {stats.keep} | Accept: {stats.accept} | Skip: {stats.skip}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          set_stats({ ...stats, skip: stats.skip + 1 });
                        }}
                        className="px-3 py-1.5 text-sm border rounded-md hover:bg-muted transition-colors"
                      >
                        Skip
                      </button>
                      <button
                        onClick={() => {
                          set_stats({ ...stats, keep: stats.keep + 1 });
                        }}
                        className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Keep
                      </button>
                      <button
                        onClick={() => {
                          set_stats({ ...stats, accept: stats.accept + 1 });
                          set_is_custom_footer_open(false);
                        }}
                        className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                }
              >
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Custom footer shows stats and multiple action buttons.
                  </p>
                  <div className="p-4 border rounded-lg bg-muted">
                    <p className="text-sm">Item to review: Sample content</p>
                  </div>
                </div>
              </HazoUiDialog>
            </div>

            <div className="cls_output_display p-4 border rounded-lg bg-muted">
              <h3 className="font-medium mb-2">State:</h3>
              <pre className="text-xs">
                {JSON.stringify({ is_custom_footer_open, stats }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Case 5: Empty Footer Content (No Footer) */}
          <div className="cls_test_case mb-8">
            <h3 className="text-lg font-medium mb-2">Test Case 5: Empty Footer Content (No Footer)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Progress dialog with no footer or close button
            </p>

            <div className="cls_component_demo p-6 border rounded-lg bg-card mb-4">
              <button
                onClick={() => {
                  set_is_progress_open(true);
                  set_progress(0);
                  // Simulate progress
                  const interval = setInterval(() => {
                    set_progress((prev) => {
                      const next = prev + 10;
                      if (next >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                          set_is_progress_open(false);
                          set_progress(0);
                        }, 500);
                        return 100;
                      }
                      return next;
                    });
                  }, 300);
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Progress Dialog
              </button>

              <HazoUiDialog
                open={is_progress_open}
                onOpenChange={set_is_progress_open}
                title="Processing..."
                description="Please wait while we process your request."
                showCloseButton={false}
                footerContent={<div />}
              >
                <div className="space-y-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    {progress}% complete
                  </p>
                </div>
              </HazoUiDialog>
            </div>

            <div className="cls_output_display p-4 border rounded-lg bg-muted">
              <h3 className="font-medium mb-2">State:</h3>
              <pre className="text-xs">
                {JSON.stringify({ is_progress_open, progress }, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
