# hazo_ui

A set of UI components for common interaction elements in a SaaS app.

## Installation

```bash
npm install hazo_ui
```

## Components

### Component Overview

- **[HazoUiMultiFilterDialog](#hazouimultifilterdialog)** - A powerful dialog component for multi-field filtering with support for text, number, combobox, boolean, and date fields. Includes operator support, validation, and visual feedback.

- **[HazoUiMultiSortDialog](#hazouimultisortdialog)** - A flexible dialog component for multi-field sorting with drag-and-drop reordering. Allows users to set sort priority and direction (ascending/descending) for multiple fields.

- **[HazoUiFlexRadio](#hazouiflexradio)** - A flexible radio button/icon selection component with support for single and multi-selection modes, customizable layouts, and react-icons integration. Perfect for settings panels, preference selection, and option groups.

- **[HazoUiFlexInput](#hazouiflexinput)** - An enhanced input component with type validation, character restrictions, and error messaging. Supports numeric, alpha, email, and mixed input types with built-in validation and formatting guides.

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
