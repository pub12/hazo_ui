# hazo_ui Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the dev app:**
   ```bash
   cd dev-app
   npm install
   cd ..
   ```

## Development Workflow

### Building the Library

Build the library for production:
```bash
npm run build
```

Watch mode for development:
```bash
npm run dev
```

### Testing Components

#### Using Storybook
Start Storybook to view and test components in isolation:
```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006`

#### Using the Dev App
Test components in a real Next.js environment:
```bash
npm run dev:app
```

This will start the Next.js dev app at `http://localhost:3000`

### Before Publishing

1. **Build and test:**
   ```bash
   npm run test:build
   ```

2. **Type check:**
   ```bash
   npm run type-check
   ```

3. **Build Storybook:**
   ```bash
   npm run build-storybook
   ```

## Adding New Components

1. Create a new component directory in `src/components/your_component_name/`
2. Create `index.tsx` with your component
3. Create `your_component_name.stories.tsx` for Storybook
4. Export the component from `src/index.ts`:
   ```ts
   export { YourComponent } from "./components/your_component_name";
   ```

## Tree-Shaking

The library is configured for optimal tree-shaking. Consumers should import components individually:

```tsx
// ✅ Good - tree-shakeable
import { Button } from 'hazo_ui';

// ❌ Bad - imports everything
import * from 'hazo_ui';
```

## Publishing

When ready to publish:

1. Update version in `package.json`
2. Run `npm run prepublishOnly` (automatically runs build and type-check)
3. `npm publish`

