# hazo_ui

A set of UI components for common interaction elements in a SaaS app.

## Installation

```bash
npm install hazo_ui
```

## Quick Setup (Required)

hazo_ui uses Tailwind CSS and CSS variables for styling. Follow these two steps:

### Step 1: Import the CSS variables

Add to your app's entry point (e.g., `layout.tsx`, `_app.tsx`, or `main.tsx`):

```tsx
import 'hazo_ui/styles.css';
```

### Step 2: Configure Tailwind

Update your `tailwind.config.ts`:

```ts
import hazoUiPreset from 'hazo_ui/tailwind-preset';

export default {
  presets: [hazoUiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/hazo_ui/dist/**/*.js',  // Required: scan hazo_ui components
  ],
  // ... your other config
};
```

That's it! The components will now render correctly with proper styling.

> **Note**: If you already have shadcn/ui configured with CSS variables, you may skip Step 1 as the variables are compatible.

### Important: Tailwind v4 Compatibility

If you're using **Tailwind CSS v4**, you must add the `@source` directive to ensure hazo_ui's Tailwind classes are compiled:

**In your `globals.css` or main CSS file:**

```css
@import "tailwindcss";

/* REQUIRED for Tailwind v4: Enable scanning of hazo_ui components */
@source "../node_modules/hazo_ui/dist";
```

**Why is this needed?**

Tailwind v4 uses JIT compilation and only generates CSS for classes found in scanned files. By default, it doesn't scan `node_modules/`. Without the `@source` directive:
- Hover states won't work
- Colors will be missing
- Layouts may break

**Note:** Tailwind v3 users do NOT need this directive - the `content` configuration is sufficient.

---

## Components

### Component Overview

