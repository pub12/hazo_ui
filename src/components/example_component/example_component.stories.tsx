// Storybook stories for ExampleComponent
// Used for testing and development of components
import type { Meta, StoryObj } from "@storybook/react";
import { ExampleComponent } from "./index";

const meta: Meta<typeof ExampleComponent> = {
  title: "Example/ExampleComponent",
  component: ExampleComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExampleComponent>;

export const Default: Story = {
  args: {
    children: "Example Component Content",
  },
};

