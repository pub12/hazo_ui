# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-12-17

### Added
- **HazoUiMultiFilterDialog**: Added optional `title` prop (default: "Filter") to customize dialog title
- **HazoUiMultiFilterDialog**: Added optional `description` prop (default: "Add multiple fields to filter by...") to customize dialog description
- **HazoUiMultiSortDialog**: Added optional `title` prop (default: "Sort") to customize dialog title
- **HazoUiMultiSortDialog**: Added optional `description` prop (default: "Add multiple fields to sort by...") to customize dialog description
- **CommandItem**: Added hover styling (`hover:bg-accent hover:text-accent-foreground cursor-pointer`) for better user experience
- **Documentation**: Added troubleshooting entries for dialog backdrop and dropdown styling issues

**Design Decision**: The `title` and `description` props were added to provide better customization flexibility for different use cases. For example, a product filtering dialog might want to display "Filter Products" instead of the generic "Filter", making the interface more contextual and user-friendly. These props maintain backward compatibility by providing sensible defaults.

## [2.1.2] - 2025-12-17

### Added
- Color support enhancements

## [2.1.0] - 2025-12-17

### Added
- **HazoUiFlexInput**: New enhanced input component with type validation, character restrictions, and error messaging
  - Supports multiple input types: mixed (text), numeric, alpha (letters only), and email
  - Real-time character filtering for numeric and alpha types
  - Validation on blur with clear error messages
  - Numeric constraints: min/max value validation and decimal precision control
  - Length constraints: configurable minimum and maximum character lengths
  - Custom regex pattern support
  - Optional format guide helper text
  - Fully typed TypeScript interfaces

**Design Decision**: HazoUiFlexInput extends the shadcn Input component to provide comprehensive validation without requiring external form libraries. The validation-on-blur approach prevents disruptive real-time error messages while users are typing, improving the overall user experience.

## [2.0.0] - 2025-12-17

### Added
- **HazoUiFlexRadio**: New flexible radio button/icon selection component
  - Support for single and multi-selection modes
  - Layout options: horizontal or vertical
  - Style variants: radio button style or icon-only button style
  - Integration with react-icons library (supports 10+ icon sets: fa, md, hi, bi, ai, bs, fi, io, ri, tb)
  - Label control with show/hide options
  - Tooltips with 1-second delay
  - Fully controlled component with value/onChange pattern
  - TypeScript support with complete type definitions
  - Accessibility features using Radix UI primitives

**Design Decision**: HazoUiFlexRadio was designed to provide maximum flexibility for both traditional radio button interfaces and modern icon-based selection patterns. The dual-mode support (single/multi selection) reduces the need for separate checkbox implementations.

## [1.0.0] - 2025-12-17

### Added
- **HazoUiMultiFilterDialog**: Multi-field filtering component
  - Support for text, number, combobox, boolean, and date field types
  - Operator support for number and date fields (equals, greater than, less than, etc.)
  - Dynamic field addition and removal
  - Built-in field validation for text length, number ranges, and decimal precision
  - Visual feedback with active filters tooltip
  - Clear all filters functionality
  - Responsive design for mobile and desktop
  - TypeScript support with complete interfaces
  - Accessibility using Radix UI primitives

- **HazoUiMultiSortDialog**: Multi-field sorting component with drag-and-drop
  - Multiple sort fields with priority ordering
  - Drag-and-drop reordering using @dnd-kit
  - Direction toggle for each field (ascending/descending)
  - Visual feedback during drag operations
  - Clear all sorts functionality
  - Tooltip display of active sort configuration
  - Keyboard navigation support
  - Responsive design
  - TypeScript support
  - Accessibility features

- **Base UI Components**: Shadcn/ui components integration
  - Button, Dialog, Command, Popover, Select, Input, Label, Switch, Tooltip, Calendar
  - Tailwind CSS theming with CSS variable support
  - Light and dark mode support

- **Build Configuration**:
  - tsup bundler for ESM + CJS outputs
  - TypeScript declarations generation
  - Tree-shakeable exports
  - "use client" directive for Next.js compatibility

- **Development Tools**:
  - Storybook integration for component development
  - Next.js dev app for integration testing
  - TypeScript strict mode
  - ESLint configuration

**Design Decision**: The library was built on shadcn/ui and Radix UI primitives to ensure accessibility, maintainability, and consistency with modern React patterns. The choice of @dnd-kit for drag-and-drop provides excellent accessibility support compared to alternatives like react-beautiful-dnd.

## [Unreleased]

### Planned
- Additional field types for filtering (time, datetime, multi-select)
- Preset filter configurations for common use cases
- Export/import filter configurations
- Advanced sort options (null handling, case sensitivity)
- Performance optimizations for large datasets

---

## Version History Reference

- **2.2.0** - Customizable dialog titles and descriptions
- **2.1.2** - Color support enhancements
- **2.1.0** - Added HazoUiFlexInput component
- **2.0.0** - Added HazoUiFlexRadio component
- **1.0.0** - Initial release with filter and sort dialogs