- **[HazoUiMultiFilterDialog](#hazouimultifilterdialog)** - A powerful dialog component for multi-field filtering with support for text, number, combobox, boolean, and date fields. Includes operator support, validation, and visual feedback.

- **[HazoUiMultiSortDialog](#hazouimultisortdialog)** - A flexible dialog component for multi-field sorting with drag-and-drop reordering. Allows users to set sort priority and direction (ascending/descending) for multiple fields.

- **[HazoUiFlexRadio](#hazouiflexradio)** - A flexible radio button/icon selection component with support for single and multi-selection modes, customizable layouts, and react-icons integration. Perfect for settings panels, preference selection, and option groups.

- **[HazoUiFlexInput](#hazouiflexinput)** - An enhanced input component with type validation, character restrictions, and error messaging. Supports numeric, alpha, email, and mixed input types with built-in validation and formatting guides.

- **[HazoUiRte](#hazouirte)** - A comprehensive rich text editor for email template generation with variable insertion support, file attachments, and full formatting controls. Built on Tiptap with support for tables, lists, images, and multiple view modes (HTML, Plain Text, Raw HTML).

- **[HazoUiTextbox](#hazouitextbox)** - A single-line input component with command pill support. Allows users to insert prefix-triggered commands (e.g., @mentions, /commands, #tags) that appear as interactive pills. Includes click-to-edit functionality for modifying or removing inserted commands.

- **[HazoUiTextarea](#hazouitextarea)** - A multi-line textarea component with command pill support. Similar to HazoUiTextbox but supports multi-line input with Shift+Enter for new lines and Cmd/Ctrl+Enter to submit. Features the same interactive pill editing capabilities.

- **[HazoUiDialog](#hazouidialog)** - A standardized dialog component with customizable animations, sizes, and theming. Features header/body/footer layout, color customization props, multiple size variants, and distinct animation presets (zoom, slide, fade).

---

## HazoUiMultiFilterDialog

A powerful, flexible dialog component for multi-field filtering with support for various input types. Perfect for table headers, grid views, or any interface where users need to apply multiple filters simultaneously.

![HazoUiMultiFilterDialog - Filter Button with Active Filters Tooltip](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-button-tooltip.png)

![HazoUiMultiFilterDialog - Dialog with Multiple Filters](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-dialog.png)

![HazoUiMultiFilterDialog - Calendar Date Picker](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-dialog-calendar.png)

![HazoUiMultiFilterDialog - Filter Output Example](https://github.com/pub12/hazo_ui/raw/main/docs/multifilterdialog/filter-output.png)

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
import { HazoUiMultiFilterDialog, type FilterField, type FilterConfig } from 'hazo_ui';
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
      <HazoUiMultiFilterDialog
        availableFields={availableFields}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        title="Filter Products"           // Optional: customize dialog title (default: "Filter")
        description="Filter by product attributes"  // Optional: customize description
      />
      {/* Your table/grid component */}
    </div>
  );
}
```

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `availableFields` | `FilterField[]` | Yes | - | Array of field definitions for filtering |
| `onFilterChange` | `(filters: FilterConfig[]) => void` | Yes | - | Callback when filters are applied |
| `initialFilters` | `FilterConfig[]` | No | `[]` | Initial filter configuration |
| `title` | `string` | No | `"Filter"` | Dialog title text |
| `description` | `string` | No | `"Add multiple fields to filter by..."` | Dialog description text |

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

## HazoUiMultiSortDialog

A powerful dialog component for multi-field sorting with drag-and-drop reordering. Allows users to select multiple fields for sorting, reorder them by priority, and set ascending/descending direction for each field.

![HazoUiMultiSortDialog - Sort Button with Active Sorts Tooltip](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-button-tooltip.png)

![HazoUiMultiSortDialog - Dialog with Multiple Sort Fields](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-dialog.png)

![HazoUiMultiSortDialog - Drag and Drop Reordering](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-drag-drop.png)

![HazoUiMultiSortDialog - Sort Output Example](https://github.com/pub12/hazo_ui/raw/main/docs/multisortdialog/sort-output.png)

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
import { HazoUiMultiSortDialog, type SortField, type SortConfig } from 'hazo_ui';
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
      <HazoUiMultiSortDialog
        availableFields={availableFields}
        onSortChange={handleSortChange}
        initialSortFields={sorts}
        title="Sort Products"           // Optional: customize dialog title (default: "Sort")
        description="Drag to reorder sort priority"  // Optional: customize description
      />
      {/* Your table/grid component */}
    </div>
  );
}
```

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `availableFields` | `SortField[]` | Yes | - | Array of field definitions for sorting |
| `onSortChange` | `(sorts: SortConfig[]) => void` | Yes | - | Callback when sorts are applied |
| `initialSortFields` | `SortConfig[]` | No | `[]` | Initial sort configuration |
| `title` | `string` | No | `"Sort"` | Dialog title text |
| `description` | `string` | No | `"Add multiple fields to sort by..."` | Dialog description text |

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

## HazoUiFlexRadio

A flexible radio button/icon selection component with support for single and multi-selection modes, customizable layouts, and react-icons integration. Perfect for settings panels, preference selection, and option groups.

#### Features

- **Single & Multi-Selection**: Support for both single selection (radio) and multi-selection (checkbox) modes
- **Layout Options**: Horizontal (default) or vertical arrangement of options
- **Style Variants**: Radio button style or icon-only button style
- **Icon Support**: Integration with react-icons library (supports fa, md, hi, bi, ai, bs, fi, io, ri, tb icon sets)
- **Label Control**: Option to show or hide labels
- **Tooltips**: Hover tooltips with 1-second delay showing option labels
- **Responsive Design**: Adaptive spacing and sizing for different screen sizes
- **Controlled Component**: Fully controlled component with value/onChange pattern
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Accessible**: Built with accessibility in mind using Radix UI primitives

#### Props

```typescript
interface HazoUiFlexRadioItem {
  label: string;                    // Display label for the option
  value: string;                    // Unique value identifier
  icon_selected?: string;           // Icon name when selected (e.g., "FaHome")
  icon_unselected?: string;         // Icon name when unselected (e.g., "FaRegHome")
}

interface HazoUiFlexRadioProps {
  layout?: 'horizontal' | 'vertical';  // Layout direction (default: 'horizontal')
  style?: 'radio' | 'icons';           // Display style (default: 'radio')
  display_label?: boolean;              // Show/hide labels (default: true)
  icon_set?: string;                    // Icon set package name (e.g., 'fa', 'md')
  data: HazoUiFlexRadioItem[];          // Array of options
  selection: 'single' | 'multi';       // Selection mode
  value: string | string[];             // Controlled value (string for single, array for multi)
  onChange: (value: string | string[]) => void;  // Change handler
  className?: string;                   // Additional CSS classes
}
```

#### Usage

**Basic Single Selection (Radio Style)**

```tsx
import { HazoUiFlexRadio, type HazoUiFlexRadioItem } from 'hazo_ui';
import { useState } from 'react';

function SettingsPanel() {
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const options: HazoUiFlexRadioItem[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];

  return (
    <HazoUiFlexRadio
      data={options}
      value={selectedOption}
      onChange={setSelectedOption}
      selection="single"
      layout="horizontal"
      style="radio"
      display_label={true}
    />
  );
}
```

**Icon Style with React Icons**

```tsx
import { HazoUiFlexRadio, type HazoUiFlexRadioItem } from 'hazo_ui';
import { useState } from 'react';

function IconSelector() {
  const [selectedIcon, setSelectedIcon] = useState<string>('home');

  const iconOptions: HazoUiFlexRadioItem[] = [
    {
      label: 'Home',
      value: 'home',
      icon_selected: 'FaHome',
      icon_unselected: 'FaRegHome',
    },
    {
      label: 'User',
      value: 'user',
      icon_selected: 'FaUser',
      icon_unselected: 'FaRegUser',
    },
    {
      label: 'Settings',
      value: 'settings',
      icon_selected: 'FaCog',
      icon_unselected: 'FaRegCog',
    },
  ];

  return (
    <HazoUiFlexRadio
      data={iconOptions}
      value={selectedIcon}
      onChange={setSelectedIcon}
      selection="single"
      layout="horizontal"
      style="icons"
      display_label={true}
      icon_set="fa"  // FontAwesome icons
    />
  );
}
```

**Multi-Selection Mode**

```tsx
import { HazoUiFlexRadio, type HazoUiFlexRadioItem } from 'hazo_ui';
import { useState } from 'react';

function MultiSelectExample() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['option1', 'option3']);

  const options: HazoUiFlexRadioItem[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];

  return (
    <HazoUiFlexRadio
      data={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
      selection="multi"
      layout="horizontal"
      style="radio"
      display_label={true}
    />
  );
}
```

**Vertical Layout with Icons Only (No Labels)**

```tsx
import { HazoUiFlexRadio, type HazoUiFlexRadioItem } from 'hazo_ui';
import { useState } from 'react';

function VerticalIconSelector() {
  const [selected, setSelected] = useState<string>('favorite');

  const options: HazoUiFlexRadioItem[] = [
    {
      label: 'Favorite',
      value: 'favorite',
      icon_selected: 'MdFavorite',
      icon_unselected: 'MdFavoriteBorder',
    },
    {
      label: 'Star',
      value: 'star',
      icon_selected: 'MdStar',
      icon_unselected: 'MdStarBorder',
    },
  ];

  return (
    <HazoUiFlexRadio
      data={options}
      value={selected}
      onChange={setSelected}
      selection="single"
      layout="vertical"
      style="icons"
      display_label={false}  // Hide labels, show only icons
      icon_set="md"  // Material Design icons
    />
  );
}
```

#### Supported Icon Sets

The component supports the following react-icons packages:

- `fa` - FontAwesome (react-icons/fa)
- `md` - Material Design (react-icons/md)
- `hi` - Heroicons (react-icons/hi)
- `bi` - Bootstrap Icons (react-icons/bi)
- `ai` - Ant Design Icons (react-icons/ai)
- `bs` - Bootstrap Icons (react-icons/bs)
- `fi` - Feather Icons (react-icons/fi)
- `io` / `io5` - Ionicons (react-icons/io5)
- `ri` - Remix Icon (react-icons/ri)
- `tb` - Tabler Icons (react-icons/tb)

#### Expected Output

**Single Selection Mode:**
```typescript
// onChange receives a string value
'onChange' => (value: string) => {
  // value will be the selected option's value, e.g., "option1"
}
```

**Multi-Selection Mode:**
```typescript
// onChange receives an array of string values
'onChange' => (value: string[]) => {
  // value will be an array of selected values, e.g., ["option1", "option3"]
}
```

---

## HazoUiFlexInput

An enhanced input component with type validation, character restrictions, and error messaging. Extends shadcn Input component with additional validation props for numeric, alpha, email, and mixed input types.

#### Features

- **Multiple Input Types**: Supports mixed (text), numeric, alpha (letters only), and email input types
- **Real-time Character Filtering**: Automatically prevents invalid characters from being entered (e.g., numbers in alpha fields)
- **Validation on Blur**: Validates input when the field loses focus and displays error messages
- **Numeric Constraints**: Min/max value validation and decimal precision control
- **Length Constraints**: Configurable minimum and maximum character lengths
- **Regex Validation**: Custom regex pattern support for complex validation rules
- **Format Guide**: Optional helper text displayed below the input
- **Error Messaging**: Clear error messages displayed when validation fails
- **Controlled & Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Accessible**: Built with accessibility in mind using shadcn/ui components

#### Input Types

1. **Mixed (text)**
   - Allows any characters
   - Supports length constraints (min/max)
   - Supports regex validation

2. **Numeric**
   - Only allows numbers, decimal point, and minus sign
   - Supports min/max value constraints
   - Configurable decimal precision (including integers with 0 decimals)
   - Automatically filters out non-numeric characters

3. **Alpha**
   - Only allows letters and spaces
   - Automatically filters out numbers and special characters
   - Supports length constraints

4. **Email**
   - Validates email format on blur
   - Uses standard email regex pattern

#### Props

```typescript
interface HazoUiFlexInputProps extends Omit<InputProps, "type"> {
  input_type?: "mixed" | "numeric" | "email" | "alpha";  // Input type (default: "mixed")
  text_len_min?: number;                                  // Minimum character length
  text_len_max?: number;                                  // Maximum character length
  num_min?: number;                                       // Minimum numeric value
  num_max?: number;                                       // Maximum numeric value
  regex?: string | RegExp;                                // Custom regex pattern
  num_decimals?: number;                                  // Number of decimal places allowed
  format_guide?: string;                                  // Helper text displayed below input
  format_guide_info?: boolean;                            // Show format guide (default: false)
}
```

#### Usage

**Basic Mixed Input**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function BasicForm() {
  const [value, setValue] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="mixed"
      placeholder="Enter text..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Numeric Input with Constraints**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function PriceInput() {
  const [price, setPrice] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="numeric"
      placeholder="Enter price (0-100)..."
      num_min={0}
      num_max={100}
      num_decimals={2}
      format_guide="Enter a number between 0 and 100 with up to 2 decimal places"
      format_guide_info={true}
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  );
}
```

**Integer Input (No Decimals)**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function AgeInput() {
  const [age, setAge] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="numeric"
      placeholder="Enter age (1-120)..."
      num_min={1}
      num_max={120}
      num_decimals={0}
      format_guide="Enter a whole number between 1 and 120"
      format_guide_info={true}
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  );
}
```

**Alpha Input (Letters Only)**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="alpha"
      placeholder="Enter name (letters only)..."
      format_guide="Only letters and spaces are allowed"
      format_guide_info={true}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

**Email Input with Validation**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="email"
      placeholder="Enter email address..."
      format_guide="Enter a valid email address (e.g., user@example.com)"
      format_guide_info={true}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
```

**Mixed Input with Length Constraints**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function UsernameInput() {
  const [username, setUsername] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="mixed"
      placeholder="Enter username (5-20 characters)..."
      text_len_min={5}
      text_len_max={20}
      format_guide="Must be between 5 and 20 characters"
      format_guide_info={true}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
}
```

**Input with Regex Validation**

```tsx
import { HazoUiFlexInput } from 'hazo_ui';
import { useState } from 'react';

function PhoneInput() {
  const [phone, setPhone] = useState<string>("");

  return (
    <HazoUiFlexInput
      input_type="mixed"
      placeholder="Enter phone number (XXX-XXX-XXXX)..."
      regex={/^\d{3}-\d{3}-\d{4}$/}
      format_guide="Format: XXX-XXX-XXXX (e.g., 123-456-7890)"
      format_guide_info={true}
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  );
}
```

#### Validation Behavior

- **Character Filtering**: For `numeric` and `alpha` types, invalid characters are automatically filtered out as the user types
- **Validation Timing**: Validation occurs when the input loses focus (onBlur event)
- **Error Display**: Error messages appear below the input in red text when validation fails
- **Format Guide**: Optional helper text can be displayed below the input (set `format_guide_info={true}`)
- **Error Priority**: If both an error message and format guide are present, only the error message is shown

#### Expected Output

The component behaves like a standard input element:

```typescript
// onChange receives a standard React.ChangeEvent<HTMLInputElement>
onChange={(e) => {
  const value = e.target.value;  // Current input value as string
  // Handle value change
}}
```

#### Error Messages

The component provides default error messages for common validation failures:

- **Numeric**: "Must be a valid number", "Must be at least X", "Must be at most X", "Maximum X decimal places allowed"
- **Alpha**: "Only letters are allowed"
- **Email**: "Must be a valid email address"
- **Mixed**: "Must be at least X characters", "Must be at most X characters"
- **Regex**: "Invalid format" (or custom message via `format_guide`)

---

## HazoUiRte

A comprehensive rich text editor component designed for email template generation. Features variable insertion for dynamic content, file attachments, and a full-featured formatting toolbar. Built on [Tiptap](https://tiptap.dev/), a headless editor framework.

#### Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough, subscript, superscript
- **Block Types**: Paragraphs, headings (H1-H3), bullet lists, numbered lists, checklists, blockquotes, code blocks
- **Font Controls**: Font family selection, font size adjustment (8-72px)
- **Text Alignment**: Left, center, right, justify
- **Colors**: Text color and highlight/background color with color picker
- **Links**: Insert and edit hyperlinks
- **Images**: Insert images (supports base64 and URLs)
- **Tables**: Insert tables with custom size, add/remove rows and columns
- **Horizontal Rules**: Insert dividers
- **Variable Insertion**: Insert template variables (e.g., `{{first_name}}`) for email personalization
- **File Attachments**: Attach files stored as base64-encoded data
- **View Modes**: Switch between HTML editor, Plain Text view, and Raw HTML view
- **Undo/Redo**: Full history support
- **Indent/Outdent**: Control list indentation

> **Note**: HazoUiRte includes Tiptap and ~17 extension packages. This may impact your bundle size if you're not already using Tiptap in your project.

#### Type Definitions

```typescript
interface HazoUiRteProps {
  // Initial HTML content
  html?: string;

  // Initial plain text (typically not used directly)
  plain_text?: string;

  // Initial file attachments
  attachments?: RteAttachment[];

  // Template variables available for insertion
  variables?: RteVariable[];

  // Callback fired when content changes (debounced 300ms)
  on_change?: (output: RteOutput) => void;

  // Placeholder text when editor is empty
  placeholder?: string;  // default: "Start typing..."

  // Editor height constraints
  min_height?: string;   // default: "200px"
  max_height?: string;   // default: "400px"

  // Disable editing
  disabled?: boolean;    // default: false

  // Additional CSS classes
  className?: string;

  // Show view mode tabs (HTML, Plain Text, Raw HTML)
  show_output_viewer?: boolean;  // default: false
}

interface RteAttachment {
  filename: string;      // e.g., "document.pdf"
  mime_type: string;     // e.g., "application/pdf"
  data: string;          // base64 encoded content
}

interface RteVariable {
  name: string;          // Variable name (e.g., "first_name")
  description: string;   // Description shown in dropdown
}

interface RteOutput {
  html: string;          // HTML content
  plain_text: string;    // Plain text content (tags stripped)
  attachments: RteAttachment[];  // Current attachments
}
```

#### Basic Usage

```tsx
import { HazoUiRte, type RteOutput } from 'hazo_ui';
import { useState } from 'react';

function BasicEditor() {
  const [content, setContent] = useState<RteOutput | null>(null);

  return (
    <HazoUiRte
      placeholder="Start typing your content..."
      min_height="200px"
      max_height="400px"
      on_change={(output) => setContent(output)}
    />
  );
}
```

#### Email Template with Variables

```tsx
import { HazoUiRte, type RteOutput, type RteVariable } from 'hazo_ui';
import { useState } from 'react';

function EmailTemplateEditor() {
  const [content, setContent] = useState<RteOutput | null>(null);

  // Define available template variables
  const variables: RteVariable[] = [
    { name: "first_name", description: "Recipient's first name" },
    { name: "last_name", description: "Recipient's last name" },
    { name: "email", description: "Recipient's email address" },
    { name: "company_name", description: "Company name" },
    { name: "order_id", description: "Order ID number" },
    { name: "order_date", description: "Date of order" },
    { name: "total_amount", description: "Total order amount" },
  ];

  // Initial template HTML
  const initialHtml = `
    <h2>Order Confirmation</h2>
    <p>Dear <span data-variable="first_name">{{first_name}}</span>,</p>
    <p>Thank you for your order!</p>
    <p>Order ID: <span data-variable="order_id">{{order_id}}</span></p>
    <p>Total: <span data-variable="total_amount">{{total_amount}}</span></p>
  `;

  return (
    <HazoUiRte
      html={initialHtml}
      variables={variables}
      placeholder="Compose your email template..."
      show_output_viewer={true}
      on_change={(output) => {
        setContent(output);
        console.log('HTML:', output.html);
        console.log('Plain text:', output.plain_text);
      }}
    />
  );
}
```

#### With File Attachments

```tsx
import { HazoUiRte, type RteOutput, type RteAttachment } from 'hazo_ui';
import { useState } from 'react';

function EditorWithAttachments() {
  const [content, setContent] = useState<RteOutput | null>(null);

  // Pre-loaded attachments (if any)
  const initialAttachments: RteAttachment[] = [
    {
      filename: "terms.pdf",
      mime_type: "application/pdf",
      data: "JVBERi0xLjQK...", // base64 encoded PDF
    },
  ];

  return (
    <HazoUiRte
      html="<p>Please see the attached document.</p>"
      attachments={initialAttachments}
      on_change={(output) => {
        setContent(output);
        // Access attachments from output
        console.log('Attachments:', output.attachments);
      }}
    />
  );
}
```

#### With Output Viewer Tabs

The `show_output_viewer` prop enables tabs to switch between different views:

- **HTML**: The rich text editor (default, editable)
- **Plain Text**: Plain text version with HTML tags stripped (view-only)
- **Raw HTML**: Formatted HTML source code (view-only)

```tsx
import { HazoUiRte } from 'hazo_ui';

function EditorWithViewer() {
  return (
    <HazoUiRte
      html="<p>Hello <strong>World</strong>!</p>"
      show_output_viewer={true}
      min_height="300px"
    />
  );
}
```

When viewing Plain Text or Raw HTML tabs, the toolbar is disabled (grayed out) since those are view-only modes.

#### Disabled State

```tsx
import { HazoUiRte } from 'hazo_ui';

function ReadOnlyEditor() {
  return (
    <HazoUiRte
      html="<p>This content cannot be edited.</p>"
      disabled={true}
    />
  );
}
```

#### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | `""` | Initial HTML content |
| `plain_text` | `string` | - | Initial plain text (rarely used) |
| `attachments` | `RteAttachment[]` | `[]` | Initial file attachments |
| `variables` | `RteVariable[]` | `[]` | Template variables for insertion |
| `on_change` | `(output: RteOutput) => void` | - | Callback when content changes (debounced 300ms) |
| `placeholder` | `string` | `"Start typing..."` | Placeholder text |
| `min_height` | `string` | `"200px"` | Minimum editor height |
| `max_height` | `string` | `"400px"` | Maximum editor height |
| `disabled` | `boolean` | `false` | Disable editing |
| `className` | `string` | - | Additional CSS classes |
| `show_output_viewer` | `boolean` | `false` | Show HTML/Plain Text/Raw HTML tabs |

#### Toolbar Controls

The toolbar includes the following controls (left to right):

1. **Undo/Redo** - History navigation
2. **Block Type** - Paragraph, Headings, Lists, Code, Quote
3. **Font Family** - Arial, Verdana, Times New Roman, Georgia, Courier New, Trebuchet MS
4. **Font Size** - Decrease/Increase (8-72px)
5. **Text Formatting** - Bold, Italic, Underline, Strikethrough, Subscript, Superscript
6. **Link** - Insert/edit hyperlinks
7. **Clear Formatting** - Remove all formatting
8. **Text Color** - Color picker for text
9. **Highlight Color** - Color picker for background
10. **Text Alignment** - Left, Center, Right, Justify
11. **Lists** - Bullet list, Numbered list, Checklist
12. **Indent/Outdent** - Adjust list indentation
13. **Horizontal Rule** - Insert divider
14. **Image** - Insert image
15. **Table** - Insert table with size picker, add/remove rows/columns
16. **Variables** - Insert template variables (if `variables` prop provided)
17. **Attachment** - Attach files

---

## HazoUiTextbox

A single-line text input component with prefix-triggered command pill support. Perfect for mention systems, command inputs, tag fields, and any input that needs to convert text patterns into interactive elements.

#### Features

- **Command Pills**: Convert prefix-triggered text (e.g., @mention, /command, #tag) into interactive pills
- **Click to Edit**: Click any pill to open an edit popover with options to change or remove the command
- **Keyboard Navigation**: Navigate edit options with Arrow Up/Down, select with Enter, close with Escape
- **Multiple Prefixes**: Support multiple prefix types simultaneously (e.g., @ for users, # for tags, / for commands)
- **Visual Variants**: Three pill styles - default (blue), outline (transparent), subtle (muted)
- **Auto-complete Dropdown**: Searchable dropdown appears when typing a prefix character
- **Controlled & Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Single-line Input**: Press Enter to submit (triggers `on_submit` callback)
- **TypeScript Support**: Fully typed with comprehensive interfaces

#### Type Definitions

```typescript
interface HazoUiTextboxProps {
  // Controlled value (plain text with prefix+action format, e.g., "Hello @john_doe!")
  value?: string;

  // Uncontrolled default value
  default_value?: string;

  // Prefix configurations (required)
  prefixes: PrefixConfig[];

  // Input properties
  placeholder?: string;  // default: "Type here..."
  disabled?: boolean;    // default: false
  className?: string;

  // Pill styling
  pill_variant?: "default" | "outline" | "subtle";  // default: "default"

  // Unique instance ID to prevent TipTap plugin key conflicts
  // Required when multiple instances coexist (e.g., in lists)
  // If not provided, auto-generated via React.useId()
  instance_id?: string;

  // Callbacks
  on_change?: (output: CommandTextOutput) => void;
  on_submit?: (output: CommandTextOutput) => void;  // Triggered on Enter key
  on_command_insert?: (command: CommandItem, prefix: string) => void;
  on_command_change?: (old_command: InsertedCommand, new_command: CommandItem) => void;
  on_command_remove?: (command: InsertedCommand) => void;
}

interface PrefixConfig {
  char: string;          // Prefix character (e.g., "@", "/", "#")
  commands: CommandItem[];  // Available commands for this prefix
}

interface CommandItem {
  action: string;           // Unique action identifier (e.g., "john_doe")
  action_label: string;     // Display label (e.g., "John Doe")
  action_description?: string;  // Optional description shown in dropdown
  icon?: React.ReactNode;   // Optional icon
}

interface CommandTextOutput {
  plain_text: string;       // Plain text with prefix+action (e.g., "Hello @john_doe!")
  display_text: string;     // Display text with labels (e.g., "Hello @John Doe!")
  commands: InsertedCommand[];  // Array of inserted commands with positions
}

interface InsertedCommand {
  id: string;               // Unique ID for this instance
  prefix: string;           // The prefix character
  action: string;           // The action identifier
  action_label: string;     // The display label
  position: number;         // Character position in plain_text
  length: number;           // Length of the command in plain_text
}
```

#### Basic Usage

```tsx
import { HazoUiTextbox, type PrefixConfig, type CommandTextOutput } from 'hazo_ui';
import { useState } from 'react';

function MentionInput() {
  const [value, setValue] = useState<string>("");

  // Define available mentions
  const prefixes: PrefixConfig[] = [
    {
      char: "@",
      commands: [
        { action: "john_doe", action_label: "John Doe" },
        { action: "jane_smith", action_label: "Jane Smith" },
        { action: "bob_wilson", action_label: "Bob Wilson" },
      ],
    },
  ];

  const handleChange = (output: CommandTextOutput) => {
    setValue(output.plain_text);
    console.log('Plain text:', output.plain_text);
    console.log('Display text:', output.display_text);
    console.log('Commands:', output.commands);
  };

  return (
    <HazoUiTextbox
      value={value}
      prefixes={prefixes}
      placeholder="Type @ to mention someone..."
      on_change={handleChange}
    />
  );
}
```

#### Multiple Prefix Types

```tsx
import { HazoUiTextbox, type PrefixConfig } from 'hazo_ui';

function MultiPrefixInput() {
  const prefixes: PrefixConfig[] = [
    {
      char: "@",
      commands: [
        { action: "john", action_label: "John Doe", action_description: "Software Engineer" },
        { action: "jane", action_label: "Jane Smith", action_description: "Product Manager" },
      ],
    },
    {
      char: "#",
      commands: [
        { action: "bug", action_label: "Bug", action_description: "Something is broken" },
        { action: "feature", action_label: "Feature", action_description: "New functionality" },
        { action: "docs", action_label: "Documentation", action_description: "Documentation update" },
      ],
    },
    {
      char: "/",
      commands: [
        { action: "assign", action_label: "Assign", action_description: "Assign to user" },
        { action: "close", action_label: "Close", action_description: "Close this issue" },
        { action: "archive", action_label: "Archive", action_description: "Archive this item" },
      ],
    },
  ];

  return (
    <HazoUiTextbox
      prefixes={prefixes}
      placeholder="Type @, #, or / for commands..."
      on_change={(output) => console.log(output)}
    />
  );
}
```

#### With Command Callbacks

```tsx
import { HazoUiTextbox, type CommandItem, type InsertedCommand } from 'hazo_ui';

function CommandInput() {
  const prefixes = [
    {
      char: "@",
      commands: [
        { action: "alice", action_label: "Alice Johnson" },
        { action: "bob", action_label: "Bob Smith" },
      ],
    },
  ];

  const handleInsert = (command: CommandItem, prefix: string) => {
    console.log(`Inserted ${prefix}${command.action_label}`);
    // Track analytics, send notifications, etc.
  };

  const handleChange = (old_command: InsertedCommand, new_command: CommandItem) => {
    console.log(`Changed from ${old_command.action} to ${new_command.action}`);
    // Update references, notify backend, etc.
  };

  const handleRemove = (command: InsertedCommand) => {
    console.log(`Removed ${command.prefix}${command.action_label}`);
    // Clean up references, update state, etc.
  };

  return (
    <HazoUiTextbox
      prefixes={prefixes}
      placeholder="Mention someone..."
      on_command_insert={handleInsert}
      on_command_change={handleChange}
      on_command_remove={handleRemove}
      on_submit={(output) => console.log('Submitted:', output)}
    />
  );
}
```

#### Pill Variants

```tsx
import { HazoUiTextbox } from 'hazo_ui';

function VariantExample() {
  const prefixes = [
    {
      char: "@",
      commands: [{ action: "user", action_label: "Username" }],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Default: Blue background */}
      <HazoUiTextbox
        prefixes={prefixes}
        pill_variant="default"
        placeholder="Default variant (blue)..."
      />

      {/* Outline: Transparent with border */}
      <HazoUiTextbox
        prefixes={prefixes}
        pill_variant="outline"
        placeholder="Outline variant (transparent)..."
      />

      {/* Subtle: Muted background */}
      <HazoUiTextbox
        prefixes={prefixes}
        pill_variant="subtle"
        placeholder="Subtle variant (muted)..."
      />
    </div>
  );
}
```

#### Edit Popover Behavior

When a user clicks on an inserted command pill:

1. **Edit Popover Opens**: A dropdown appears below the clicked pill
2. **Command Options**: Shows all available commands for that prefix
3. **Current Selection**: The current command is highlighted with "current" label
4. **Change Command**: Click any command to change to that option (triggers `on_command_change`)
5. **Remove Command**: Click "Remove" at the bottom to delete the pill (triggers `on_command_remove`)
6. **Keyboard Navigation**:
   - Arrow Up/Down: Navigate options
   - Enter: Select highlighted option
   - Escape: Close popover without changes
7. **Click Outside**: Click anywhere outside the popover to close without changes

#### Expected Output

```typescript
// Example input: "Hello @john_doe and #feature request"
// With prefixes: @ for users, # for tags

const output: CommandTextOutput = {
  plain_text: "Hello @john_doe and #feature request",
  display_text: "Hello @John Doe and #Feature request",
  commands: [
    {
      id: "cmd_abc123",
      prefix: "@",
      action: "john_doe",
      action_label: "John Doe",
      position: 6,   // Character position of "@" in plain_text
      length: 9,     // Length of "@john_doe"
    },
    {
      id: "cmd_def456",
      prefix: "#",
      action: "feature",
      action_label: "Feature",
      position: 20,  // Character position of "#" in plain_text
      length: 8,     // Length of "#feature"
    },
  ],
};
```

---

## HazoUiTextarea

A multi-line text input component with prefix-triggered command pill support. Similar to HazoUiTextbox but supports multiple paragraphs and line breaks.

#### Features

- **All HazoUiTextbox Features**: Inherits all command pill functionality
- **Multi-line Support**: Supports multiple paragraphs with line breaks
- **Shift+Enter**: Create new lines within the textarea
- **Cmd/Ctrl+Enter to Submit**: Submit with keyboard shortcut (triggers `on_submit` callback)
- **Configurable Height**: Set min/max height or use rows prop
- **Click to Edit Pills**: Same interactive pill editing as HazoUiTextbox
- **Auto-scrolling**: Scrollable content when exceeding max height

#### Type Definitions

```typescript
interface HazoUiTextareaProps {
  // Same as HazoUiTextbox plus:
  value?: string;
  default_value?: string;
  prefixes: PrefixConfig[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  pill_variant?: "default" | "outline" | "subtle";

  // Unique instance ID to prevent TipTap plugin key conflicts
  // Required when multiple instances coexist (e.g., in lists)
  // If not provided, auto-generated via React.useId()
  instance_id?: string;

  on_change?: (output: CommandTextOutput) => void;
  on_submit?: (output: CommandTextOutput) => void;  // Triggered on Cmd/Ctrl+Enter
  on_command_insert?: (command: CommandItem, prefix: string) => void;
  on_command_change?: (old_command: InsertedCommand, new_command: CommandItem) => void;
  on_command_remove?: (command: InsertedCommand) => void;

  // Textarea-specific properties
  min_height?: string;   // default: "80px"
  max_height?: string;   // default: "200px"
  rows?: number;         // Alternative to min_height (calculates as rows * 1.5em)
}
```

#### Basic Usage

```tsx
import { HazoUiTextarea, type PrefixConfig } from 'hazo_ui';
import { useState } from 'react';

function CommentBox() {
  const [value, setValue] = useState<string>("");

  const prefixes: PrefixConfig[] = [
    {
      char: "@",
      commands: [
        { action: "alice", action_label: "Alice Johnson" },
        { action: "bob", action_label: "Bob Smith" },
      ],
    },
    {
      char: "#",
      commands: [
        { action: "bug", action_label: "Bug" },
        { action: "feature", action_label: "Feature Request" },
      ],
    },
  ];

  return (
    <HazoUiTextarea
      value={value}
      prefixes={prefixes}
      placeholder="Write a comment... (Cmd+Enter to submit)"
      min_height="100px"
      max_height="300px"
      on_change={(output) => setValue(output.plain_text)}
      on_submit={(output) => {
        console.log('Submitting:', output);
        // Submit comment to backend
        setValue(""); // Clear after submit
      }}
    />
  );
}
```

#### With Custom Height

```tsx
import { HazoUiTextarea } from 'hazo_ui';

function CustomHeightExample() {
  const prefixes = [
    { char: "@", commands: [{ action: "user", action_label: "User" }] },
  ];

  return (
    <div className="space-y-4">
      {/* Using rows */}
      <HazoUiTextarea
        prefixes={prefixes}
        rows={3}
        placeholder="3 rows tall..."
      />

      {/* Using min/max height */}
      <HazoUiTextarea
        prefixes={prefixes}
        min_height="120px"
        max_height="400px"
        placeholder="Custom height..."
      />
    </div>
  );
}
```

#### Keyboard Shortcuts

- **Enter**: Insert a new line (Shift+Enter also works)
- **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows/Linux): Submit (triggers `on_submit`)
- **Arrow Up/Down**: Navigate command suggestions or edit options
- **Escape**: Close popover/dropdown
- **Typing `@`, `#`, `/`** (or any configured prefix): Open command dropdown

#### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value (plain text with commands) |
| `default_value` | `string` | - | Uncontrolled default value |
| `prefixes` | `PrefixConfig[]` | **Required** | Prefix configurations |
| `placeholder` | `string` | `"Type here..."` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `className` | `string` | - | Additional CSS classes |
| `pill_variant` | `"default" \| "outline" \| "subtle"` | `"default"` | Pill styling variant |
| `instance_id` | `string` | auto-generated | Unique ID to prevent TipTap plugin conflicts when multiple instances coexist |
| `min_height` | `string` | `"80px"` | Minimum textarea height |
| `max_height` | `string` | `"200px"` | Maximum textarea height |
| `rows` | `number` | - | Number of rows (overrides min_height) |
| `on_change` | `(output: CommandTextOutput) => void` | - | Called when content changes |
| `on_submit` | `(output: CommandTextOutput) => void` | - | Called on Cmd/Ctrl+Enter |
| `on_command_insert` | `(command, prefix) => void` | - | Called when command is inserted |
| `on_command_change` | `(old, new) => void` | - | Called when command is changed via edit popover |
| `on_command_remove` | `(command) => void` | - | Called when command is removed via edit popover |

---

## HazoUiDialog

A flexible, standardized dialog component with customizable animations, sizes, and theming. Built on Radix UI Dialog primitives with a consistent header/body/footer layout.

#### Features

- **Flexible Sizing**: 5 size presets from small (400px) to full-width (98vw), plus custom sizing
- **9 Animation Presets**: Zoom, slide (bottom/top/left/right), fade, bounce, scale-up, and flip animations
- **Header Bar Option**: Full-width colored header bar for modern modal designs
- **Color Customization**: Override header, body, footer, border, and accent colors via props
- **Themed Variants**: Pre-built themes for success, warning, danger, and info states
- **Responsive Design**: Viewport-relative sizing with maximum constraints
- **Controlled Component**: Fully controlled open/close state
- **Callback Support**: Separate callbacks for confirm and cancel actions
- **TypeScript Support**: Fully typed with comprehensive interfaces
- **Accessible**: Built with accessibility in mind using Radix UI primitives

#### Type Definitions

```typescript
interface HazoUiDialogProps {
  // Dialog State Control
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Content & Callbacks
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;

  // Header Configuration
  title?: string;                      // default: "Action required"
  description?: string;

  // Button Configuration
  actionButtonText?: string;           // default: "Confirm"
  actionButtonVariant?: ButtonVariant; // default: "default"
  cancelButtonText?: string;           // default: "Cancel"
  showCancelButton?: boolean;          // default: true

  // Action Button Enhancement
  actionButtonLoading?: boolean;       // default: false - Shows spinner, disables button
  actionButtonDisabled?: boolean;      // default: false - Disables action button
  actionButtonIcon?: React.ReactNode;  // Icon before button text (replaced by spinner when loading)

  // Custom Footer
  footerContent?: React.ReactNode;     // Custom footer content (replaces default buttons)

  // Size Configuration
  sizeWidth?: string;                  // default: "min(90vw, 600px)"
  sizeHeight?: string;                 // default: "min(80vh, 800px)"

  // Animation Configuration
  openAnimation?: AnimationPreset | string;  // default: "zoom"
  closeAnimation?: AnimationPreset | string; // default: "zoom"

  // Color Customization
  headerBackgroundColor?: string;
  headerTextColor?: string;
  bodyBackgroundColor?: string;
  footerBackgroundColor?: string;
  borderColor?: string;
  accentColor?: string;

  // Header Bar (full-width colored bar)
  headerBar?: boolean;                 // default: false - Enable full-width colored header bar
  headerBarColor?: string;             // default: "#1e293b" - Color for the header bar

  // Styling Customization
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;           // default: true
}

type AnimationPreset = 'zoom' | 'slide' | 'fade' | 'bounce' | 'scale-up' | 'flip' | 'slide-left' | 'slide-right' | 'slide-top' | 'none';
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
```

#### Basic Usage

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { useState } from 'react';

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>

      <HazoUiDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        onConfirm={() => {
          console.log('Confirmed');
          setIsOpen(false);
        }}
        onCancel={() => {
          console.log('Cancelled');
        }}
      >
        <p>This action cannot be undone.</p>
      </HazoUiDialog>
    </>
  );
}
```

#### Action Button States and Custom Footers

The dialog supports enhanced action buttons with loading states, icons, and fully custom footers for complex UX scenarios.

##### 1. Form Dialog with Loading State

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { useState } from 'react';

function SaveFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveFormData();
      setIsOpen(false);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <HazoUiDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Save Changes"
      description="Your changes will be saved to the server."
      actionButtonText={isSaving ? "Saving..." : "Save"}
      actionButtonLoading={isSaving}
      onConfirm={handleSave}
    >
      <p>Click Save to see the loading spinner and disabled button.</p>
    </HazoUiDialog>
  );
}
```

##### 2. Confirmation Dialog with Icon

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { Send } from 'lucide-react';
import { useState } from 'react';

function SendEmailDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HazoUiDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Send Email"
      description="This will send the email to all recipients."
      actionButtonText="Send Email"
      actionButtonIcon={<Send className="h-4 w-4" />}
      onConfirm={() => {
        sendEmail();
        setIsOpen(false);
      }}
    >
      <p>The Send icon appears before the button text.</p>
    </HazoUiDialog>
  );
}
```

##### 3. Destructive Action with Loading

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { Lock } from 'lucide-react';
import { useState } from 'react';

function CloseAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = async () => {
    setIsClosing(true);
    try {
      await closeAccount();
      setIsOpen(false);
    } catch (error) {
      console.error('Close failed:', error);
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <HazoUiDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Close Account"
      description="This will permanently close your account."
      actionButtonText={isClosing ? "Closing..." : "Close"}
      actionButtonIcon={<Lock className="h-4 w-4" />}
      actionButtonLoading={isClosing}
      onConfirm={handleClose}
    >
      <p>Lock icon is replaced by spinner when loading.</p>
    </HazoUiDialog>
  );
}
```

##### 4. Complex Footer with Stats

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { useState } from 'react';

function ReviewItemsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ keep: 0, accept: 0, skip: 0 });

  return (
    <HazoUiDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Review Items"
      description="Review and process the items below."
      footerContent={
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            Keep: {stats.keep} | Accept: {stats.accept} | Skip: {stats.skip}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStats({ ...stats, skip: stats.skip + 1 })}
              className="px-3 py-1.5 text-sm border rounded-md hover:bg-muted"
            >
              Skip
            </button>
            <button
              onClick={() => setStats({ ...stats, keep: stats.keep + 1 })}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md"
            >
              Keep
            </button>
            <button
              onClick={() => {
                setStats({ ...stats, accept: stats.accept + 1 });
                setIsOpen(false);
              }}
              className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md"
            >
              Accept
            </button>
          </div>
        </div>
      }
    >
      <p>Custom footer shows stats and multiple action buttons.</p>
    </HazoUiDialog>
  );
}
```

##### 5. Progress Dialog with No Footer

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { useState, useEffect } from 'react';

function ProgressDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsOpen(false), 500);
            return 100;
          }
          return next;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <HazoUiDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Processing..."
      description="Please wait while we process your request."
      showCloseButton={false}
      footerContent={<div />}
    >
      <div className="space-y-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-center">{progress}% complete</p>
      </div>
    </HazoUiDialog>
  );
}
```

