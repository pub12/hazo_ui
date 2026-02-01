# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**hazo_ui** is a React UI component library for SaaS applications providing multi-field filtering, sorting, flexible radio selections, and enhanced input validation components.

**Stack:** React 18+, TypeScript, TailwindCSS, Shadcn/ui, Radix UI

## Commands

```bash
# Development
npm run dev                 # Watch mode - rebuilds on file changes
npm run dev:app            # Next.js dev app for testing components at localhost:3000

# Building
npm run build              # Create dist/ with ESM + CJS bundles

# Quality checks
npm run type-check         # TypeScript validation
npm run lint               # ESLint checking

# Testing
npm run test:build         # Build library + build dev-app
npm run test:dev           # Build library + run dev-app
```

## Architecture

### Directory Structure
```
src/
├── components/
│   ├── ui/                           # shadcn/ui base components
│   ├── hazo_ui_multi_filter_dialog/  # Multi-field filter dialog
│   ├── hazo_ui_multi_sort_dialog/    # Drag-drop multi-field sorting
│   ├── hazo_ui_flex_radio/           # Flexible radio/icon selection
│   ├── hazo_ui_flex_input/           # Enhanced input with validation
│   ├── hazo_ui_rte/                  # Rich text editor
│   ├── hazo_ui_command/              # Command pill component
│   ├── hazo_ui_textbox/              # Single-line textbox
│   ├── hazo_ui_textarea/             # Multi-line textarea
│   └── hazo_ui_dialog/               # Dialog component
├── lib/utils.ts                      # Utility functions (cn - class merge)
├── styles/globals.css                # Global Tailwind & CSS variables
└── index.ts                          # Main export file

dev-app/                              # Next.js app for testing components
├── app/                              # Component test pages
│   ├── multi-filter-dialog/         # Multi filter tests
│   ├── multi-sort-dialog/            # Multi sort tests
│   ├── flex-radio/                   # Flex radio tests
│   ├── flex-input/                   # Flex input tests
│   ├── rte/                          # RTE tests
│   ├── command/                      # Command system tests
│   ├── textbox/                      # Textbox tests
│   ├── textarea/                     # Textarea tests
│   └── dialog/                       # Dialog tests
└── components/
    └── sidebar.tsx                   # Navigation sidebar
```

### Component Pattern
Each component lives in `src/components/component_name/`:
- `index.tsx` - Main component implementation

All components exported from `src/index.ts` with explicit types for tree-shaking.

### Testing Components
The dev-app provides dedicated test pages for each component with multiple test cases:
- Navigate using the sidebar menu
- Each page contains sections testing different configurations
- Real-time state display shows component output

### Component Customization
Components support customization through optional props:
- **Dialog components** (HazoUiMultiFilterDialog, HazoUiMultiSortDialog): Support `title` and `description` props for custom dialog headers
- **UI primitives** (command.tsx): Enhanced with hover states for better UX

### Build Configuration
- **tsup** bundles to ESM + CJS with TypeScript declarations
- Adds `"use client"` banner for Next.js compatibility
- Tree-shakeable exports

### Styling System
- HSL-based CSS variables for theming (light/dark mode)
- Variables defined in `src/styles/globals.css`
- Consumers override via CSS variable customization

## Coding Conventions

### From .cursor/rules:
- Use **snake_case** throughout
- Prefix div classNames with `cls_` (e.g., `className="cls_filter_container"`)
- Include file purpose descriptions at top of files
- Add comments for functions and major code sections
- UI Behavior: Data input fields non-editable by default with pencil icon; edit mode shows check & X buttons
- Use shadcn alert dialog for acknowledgments, shadcn sonner for notifications

### TypeScript
- Strict mode enabled
- Always export types alongside components
- No unused locals or parameters

## Key Dependencies

- **@radix-ui/*** - Accessible UI primitives
- **@dnd-kit/*** - Drag-and-drop for sorting
- **react-icons** - Icon sets (fa, md, hi, bi, ai, bs, fi, io, ri, tb)
- **date-fns + react-day-picker** - Date handling
- **class-variance-authority** - Type-safe class composition

## Adding New Components

1. Create `src/components/new_component/index.tsx`
2. Export from `src/index.ts` with types
3. Create test page in `dev-app/app/new-component/page.tsx`
4. Add navigation link to `dev-app/components/sidebar.tsx`
5. Test in dev-app with multiple test cases
6. Update README.md with documentation
