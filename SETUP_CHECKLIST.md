# hazo_ui Setup Checklist

This checklist will guide you through installing and setting up hazo_ui in your project.

## Prerequisites

- [ ] Node.js (v18 or higher recommended)
- [ ] npm or yarn package manager
- [ ] A React project (Next.js, Create React App, Vite, etc.)
- [ ] Tailwind CSS configured in your project

## Quick Setup (Recommended)

### 1. Install the Package

```bash
npm install hazo_ui
```

### 2. Import CSS Variables

Add to your app's entry point (e.g., `layout.tsx`, `_app.tsx`, or `main.tsx`):

```tsx
import 'hazo_ui/styles.css';
```

### 3. Configure Tailwind

Update your `tailwind.config.ts`:

```ts
import hazoUiPreset from 'hazo_ui/tailwind-preset';

export default {
  presets: [hazoUiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/hazo_ui/dist/**/*.js',
  ],
};
```

**Done!** You can now use the components.

---

## Manual Setup (Alternative)

If you prefer not to use the preset, or need custom configuration:

### 1. Install the Package

```bash
npm install hazo_ui
```

or

```bash
yarn add hazo_ui
```

or

```bash
pnpm add hazo_ui
```

### 2. Install Peer Dependencies

The following peer dependencies are required:

- [ ] React (^18.0.0 or ^19.0.0)
- [ ] React DOM (^18.0.0 or ^19.0.0)

If not already installed:

```bash
npm install react react-dom
```

### 3. Install Required Dependencies

hazo_ui requires the following dependencies. Install them if not already present:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip @radix-ui/react-radio-group @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities class-variance-authority clsx date-fns lucide-react react-day-picker react-icons tailwind-merge tailwindcss-animate
```

**Note**: If you're using specific components, you may not need all dependencies. Here's a breakdown:

- **All components require**: `clsx`, `tailwind-merge`, `tailwindcss-animate`
- **HazoUiMultiFilterDialog requires**: `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, `date-fns`, `lucide-react`, `react-day-picker`
- **HazoUiMultiSortDialog requires**: `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `lucide-react`
- **HazoUiFlexRadio requires**: `@radix-ui/react-radio-group`, `@radix-ui/react-tooltip`, `react-icons`, `lucide-react`
- **HazoUiFlexInput requires**: No additional dependencies (uses base shadcn/ui Input component)

### 4. Configure Tailwind CSS

[ ] Ensure Tailwind CSS is installed and configured in your project

[ ] Add the following CSS variables to your global CSS file (usually `globals.css` or `index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
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
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

[ ] Ensure your `tailwind.config.js` or `tailwind.config.ts` includes the content paths:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/hazo_ui/dist/**/*.{js,ts,jsx,tsx}", // Add this line
    // ... other paths
  ],
  // ... rest of config
}
```

### 5. Import and Use Components

[ ] Import the component(s) you need:

```tsx
// Import a component
import { HazoUiMultiFilterDialog } from 'hazo_ui';

// Import with types
import { HazoUiMultiFilterDialog, type FilterField, type FilterConfig } from 'hazo_ui';

// Import multiple components
import { HazoUiMultiFilterDialog, HazoUiMultiSortDialog, HazoUiFlexRadio, HazoUiFlexInput } from 'hazo_ui';
```

[ ] Use the component in your code (see README.md for detailed usage examples)

### 6. Verify Installation

[ ] Check that the component renders correctly

[ ] Verify TypeScript types are working (if using TypeScript)

[ ] Test component functionality

[ ] Check browser console for any errors

## Troubleshooting

### Common Issues

**Issue**: Dialog appears without backdrop/overlay or looks unstyled
- **Solution**: Ensure the CSS variables are defined in your globals.css (see Step 4 above). The backdrop uses `bg-black/80` which requires proper Tailwind configuration.

**Issue**: Dropdowns/Selects appear as unstyled inputs
- **Solution**:
  1. Ensure you've added `./node_modules/hazo_ui/dist/**/*.{js,ts,jsx,tsx}` to your Tailwind config content array
  2. Verify CSS variables like `--popover`, `--border`, `--input` are defined
  3. Make sure `tailwindcss-animate` is installed and configured

**Issue**: Components not styling correctly
- **Solution**: Ensure Tailwind CSS is properly configured and CSS variables are set up

**Issue**: TypeScript errors
- **Solution**: Make sure you have `@types/react` and `@types/react-dom` installed

**Issue**: Icons not showing (for HazoUiFlexRadio)
- **Solution**: Ensure `react-icons` is installed and you're using the correct icon set name

**Issue**: Drag and drop not working (for HazoUiMultiSortDialog)
- **Solution**: Ensure `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities` are installed

**Issue**: Date picker not working (for HazoUiMultiFilterDialog)
- **Solution**: Ensure `react-day-picker` and `date-fns` are installed

**Issue**: Input validation not working (for HazoUiFlexInput)
- **Solution**: Ensure the component is properly controlled with `value` and `onChange` props, and validation occurs on blur

## Next Steps

- [ ] Read the [README.md](./README.md) for detailed component documentation
- [ ] Check out the component examples in the README
- [ ] Customize the styling to match your design system
- [ ] Test all components in your application

## Development Workflow

### Build the Library

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Testing Components

#### Using Storybook

```bash
npm run storybook
```

Storybook will start at `http://localhost:6006`.

#### Using the Dev App

```bash
npm run dev:app
```

The accompanying Next.js dev app will run at `http://localhost:3000`.

### Before Publishing

```bash
npm run test:build
npm run type-check
npm run build-storybook
```

## Adding New Components

1. Create a new directory in `src/components/your_component_name/`.
2. Add `index.tsx` with your component implementation.
3. Create `your_component_name.stories.tsx` for Storybook coverage.
4. Export the component from `src/index.ts`:
   ```ts
   export { YourComponent } from "./components/your_component_name";
   ```

## Tree-Shaking Guidance

The library is optimized for tree-shaking. Always import components individually:

```tsx
// ✅ Recommended
import { HazoUiFlexRadio } from "hazo_ui";

// ❌ Avoid
import * as HazoUI from "hazo_ui";
```

## Publishing Checklist

1. Update the version in `package.json`.
2. Run `npm run prepublishOnly` (this runs `build` and `type-check` automatically).
3. Publish:
   ```bash
   npm publish
   ```

## Support

If you encounter any issues:

1. Check the [README.md](./README.md) for detailed documentation
2. Review the troubleshooting section above
3. Check that all dependencies are installed correctly
4. Verify your Tailwind CSS configuration

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [React Icons Documentation](https://react-icons.github.io/react-icons/)