#### Size Variants

```tsx
// Small - 400px
<HazoUiDialog
  sizeWidth="min(90vw, 400px)"
  sizeHeight="min(70vh, 300px)"
  {...props}
/>

// Medium (default) - 600px
<HazoUiDialog
  sizeWidth="min(90vw, 600px)"
  sizeHeight="min(80vh, 600px)"
  {...props}
/>

// Large - 1000px
<HazoUiDialog
  sizeWidth="min(95vw, 1000px)"
  sizeHeight="min(85vh, 800px)"
  {...props}
/>

// Extra-Large - 1400px
<HazoUiDialog
  sizeWidth="min(95vw, 1400px)"
  sizeHeight="min(90vh, 900px)"
  {...props}
/>

// Full Width - 98vw
<HazoUiDialog
  sizeWidth="98vw"
  sizeHeight="min(90vh, 1000px)"
  {...props}
/>
```

#### Animation Variants

```tsx
// Zoom - Scales from 50% size with dramatic effect
<HazoUiDialog
  openAnimation="zoom"
  closeAnimation="zoom"
  {...props}
/>

// Slide Bottom - Slides from bottom of screen
<HazoUiDialog
  openAnimation="slide"
  closeAnimation="slide"
  {...props}
/>

// Slide Top - Slides from top of screen
<HazoUiDialog
  openAnimation="slide-top"
  closeAnimation="slide-top"
  {...props}
/>

// Slide Left - Slides from left side
<HazoUiDialog
  openAnimation="slide-left"
  closeAnimation="slide-left"
  {...props}
/>

// Slide Right - Slides from right side
<HazoUiDialog
  openAnimation="slide-right"
  closeAnimation="slide-right"
  {...props}
/>

// Fade - Pure opacity fade with no movement
<HazoUiDialog
  openAnimation="fade"
  closeAnimation="fade"
  {...props}
/>

// Bounce - Gentle bounce/spring animation
<HazoUiDialog
  openAnimation="bounce"
  closeAnimation="bounce"
  {...props}
/>

// Scale Up - Scales from 0% to full size
<HazoUiDialog
  openAnimation="scale-up"
  closeAnimation="scale-up"
  {...props}
/>

// Flip - Flip/rotate animation effect
<HazoUiDialog
  openAnimation="flip"
  closeAnimation="flip"
  {...props}
/>

// None - No animation
<HazoUiDialog
  openAnimation="none"
  closeAnimation="none"
  {...props}
/>
```

