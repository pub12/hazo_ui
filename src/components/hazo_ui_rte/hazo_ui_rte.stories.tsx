import type { Meta, StoryObj } from "@storybook/react";
import { HazoUiRte } from "./index";
import type { RteVariable, RteAttachment } from "./types";

const meta: Meta<typeof HazoUiRte> = {
  title: "Components/HazoUiRte",
  component: HazoUiRte,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    html: {
      control: "text",
      description: "Initial HTML content",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when editor is empty",
    },
    min_height: {
      control: "text",
      description: "Minimum height of the editor",
    },
    max_height: {
      control: "text",
      description: "Maximum height of the editor",
    },
    disabled: {
      control: "boolean",
      description: "Whether the editor is disabled",
    },
    show_output_viewer: {
      control: "boolean",
      description: "Show HTML/Plain Text/Raw HTML output tabs",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HazoUiRte>;

/**
 * Default story - Basic editor with output viewer
 */
export const Default: Story = {
  args: {
    placeholder: "Start typing your content...",
    min_height: "200px",
    max_height: "400px",
    show_output_viewer: true,
  },
};

/**
 * With Variables - Email template use case
 */
const email_variables: RteVariable[] = [
  { name: "first_name", description: "Recipient's first name" },
  { name: "last_name", description: "Recipient's last name" },
  { name: "email", description: "Recipient's email address" },
  { name: "company_name", description: "Company name" },
  { name: "order_id", description: "Order ID number" },
  { name: "order_date", description: "Date of order" },
  { name: "total_amount", description: "Total order amount" },
  { name: "tracking_number", description: "Shipping tracking number" },
];

export const WithVariables: Story = {
  args: {
    html: "<p>Hello <span data-variable=\"first_name\">{{first_name}}</span>,</p><p>Thank you for your order #<span data-variable=\"order_id\">{{order_id}}</span>!</p>",
    variables: email_variables,
    placeholder: "Compose your email template...",
    min_height: "250px",
    show_output_viewer: true,
  },
};

/**
 * With Initial Content - Pre-populated editor
 */
export const WithInitialContent: Story = {
  args: {
    html: `
      <h1>Welcome to HazoUI RTE</h1>
      <p>This is a <strong>rich text editor</strong> with <em>many features</em>:</p>
      <ul>
        <li>Text formatting (bold, italic, underline, strikethrough)</li>
        <li>Font family and size controls</li>
        <li>Text and highlight colors</li>
        <li>Links and images</li>
        <li>Tables</li>
        <li>Lists (bullet, numbered, checklist)</li>
      </ul>
      <blockquote>This is a blockquote for highlighting important text.</blockquote>
      <p>Try out all the toolbar features!</p>
    `,
    min_height: "300px",
    show_output_viewer: true,
  },
};

/**
 * With Attachments - Pre-populated attachments
 */
const sample_attachments: RteAttachment[] = [
  {
    filename: "document.pdf",
    mime_type: "application/pdf",
    data: "JVBERi0xLjQKJeLjz9MK",
  },
  {
    filename: "data.csv",
    mime_type: "text/csv",
    data: "bmFtZSxlbWFpbAp0ZXN0LHRlc3RAZXhhbXBsZS5jb20=",
  },
];

export const WithAttachments: Story = {
  args: {
    html: "<p>This email has attachments. See the files below the editor.</p>",
    attachments: sample_attachments,
    placeholder: "Add content for your email with attachments...",
    show_output_viewer: true,
  },
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  args: {
    html: "<p>This editor is <strong>disabled</strong>. You cannot edit the content.</p>",
    disabled: true,
  },
};

/**
 * Minimal Height
 */
export const MinimalHeight: Story = {
  args: {
    placeholder: "Compact editor...",
    min_height: "100px",
    max_height: "150px",
  },
};

/**
 * Simple Test - No output viewer
 */
export const SimpleTest: Story = {
  args: {
    placeholder: "Simple test...",
    min_height: "150px",
  },
};

/**
 * Full Feature Demo - All features enabled
 */
export const FullFeatureDemo: Story = {
  args: {
    html: `<h2>Order Confirmation</h2>
<p>Dear <span data-variable="first_name">{{first_name}}</span>,</p>
<p>Thank you for your order! Here are your order details:</p>
<table>
  <tr>
    <th>Order ID</th>
    <td><span data-variable="order_id">{{order_id}}</span></td>
  </tr>
  <tr>
    <th>Date</th>
    <td><span data-variable="order_date">{{order_date}}</span></td>
  </tr>
  <tr>
    <th>Total</th>
    <td><span data-variable="total_amount">{{total_amount}}</span></td>
  </tr>
</table>
<p>Your order will be shipped shortly.</p>
<p>Best regards,<br><strong><span data-variable="company_name">{{company_name}}</span></strong></p>`,
    variables: email_variables,
    placeholder: "Compose your message...",
    min_height: "300px",
    max_height: "500px",
    show_output_viewer: true,
  },
};
