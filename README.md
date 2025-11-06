# hazo_ui

A set of UI components for common interaction elements in a SaaS app.

## Installation

```bash
npm install hazo_ui
```

## Components

### MultiFilterDialog

A powerful, flexible dialog component for multi-field filtering with support for various input types. Perfect for table headers, grid views, or any interface where users need to apply multiple filters simultaneously.

![MultiFilterDialog - Filter Button with Active Filters Tooltip](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-button-tooltip.png)

![MultiFilterDialog - Dialog with Multiple Filters](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-dialog.png)

![MultiFilterDialog - Calendar Date Picker](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-dialog-calendar.png)

![MultiFilterDialog - Filter Output Example](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-output.png)

#### Features

- **Multiple Field Types**: Supports text, number, combobox (select), boolean, and date fields
- **Operator Support**: Number and date fields support comparison operators (equals, greater than, less than, etc.)
- **Dynamic Field Addition**: Users can add and remove filter fields dynamically
- **Field Validation**: Built-in validation for text length, number ranges, and decimal precision
- **Visual Feedback**: Tooltip shows active filters when hovering over the filter button
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Accessible**: Built with accessibility in mind using Radix UI primitives

#### Field Types

1. **Text Fields**
   - Configurable min/max length
   - Real-time validation

2. **Number Fields**
   - Min/max value constraints
   - Optional decimal support with precision control
   - Comparison operators: equals, not equals, greater than, less than, greater or equal, less or equal

3. **Combobox Fields**
   - Dropdown selection from predefined options
   - Searchable field selection

4. **Boolean Fields**
   - Custom true/false labels
   - Simple toggle selection

5. **Date Fields**
   - Calendar picker interface
   - Comparison operators for date ranges
   - Formatted display (e.g., "Nov 6, 2025")

#### Usage

```tsx
import { MultiFilterDialog, type FilterField, type FilterConfig } from 'hazo_ui';
import { useState } from 'react';

function DataTable() {
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  // Define available filter fields
  const availableFields: FilterField[] = [
    {
      value: "name",
      label: "Name",
      type: "text",
      textConfig: {
        minLength: 2,
        maxLength: 50,
      },
    },
    {
      value: "age",
      label: "Age",
      type: "number",
      numberConfig: {
        min: 0,
        max: 120,
        allowDecimal: false,
      },
    },
    {
      value: "price",
      label: "Price",
      type: "number",
      numberConfig: {
        min: 0,
        max: 10000,
        allowDecimal: true,
        decimalLength: 2,
      },
    },
    {
      value: "status",
      label: "Status",
      type: "combobox",
      comboboxOptions: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
      ],
    },
    {
      value: "is_verified",
      label: "Verified",
      type: "boolean",
      booleanLabels: {
        trueLabel: "Yes",
        falseLabel: "No",
      },
    },
    {
      value: "created_date",
      label: "Created Date",
      type: "date",
    },
  ];

  // Handle filter changes
  const handleFilterChange = (filterConfig: FilterConfig[]) => {
    setFilters(filterConfig);
    // Apply filters to your data
    console.log('Applied filters:', filterConfig);
  };

  return (
    <div>
      <MultiFilterDialog
        availableFields={availableFields}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />
      {/* Your table/grid component */}
    </div>
  );
}
```

#### Example Input

```tsx
// Available fields configuration
const availableFields: FilterField[] = [
  {
    value: "name",
    label: "Name",
    type: "text",
    textConfig: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    value: "age",
    label: "Age",
    type: "number",
    numberConfig: {
      min: 0,
      max: 120,
      allowDecimal: false,
    },
  },
  {
    value: "status",
    label: "Status",
    type: "combobox",
    comboboxOptions: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

// Initial filters (optional)
const initialFilters: FilterConfig[] = [
  {
    field: "name",
    value: "John",
  },
  {
    field: "age",
    operator: "greater_than",
    value: 25,
  },
];
```

#### Expected Output

When users apply filters, the `onFilterChange` callback receives an array of `FilterConfig` objects:

```typescript
// Example output when user applies filters:
[
  {
    field: "name",
    value: "John"
  },
  {
    field: "age",
    operator: "greater_than",
    value: 25
  },
  {
    field: "status",
    value: "active"
  },
  {
    field: "is_verified",
    value: true
  },
  {
    field: "created_date",
    operator: "greater_equal",
    value: Date // JavaScript Date object
  }
]
```

#### TypeScript Interfaces

```typescript
interface FilterField {
  value: string;                    // Unique identifier for the field
  label: string;                    // Display label
  type: 'text' | 'number' | 'combobox' | 'boolean' | 'date';
  textConfig?: {
    minLength?: number;
    maxLength?: number;
  };
  numberConfig?: {
    min?: number;
    max?: number;
    allowDecimal?: boolean;
    decimalLength?: number;
  };
  comboboxOptions?: Array<{ label: string; value: string }>;
  booleanLabels?: {
    trueLabel?: string;
    falseLabel?: string;
  };
}

interface FilterConfig {
  field: string;                   // Field identifier
  operator?: string;               // For number/date: 'equals', 'not_equals', 'greater_than', 'less_than', 'greater_equal', 'less_equal'
  value: any;                      // Filter value (string, number, boolean, or Date)
}
```

#### Styling

The component uses Tailwind CSS and follows shadcn/ui design patterns. Make sure your project has Tailwind CSS configured with the following CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... other CSS variables */
}
```

See the component library's Tailwind config for the complete set of CSS variables.

## Development

### Build the library

```bash
npm run build
```

### Run Storybook

```bash
npm run storybook
```

### Run dev app

```bash
npm run dev:app
```

### Test before publishing

```bash
npm run test:build
npm run test:dev
```

## License

MIT