#### Themed Dialogs

**Success Theme**
```tsx
<HazoUiDialog
  title="✓ Success"
  description="Operation completed successfully"
  actionButtonText="Done"
  showCancelButton={false}
  borderColor="rgb(34, 197, 94)"
  headerBackgroundColor="rgb(220, 252, 231)"
  headerTextColor="rgb(22, 101, 52)"
  accentColor="rgb(34, 197, 94)"
  overlayClassName="bg-green-950/50"
  {...props}
>
  <p>Your changes have been saved.</p>
</HazoUiDialog>
```

**Warning Theme**
```tsx
<HazoUiDialog
  title="⚠ Warning"
  description="Please review before proceeding"
  actionButtonText="I Understand"
  borderColor="rgb(234, 179, 8)"
  headerBackgroundColor="rgb(254, 249, 195)"
  headerTextColor="rgb(113, 63, 18)"
  accentColor="rgb(234, 179, 8)"
  overlayClassName="bg-yellow-950/50"
  {...props}
>
  <p>You have unsaved changes that will be lost.</p>
</HazoUiDialog>
```

**Danger Theme**
```tsx
<HazoUiDialog
  title="⛔ Destructive Action"
  description="This cannot be undone"
  actionButtonText="Delete Permanently"
  actionButtonVariant="destructive"
  borderColor="rgb(239, 68, 68)"
  headerBackgroundColor="rgb(254, 226, 226)"
  headerTextColor="rgb(127, 29, 29)"
  overlayClassName="bg-red-950/50"
  {...props}
>
  <p>All data will be permanently deleted.</p>
</HazoUiDialog>
```

