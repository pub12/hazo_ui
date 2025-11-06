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
- **Clear All Button**: Quickly clear all filters at once
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

---

### MultiSortDialog

A powerful dialog component for multi-field sorting with drag-and-drop reordering. Allows users to select multiple fields for sorting, reorder them by priority, and set ascending/descending direction for each field.

![MultiSortDialog - Sort Button with Active Sorts Tooltip](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-button-tooltip.png)

![MultiSortDialog - Dialog with Multiple Sort Fields](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-dialog.png)

![MultiSortDialog - Drag and Drop Reordering](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-drag-drop.png)

![MultiSortDialog - Sort Output Example](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-output.png)

#### Features

- **Drag-and-Drop Reordering**: Intuitively reorder sort fields by dragging them
- **Multiple Sort Fields**: Add multiple fields to sort by with priority ordering
- **Direction Toggle**: Switch between ascending and descending for each field
- **Visual Feedback**: Drag handle with grip icon, opacity changes during drag
- **Clear All Button**: Quickly clear all sort fields at once
- **Tooltip Display**: Shows active sort configuration when hovering over the sort button
- **Keyboard Accessible**: Full keyboard navigation support for drag and drop
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Accessible**: Built with accessibility in mind using Radix UI primitives

#### How It Works

1. **Adding Sort Fields**: Click the "Add field" button to select from available fields
2. **Reordering**: Drag fields using the grip icon (⋮⋮) to change their priority
3. **Changing Direction**: Toggle the switch next to each field to change between ascending (A→Z, 0→9) and descending (Z→A, 9→0)
4. **Removing Fields**: Click the trash icon to remove a field from sorting
5. **Applying Sorts**: Click "Apply" to save the sort configuration
6. **Clearing All**: Click "Clear All" to remove all sort fields at once

The component returns an array of sort configurations in priority order, where the first item is the primary sort field, second is secondary, and so on.

#### Usage

```tsx
import { MultiSortDialog, type SortField, type SortConfig } from 'hazo_ui';
import { useState } from 'react';

function DataTable() {
  const [sorts, setSorts] = useState<SortConfig[]>([]);

  // Define available sort fields
  const availableFields: SortField[] = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: "age",
      label: "Age",
    },
    {
      value: "price",
      label: "Price",
    },
    {
      value: "status",
      label: "Status",
    },
    {
      value: "created_date",
      label: "Created Date",
    },
  ];

  // Handle sort changes
  const handleSortChange = (sortConfig: SortConfig[]) => {
    setSorts(sortConfig);
    // Apply sorts to your data
    console.log('Applied sorts:', sortConfig);
    // Sort your data based on the configuration
    // First item is primary sort, second is secondary, etc.
  };

  return (
    <div>
      <MultiSortDialog
        availableFields={availableFields}
        onSortChange={handleSortChange}
        initialSortFields={sorts}
      />
      {/* Your table/grid component */}
    </div>
  );
}
```

#### Example Input

```tsx
// Available sort fields configuration
const availableFields: SortField[] = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "price",
    label: "Price",
  },
  {
    value: "created_date",
    label: "Created Date",
  },
];

// Initial sort fields (optional)
const initialSortFields: SortConfig[] = [
  {
    field: "name",
    direction: "asc",
  },
  {
    field: "price",
    direction: "desc",
  },
];
```

#### Expected Output

When users apply sorts, the `onSortChange` callback receives an array of `SortConfig` objects in priority order:

```typescript
// Example output when user applies sorts:
[
  {
    field: "name",
    direction: "asc"      // Primary sort: Name ascending
  },
  {
    field: "price",
    direction: "desc"     // Secondary sort: Price descending
  },
  {
    field: "created_date",
    direction: "desc"     // Tertiary sort: Created Date descending
  }
]
```

**Important**: The order of the array matters! The first item is the primary sort field, the second is secondary, and so on. This allows for multi-level sorting (e.g., sort by name first, then by price for items with the same name).

#### TypeScript Interfaces

```typescript
interface SortField {
  value: string;          // Unique identifier for the field
  label: string;          // Display label
}

interface SortConfig {
  field: string;          // Field identifier
  direction: 'asc' | 'desc';  // Sort direction: 'asc' for ascending, 'desc' for descending
}
```

#### Implementing the Sort Logic

Here's an example of how to apply the sort configuration to your data:

```typescript
function applySorts(data: any[], sortConfigs: SortConfig[]): any[] {
  if (sortConfigs.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const sortConfig of sortConfigs) {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      let comparison = 0;
      
      // Handle different value types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = (aValue ?? 0) - (bValue ?? 0);
      }
      
      // Apply direction
      if (sortConfig.direction === 'desc') {
        comparison = -comparison;
      }
      
      // If values are different, return the comparison
      // Otherwise, continue to next sort field
      if (comparison !== 0) {
        return comparison;
      }
    }
    
    return 0; // All sort fields are equal
  });
}

// Usage
const sortedData = applySorts(originalData, sorts);
```

---

## Styling

Both components use Tailwind CSS and follow shadcn/ui design patterns. Make sure your project has Tailwind CSS configured with the following CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
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
