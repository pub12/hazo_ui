# Technical Documentation - hazo_ui

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Component Architecture](#component-architecture)
3. [Data Flow and State Management](#data-flow-and-state-management)
4. [API Specifications](#api-specifications)
5. [Build System](#build-system)
6. [Styling System](#styling-system)
7. [Performance Characteristics](#performance-characteristics)
8. [Security Considerations](#security-considerations)
9. [Integration Patterns](#integration-patterns)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     hazo_ui Library                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Multi       │  │  Multi       │  │  Flex        │      │
│  │  Filter      │  │  Sort        │  │  Radio       │      │
│  │  Dialog      │  │  Dialog      │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│         ┌──────────────────▼──────────────────┐              │
│         │     UI Components Layer             │              │
│         │  (Dialog, Command, Popover, etc.)   │              │
│         └──────────────────┬──────────────────┘              │
│                            │                                 │
│         ┌──────────────────▼──────────────────┐              │
│         │     Radix UI Primitives             │              │
│         │  (@radix-ui/react-*)                │              │
│         └──────────────────┬──────────────────┘              │
│                            │                                 │
│         ┌──────────────────▼──────────────────┐              │
│         │     React 18/19                     │              │
│         └─────────────────────────────────────┘              │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  Build System: tsup (ESM + CJS)                              │
│  Styling: Tailwind CSS + CSS Variables                       │
│  Type System: TypeScript (strict mode)                       │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 18/19 | Component rendering and state management |
| **UI Primitives** | Radix UI | Accessible, unstyled component primitives |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Type System** | TypeScript 5.5+ | Type safety and developer experience |
| **Build Tool** | tsup | Fast TypeScript bundler |
| **Icons** | lucide-react, react-icons | Icon libraries |
| **Drag & Drop** | @dnd-kit | Accessible drag-and-drop functionality |
| **Date Handling** | date-fns, react-day-picker | Date formatting and calendar UI |

---

## Component Architecture

### HazoUiMultiFilterDialog

#### Component Structure
```
HazoUiMultiFilterDialog
├── Dialog (Radix UI)
│   ├── DialogTrigger (Filter Button)
│   │   └── Tooltip (Active Filters)
│   └── DialogContent
│       ├── DialogHeader (Title + Description)
│       ├── Filter Fields List
│       │   └── FilterFieldItem[]
│       │       ├── Field Label
│       │       ├── Operator Select (number/date)
│       │       ├── Value Input (type-specific)
│       │       └── Delete Button
│       ├── Add Field Popover
│       │   └── Command (Searchable List)
│       └── DialogFooter
│           ├── Clear All Button
│           └── Apply Button
```

#### State Management
```typescript
// Internal State
const [localFilters, setLocalFilters] = useState<FilterConfig[]>([]);
const [isOpen, setIsOpen] = useState(false);

// Props Interface
interface HazoUiMultiFilterDialogProps {
  availableFields: FilterField[];      // Field definitions
  onFilterChange: (filters: FilterConfig[]) => void;  // Callback
  initialFilters?: FilterConfig[];     // Initial state
  title?: string;                      // Dialog title (v2.2.0+)
  description?: string;                // Dialog description (v2.2.0+)
}
```

#### Data Flow
```
User Interaction
       │
       ▼
  Local State Update (setLocalFilters)
       │
       ▼
  Validation (if applicable)
       │
       ▼
  Apply Button Click
       │
       ▼
  onFilterChange callback
       │
       ▼
  Parent Component
```

#### Field Type Handlers

| Field Type | Input Component | Validation | Operators |
|-----------|----------------|------------|-----------|
| **text** | Input | minLength, maxLength | N/A |
| **number** | Input (type="number") | min, max, decimal precision | equals, not_equals, greater_than, less_than, greater_equal, less_equal |
| **combobox** | Select + Command | predefined options | N/A |
| **boolean** | Select | true/false | N/A |
| **date** | Calendar (react-day-picker) | Date object | equals, not_equals, greater_than, less_than, greater_equal, less_equal |

---

### HazoUiMultiSortDialog

#### Component Structure
```
HazoUiMultiSortDialog
├── Dialog (Radix UI)
│   ├── DialogTrigger (Sort Button)
│   │   └── Tooltip (Active Sorts)
│   └── DialogContent
│       ├── DialogHeader (Title + Description)
│       ├── DndContext (@dnd-kit)
│       │   └── SortableContext
│       │       └── SortableSortFieldItem[]
│       │           ├── Drag Handle (GripVertical)
│       │           ├── Field Label
│       │           ├── Direction Switch (asc/desc)
│       │           └── Delete Button
│       ├── Add Field Popover
│       │   └── Command (Searchable List)
│       └── DialogFooter
│           ├── Clear All Button
│           └── Apply Button
```

#### Drag-and-Drop Implementation
```typescript
// Sensors for drag detection
const sensors = useSensors(
  useSensor(PointerSensor),           // Mouse/touch
  useSensor(KeyboardSensor, {         // Keyboard accessibility
    coordinateGetter: sortableKeyboardCoordinates,
  })
);

// Handle drag end event
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (active.id !== over?.id) {
    const oldIndex = sortFields.findIndex(f => f.field === active.id);
    const newIndex = sortFields.findIndex(f => f.field === over?.id);
    const reordered = arrayMove(sortFields, oldIndex, newIndex);
    setSortFields(reordered);
  }
};
```

#### State Management
```typescript
// Internal State
const [sortFields, setSortFields] = useState<SortConfig[]>([]);
const [isOpen, setIsOpen] = useState(false);

// Props Interface
interface HazoUiMultiSortDialogProps {
  availableFields: SortField[];        // Field definitions
  onSortChange: (sorts: SortConfig[]) => void;  // Callback
  initialSortFields?: SortConfig[];    // Initial state
  title?: string;                      // Dialog title (v2.2.0+)
  description?: string;                // Dialog description (v2.2.0+)
}
```

---

### HazoUiFlexRadio

#### Component Structure
```
HazoUiFlexRadio
├── RadioGroup (single) / div (multi)
│   └── RadioGroupItem[] / Checkbox analogs
│       ├── Tooltip (optional)
│       ├── Icon (selected/unselected)
│       └── Label (optional)
```

#### Selection Modes

| Mode | Behavior | Value Type | Example Use Case |
|------|----------|-----------|-----------------|
| **single** | One selection at a time | `string` | Theme selection, language picker |
| **multi** | Multiple selections allowed | `string[]` | Feature toggles, filter categories |

#### Layout Variants

```typescript
// Horizontal Layout (default)
<div className="flex flex-row gap-2">
  {/* Radio items */}
</div>

// Vertical Layout
<div className="flex flex-col gap-2">
  {/* Radio items */}
</div>
```

---

### HazoUiFlexInput

#### Component Structure
```
HazoUiFlexInput (extends shadcn Input)
├── Input element
├── Validation logic (onBlur)
├── Character filtering (onChange)
├── Error message display
└── Format guide (optional)
```

#### Input Type Processing

| Input Type | Allowed Characters | Validation | Use Case |
|-----------|-------------------|------------|----------|
| **mixed** | All | regex, length | General text, usernames |
| **numeric** | 0-9, ., - | min, max, decimals | Prices, quantities, ages |
| **alpha** | a-z, A-Z, space | length | Names, titles |
| **email** | Email chars | RFC 5322 pattern | Email addresses |

#### Validation Flow
```
User Input
    │
    ▼
onChange: Character Filtering (real-time)
    │
    ▼
onBlur: Full Validation
    │
    ├─ Valid → Clear error
    └─ Invalid → Set error message
```

---

## Data Flow and State Management

### Controlled Component Pattern

All components follow React's controlled component pattern:

```typescript
// Parent Component
function ParentComponent() {
  const [value, setValue] = useState(initialValue);

  return (
    <HazoComponent
      value={value}
      onChange={setValue}
      // ... other props
    />
  );
}
```

### State Synchronization

```
┌─────────────────┐
│ Parent State    │
│ (source of truth)│
└────────┬────────┘
         │ initialFilters/initialSortFields
         ▼
┌─────────────────┐
│ Component State │
│ (local copy)    │
└────────┬────────┘
         │ Apply button
         ▼
┌─────────────────┐
│ onFilterChange/ │
│ onSortChange    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Parent State    │
│ (updated)       │
└─────────────────┘
```

### Event Handling Architecture

```typescript
// Centralized event handlers
const handleValueChange = (index: number, value: any) => {
  const updated = [...localFilters];
  updated[index].value = value;
  setLocalFilters(updated);
};

const handleOperatorChange = (index: number, operator: string) => {
  const updated = [...localFilters];
  updated[index].operator = operator;
  setLocalFilters(updated);
};

const handleDelete = (index: number) => {
  setLocalFilters(prev => prev.filter((_, i) => i !== index));
};
```

---

## API Specifications

### Type Definitions

#### Filter System
```typescript
// Field definition
export interface FilterField {
  value: string;                      // Unique field identifier
  label: string;                      // Display name
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
  comboboxOptions?: Array<{
    label: string;
    value: string;
  }>;
  booleanLabels?: {
    trueLabel?: string;
    falseLabel?: string;
  };
}

// Filter configuration (output)
export interface FilterConfig {
  field: string;                      // Field identifier
  operator?: string;                  // Comparison operator
  value: any;                         // Filter value
}
```

#### Sort System
```typescript
// Field definition
export interface SortField {
  value: string;                      // Unique field identifier
  label: string;                      // Display name
}

// Sort configuration (output)
export interface SortConfig {
  field: string;                      // Field identifier
  direction: 'asc' | 'desc';          // Sort direction
}
```

#### Radio System
```typescript
// Item definition
export interface HazoUiFlexRadioItem {
  label: string;                      // Display label
  value: string;                      // Unique value
  icon_selected?: string;             // Selected icon name
  icon_unselected?: string;           // Unselected icon name
}

// Component props
export interface HazoUiFlexRadioProps {
  layout?: 'horizontal' | 'vertical';
  style?: 'radio' | 'icons';
  display_label?: boolean;
  icon_set?: string;                  // Icon package (fa, md, hi, etc.)
  data: HazoUiFlexRadioItem[];
  selection: 'single' | 'multi';
  value: string | string[];
  onChange: (value: string | string[]) => void;
  className?: string;
}
```

#### Input System
```typescript
export interface HazoUiFlexInputProps extends Omit<InputProps, "type"> {
  input_type?: "mixed" | "numeric" | "email" | "alpha";
  text_len_min?: number;
  text_len_max?: number;
  num_min?: number;
  num_max?: number;
  regex?: string | RegExp;
  num_decimals?: number;
  format_guide?: string;
  format_guide_info?: boolean;
}
```

---

## Build System

### tsup Configuration

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],              // Dual format output
  dts: true,                           // Generate .d.ts files
  sourcemap: true,                     // Source maps for debugging
  clean: true,                         // Clean output directory
  splitting: false,                    // Disable code splitting
  treeshake: true,                     // Enable tree-shaking
  external: [                          // Externalize peer dependencies
    'react',
    'react-dom',
  ],
  banner: {
    js: '"use client";',               // Next.js client component directive
  },
});
```

### Output Structure
```
dist/
├── index.js          # ESM bundle
├── index.d.ts        # TypeScript declarations
└── index.js.map      # Source map
```

### Tree-Shaking Support

The library is optimized for tree-shaking through:
1. ESM format output
2. Named exports only (no default exports)
3. Side-effect free modules
4. Explicit export declarations

```typescript
// src/index.ts - Explicit re-exports
export { HazoUiMultiFilterDialog } from "./components/hazo_ui_multi_filter_dialog";
export type { FilterField, FilterConfig } from "./components/hazo_ui_multi_filter_dialog";

export { HazoUiMultiSortDialog } from "./components/hazo_ui_multi_sort_dialog";
export type { SortField, SortConfig } from "./components/hazo_ui_multi_sort_dialog";

export { HazoUiFlexRadio } from "./components/hazo_ui_flex_radio";
export type { HazoUiFlexRadioItem, HazoUiFlexRadioProps } from "./components/hazo_ui_flex_radio";

export { HazoUiFlexInput } from "./components/hazo_ui_flex_input";
export type { HazoUiFlexInputProps } from "./components/hazo_ui_flex_input";
```

---

## Styling System

### Tailwind CSS Integration

#### CSS Variable Architecture
```css
/* globals.css - Theme variables */
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

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

#### HSL Color Format
All colors use HSL (Hue, Saturation, Lightness) format for easier manipulation:
```css
/* Usage in Tailwind */
bg-primary → background-color: hsl(var(--primary));
text-primary-foreground → color: hsl(var(--primary-foreground));
```

### Class Composition

The library uses two utilities for class composition:

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Purpose:**
- `clsx`: Conditionally construct className strings
- `twMerge`: Intelligently merge Tailwind CSS classes

**Example:**
```typescript
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className  // User-provided classes override defaults
)} />
```

### Responsive Design

Components use Tailwind's responsive utilities:
```typescript
// Mobile-first approach
<div className="flex flex-col md:flex-row gap-2 md:gap-4">
  {/* Vertical on mobile, horizontal on tablet+ */}
</div>
```

---

## Performance Characteristics

### Bundle Size Analysis

| Component | Size (minified + gzipped) | Dependencies |
|-----------|--------------------------|--------------|
| HazoUiMultiFilterDialog | ~15 KB | Dialog, Command, Popover, Select, Calendar |
| HazoUiMultiSortDialog | ~12 KB | Dialog, Command, Popover, DnD Kit |
| HazoUiFlexRadio | ~5 KB | RadioGroup, Tooltip, react-icons |
| HazoUiFlexInput | ~3 KB | Input (minimal dependencies) |

### Rendering Performance

#### Virtual DOM Optimization
- Components use React.memo where appropriate
- Callback memoization with useCallback
- State updates batched in React 18+

#### List Rendering
```typescript
// Optimized list rendering with keys
{filters.map((filter, index) => (
  <FilterFieldItem
    key={`${filter.field}-${index}`}  // Stable keys
    {...props}
  />
))}
```

#### Drag-and-Drop Performance
@dnd-kit optimizations:
- Uses transform instead of position for dragging (GPU-accelerated)
- Minimal re-renders during drag operations
- Keyboard navigation with debouncing

### Memory Management

- No memory leaks from event listeners (cleanup in useEffect)
- Dialog components unmount when closed (conditional rendering)
- Icon libraries use tree-shaking (only imported icons included)

---

## Security Considerations

### Input Validation

#### Client-Side Validation
All user inputs are validated before processing:

```typescript
// Number validation example
const validateNumber = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (numberConfig.min !== undefined && num < numberConfig.min) return false;
  if (numberConfig.max !== undefined && num > numberConfig.max) return false;
  return true;
};
```

#### XSS Prevention
- All user input is rendered through React (automatic escaping)
- No dangerouslySetInnerHTML usage
- Icon names validated against known icon sets

### Data Sanitization

```typescript
// Regex validation with sanitization
const validateRegex = (value: string, pattern: RegExp) => {
  try {
    return pattern.test(value);
  } catch (e) {
    console.error('Invalid regex pattern:', e);
    return false;
  }
};
```

### Dependency Security

- Regular updates of dependencies
- No dependencies with known vulnerabilities (as of v2.2.0)
- Peer dependencies ensure compatibility

**Key Dependencies:**
- React 18/19: No known vulnerabilities
- Radix UI: Actively maintained, security-focused
- @dnd-kit: Modern, well-maintained alternative to deprecated libraries

---

## Integration Patterns

### Next.js Integration

#### App Router (Next.js 13+)
```typescript
// app/components/MyComponent.tsx
'use client';  // Required for client components

import { HazoUiMultiFilterDialog } from 'hazo_ui';

export default function MyComponent() {
  // Component usage
}
```

#### Pages Router (Next.js 12 and earlier)
```typescript
// pages/index.tsx
import { HazoUiMultiFilterDialog } from 'hazo_ui';

export default function Home() {
  // Component usage
}
```

### Form Library Integration

#### React Hook Form
```typescript
import { useForm, Controller } from 'react-hook-form';
import { HazoUiFlexInput } from 'hazo_ui';

function FormComponent() {
  const { control } = useForm();

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <HazoUiFlexInput
          input_type="email"
          {...field}
        />
      )}
    />
  );
}
```

#### Formik
```typescript
import { Formik, Field } from 'formik';
import { HazoUiFlexInput } from 'hazo_ui';

function FormComponent() {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Field name="email">
        {({ field }) => (
          <HazoUiFlexInput
            input_type="email"
            {...field}
          />
        )}
      </Field>
    </Formik>
  );
}
```

### State Management Integration

#### Zustand
```typescript
import create from 'zustand';
import { FilterConfig } from 'hazo_ui';

interface FilterStore {
  filters: FilterConfig[];
  setFilters: (filters: FilterConfig[]) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  setFilters: (filters) => set({ filters }),
}));

// In component
function DataTable() {
  const { filters, setFilters } = useFilterStore();

  return (
    <HazoUiMultiFilterDialog
      availableFields={fields}
      onFilterChange={setFilters}
      initialFilters={filters}
    />
  );
}
```

#### Redux Toolkit
```typescript
import { createSlice } from '@reduxjs/toolkit';
import { FilterConfig } from 'hazo_ui';

const filterSlice = createSlice({
  name: 'filters',
  initialState: { filters: [] as FilterConfig[] },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

// In component with useDispatch and useSelector
```

### Server-Side Data Fetching

#### With React Query
```typescript
import { useQuery } from '@tanstack/react-query';
import { HazoUiMultiFilterDialog, FilterConfig } from 'hazo_ui';

function DataTable() {
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  const { data } = useQuery({
    queryKey: ['data', filters],
    queryFn: () => fetchData(filters),
  });

  return (
    <>
      <HazoUiMultiFilterDialog
        availableFields={fields}
        onFilterChange={setFilters}
        initialFilters={filters}
      />
      {/* Render data */}
    </>
  );
}
```

### Theme Customization

#### Overriding CSS Variables
```css
/* app/globals.css */
@layer base {
  :root {
    /* Override hazo_ui default colors */
    --primary: 210 100% 50%;
    --primary-foreground: 0 0% 100%;
    --accent: 340 75% 55%;
    /* ... other overrides */
  }
}
```

#### Custom Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/hazo_ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Additional custom colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## Error Handling

### Validation Errors

All components provide clear error messages:

```typescript
// Example from HazoUiFlexInput
const getErrorMessage = () => {
  if (input_type === 'numeric') {
    if (num_min !== undefined && value < num_min) {
      return `Must be at least ${num_min}`;
    }
    if (num_max !== undefined && value > num_max) {
      return `Must be at most ${num_max}`;
    }
    // ... more validations
  }
  // ... other input types
};
```

### Runtime Error Handling

```typescript
// Icon loading with fallback
try {
  const IconComponent = iconLibrary[iconName];
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in ${icon_set}`);
    return null;
  }
  return <IconComponent />;
} catch (error) {
  console.error('Error loading icon:', error);
  return null;
}
```

---

## Testing Strategy

### Component Testing

Recommended testing approach:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { HazoUiMultiFilterDialog } from 'hazo_ui';

describe('HazoUiMultiFilterDialog', () => {
  it('renders filter button', () => {
    render(
      <HazoUiMultiFilterDialog
        availableFields={[]}
        onFilterChange={jest.fn()}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onFilterChange when apply is clicked', () => {
    const handleChange = jest.fn();
    render(
      <HazoUiMultiFilterDialog
        availableFields={fields}
        onFilterChange={handleChange}
      />
    );
    // ... test implementation
  });
});
```

### Storybook for Visual Testing

The library includes comprehensive Storybook stories:

```typescript
// component.stories.tsx
export default {
  title: 'Components/HazoUiMultiFilterDialog',
  component: HazoUiMultiFilterDialog,
};

export const Default = {
  args: {
    availableFields: mockFields,
    onFilterChange: console.log,
  },
};
```

---

## Logging and Monitoring

### Development Mode

Components include helpful console warnings:

```typescript
if (process.env.NODE_ENV === 'development') {
  if (!availableFields.length) {
    console.warn('HazoUiMultiFilterDialog: No available fields provided');
  }
}
```

### Performance Monitoring

Recommended integration with React DevTools Profiler:

```typescript
import { Profiler } from 'react';

<Profiler id="FilterDialog" onRender={onRenderCallback}>
  <HazoUiMultiFilterDialog {...props} />
</Profiler>
```

---

## Version Compatibility

| hazo_ui Version | React Version | Next.js Version | TypeScript Version |
|----------------|---------------|-----------------|-------------------|
| 2.x.x | 18.x, 19.x | 12.x, 13.x, 14.x, 15.x | 5.0+ |
| 1.x.x | 18.x | 12.x, 13.x | 5.0+ |

---

## Migration Guides

### Upgrading from 1.x to 2.x

**Breaking Changes:**
- None. Version 2.x is backward compatible with 1.x.

**New Features:**
- HazoUiFlexRadio component (v2.0.0)
- HazoUiFlexInput component (v2.1.0)
- Customizable dialog titles and descriptions (v2.2.0)

**Migration Steps:**
1. Update package: `npm install hazo_ui@latest`
2. No code changes required for existing components
3. Optionally add `title` and `description` props to filter/sort dialogs

---

## Troubleshooting

### Common Issues

#### Issue: Dialog appears without backdrop/overlay
**Cause:** Missing CSS variables
**Solution:** Ensure `globals.css` includes all CSS variable definitions

#### Issue: Dropdowns/Selects appear as unstyled inputs
**Cause:** Tailwind not processing hazo_ui files
**Solution:** Add `./node_modules/hazo_ui/dist/**/*.{js,ts,jsx,tsx}` to Tailwind content array

#### Issue: Icons not displaying (HazoUiFlexRadio)
**Cause:** react-icons not installed
**Solution:** `npm install react-icons`

#### Issue: Drag-and-drop not working
**Cause:** Missing @dnd-kit dependencies
**Solution:** `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`

---

## Future Roadmap

### Planned Features
- Additional field types (time, datetime, multi-select)
- Preset filter/sort configurations
- Advanced sort options (null handling, case sensitivity)
- Export/import configurations
- Virtual scrolling for large field lists
- Advanced theme customization API

### Performance Optimizations
- Lazy loading for Calendar component
- Virtualized lists for large option sets
- Further bundle size reduction

---

## Contributing

### Development Setup
```bash
git clone https://github.com/pub12/hazo_ui.git
cd hazo_ui
npm install
npm run dev          # Watch mode
npm run storybook    # Component explorer
```

### Code Standards
- Follow snake_case naming convention
- Prefix div classNames with `cls_`
- Add comments for functions and major code sections
- Maintain TypeScript strict mode compliance
- Write Storybook stories for new components

---

## License

MIT License - See LICENSE file for details

---

## Support and Resources

- **GitHub Repository:** https://github.com/pub12/hazo_ui
- **NPM Package:** https://www.npmjs.com/package/hazo_ui
- **Issue Tracker:** https://github.com/pub12/hazo_ui/issues
- **Documentation:** README.md, CLAUDE.md, SETUP_CHECKLIST.md