**Info Theme**
```tsx
<HazoUiDialog
  title="ℹ Information"
  description="Learn more about this feature"
  actionButtonText="Got It"
  showCancelButton={false}
  borderColor="rgb(59, 130, 246)"
  headerBackgroundColor="rgb(219, 234, 254)"
  headerTextColor="rgb(30, 58, 138)"
  accentColor="rgb(59, 130, 246)"
  overlayClassName="bg-blue-950/50"
  {...props}
>
  <p>New features are now available.</p>
</HazoUiDialog>
```

#### Header Bar Style

The header bar feature creates a full-width colored bar at the top of the dialog, similar to common modal designs in modern applications. When enabled, the header text automatically becomes white for better contrast.

```tsx
// Dark Header Bar (slate)
<HazoUiDialog
  title="Invite Team Members"
  description="Add people to your workspace"
  headerBar={true}
  headerBarColor="#1e293b"
  actionButtonText="Send Invites"
  {...props}
>
  <div className="space-y-4">
    <input
      type="text"
      placeholder="email@example.com"
      className="w-full px-3 py-2 border rounded-md"
    />
    <select className="w-full px-3 py-2 border rounded-md">
      <option>Admin</option>
      <option>Editor</option>
      <option>Viewer</option>
    </select>
  </div>
</HazoUiDialog>

// Blue Header Bar
<HazoUiDialog
  title="Create New Project"
  description="Set up a new project workspace"
  headerBar={true}
  headerBarColor="#2563eb"
  actionButtonText="Create"
  {...props}
>
  {/* Form content */}
</HazoUiDialog>

// Purple Header Bar
<HazoUiDialog
  title="Upload Document"
  description="Upload a file to process"
  headerBar={true}
  headerBarColor="#9333ea"
  actionButtonText="Upload"
  {...props}
>
  {/* Upload UI */}
</HazoUiDialog>
```

**Key Features:**
- Full-width colored bar extends to dialog edges
- Header text automatically becomes white for contrast
- Description text becomes semi-transparent white (80% opacity)
- Close button color adapts to white for visibility
- Compatible with all animation presets and size variants

#### Complex Form Dialog

```tsx
import { HazoUiDialog } from 'hazo_ui';
import { useState } from 'react';

function FormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleSubmit = () => {
    console.log('Form data:', formData);
    setIsOpen(false);
  };

  return (
    <HazoUiDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="New Employee Registration"
      description="Fill out the required fields"
      actionButtonText="Register"
      onConfirm={handleSubmit}
      sizeWidth="min(90vw, 700px)"
      sizeHeight="min(85vh, 900px)"
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Role *</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a role</option>
            <option value="engineer">Software Engineer</option>
            <option value="designer">UI/UX Designer</option>
            <option value="manager">Product Manager</option>
          </select>
        </div>
      </div>
    </HazoUiDialog>
  );
}
```

#### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Called when open state changes |
| `children` | `React.ReactNode` | **Required** | Dialog body content |
| `onConfirm` | `() => void` | - | Called when action button clicked |
| `onCancel` | `() => void` | - | Called when cancel button clicked |
| `title` | `string` | `"Action required"` | Dialog title |
| `description` | `string` | - | Dialog description |
| `actionButtonText` | `string` | `"Confirm"` | Action button label |
| `actionButtonVariant` | `ButtonVariant` | `"default"` | Action button style |
| `cancelButtonText` | `string` | `"Cancel"` | Cancel button label |
| `showCancelButton` | `boolean` | `true` | Show cancel button |
| `actionButtonLoading` | `boolean` | `false` | Shows loading spinner and disables action button |
| `actionButtonDisabled` | `boolean` | `false` | Disables the action button |
| `actionButtonIcon` | `React.ReactNode` | - | Icon element rendered before action button text |
| `footerContent` | `React.ReactNode` | - | Custom footer content that replaces default buttons |
| `sizeWidth` | `string` | `"min(90vw, 600px)"` | Dialog width |
| `sizeHeight` | `string` | `"min(80vh, 800px)"` | Dialog max height |
| `openAnimation` | `AnimationPreset \| string` | `"zoom"` | Open animation |
| `closeAnimation` | `AnimationPreset \| string` | `"zoom"` | Close animation |
| `headerBackgroundColor` | `string` | - | Header background color |
| `headerTextColor` | `string` | - | Header text color |
| `bodyBackgroundColor` | `string` | - | Body background color |
| `footerBackgroundColor` | `string` | - | Footer background color |
| `borderColor` | `string` | - | Dialog border color |
| `accentColor` | `string` | - | Action button background color |
| `className` | `string` | - | Additional CSS classes |
| `contentClassName` | `string` | - | Body CSS classes |
| `overlayClassName` | `string` | - | Overlay CSS classes |
| `headerClassName` | `string` | - | Header CSS classes |
| `footerClassName` | `string` | - | Footer CSS classes |
| `showCloseButton` | `boolean` | `true` | Show X close button |

---

## Troubleshooting

### Styles not applying (Tailwind v4)

If you're using Tailwind CSS v4 and components appear unstyled:

1. Add the `@source` directive to your globals.css:
   ```css
   @import "tailwindcss";
   @source "../node_modules/hazo_ui/dist";
   ```

2. Ensure you've imported the CSS variables:
   ```tsx
   import 'hazo_ui/styles.css';
   ```

### Missing hover states or colors

If hover states are transparent or colors don't appear:

- **Tailwind v4 users**: Add the `@source` directive (see above)
- **Tailwind v3 users**: Verify `./node_modules/hazo_ui/dist/**/*.js` is in your `content` array

### Missing CSS variables

If you see errors about missing CSS variables, ensure you've either:
- Imported `hazo_ui/styles.css` in your app entry point
- Or configured your own CSS variables following the shadcn/ui pattern

### TypeScript errors

Ensure your tsconfig.json includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Select dropdowns clipped in dialogs

If Select dropdown options are cut off when used inside a Dialog:
```css
/* Add to your globals.css */
[data-slot="dialog-content"]:has([data-slot="select-content"]),
[data-slot="dialog-content"]:has([data-state="open"][data-slot="select-trigger"]) {
  overflow: visible !important;
}

[data-slot="select-content"] {
  z-index: 9999 !important;
}
```

### Command pills not appearing (HazoUiTextbox/HazoUiTextarea)

1. Ensure `prefixes` prop is properly configured with `char` and `commands` arrays
2. Verify you're typing the correct prefix character (e.g., @, #, /)
3. Check that `@tiptap/react` and related extensions are installed

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

### Run dev app

The dev-app provides a comprehensive testing environment with dedicated pages for each component:

```bash
npm run dev:app
```

Navigate to `http://localhost:3000` to access:
- **Home** - Library overview and quick start guide
- **Component pages** - Individual test pages with multiple test cases for each component
- **Sidebar navigation** - Easy navigation between all component tests

Each component page includes:
- Multiple test sections covering different configurations
- Real-time state display
- Interactive examples

### Test before publishing

```bash
npm run test:build  # Build library + build dev-app
npm run test:dev    # Build library + run dev-app
```

## License

MIT
