# @codeguide/ui-library

A modern React component library with design tokens, theming, and Storybook integration. Built with TypeScript, Tailwind CSS, and Figma design synchronization.

## 🚀 Features

- **Design Token Integration**: Automatic sync with Figma using Cursor MCP plugin
- **Comprehensive Theming**: Light/dark/system theme support with CSS variables
- **Component Library**: High-quality React components with full accessibility
- **Storybook Documentation**: Interactive component documentation and examples
- **TypeScript Support**: Full type safety and IntelliSense
- **Testing Included**: Comprehensive test suite with Jest and React Testing Library
- **Modern Build**: ESM/CJS dual build with tree-shaking support

## 📦 Installation

```bash
npm install @codeguide/ui-library
# or
yarn add @codeguide/ui-library
# or
pnpm add @codeguide/ui-library
```

## 🏗️ Peer Dependencies

You need to have these installed in your project:

```bash
npm install react react-dom
```

## 🎨 Getting Started

### 1. Import CSS

Import the library CSS in your application entry point:

```tsx
import '@codeguide/ui-library/dist/index.css';
```

### 2. Set up Theme Provider

Wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@codeguide/ui-library';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### 3. Use Components

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@codeguide/ui-library';

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## 🧩 Available Components

### Core Components
- **Button** - Customizable button with multiple variants
- **Card** - Flexible card container with header, content, and footer
- **Input** - Styled input field with various types
- **Checkbox** - Accessible checkbox component
- **Dialog** - Modal dialog with overlay and content

### Theme Components
- **ThemeProvider** - Theme context provider
- **ThemeToggle** - Theme switcher component
- **useTheme** - Hook for accessing theme state

## 🎯 Theming

The library supports light, dark, and system themes:

### Using the Theme Toggle

```tsx
import { ThemeToggle } from '@codeguide/ui-library';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

### Programmatic Theme Control

```tsx
import { useTheme } from '@codeguide/ui-library';

function ThemeControls() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
}
```

### CSS Custom Properties

The library exposes CSS custom properties for styling:

```css
:root {
  --color-primary-500: #3b82f6;
  --color-secondary-500: #64748b;
  --spacing-4: 1rem;
  --radius-lg: 0.5rem;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## 🎨 Design Tokens

This library integrates with Figma design tokens through Cursor MCP plugin.

### Token Structure

```
src/tokens/
├── colors/
│   └── semantic.json
├── typography/
│   └── typography.json
├── spacing/
│   └── spacing.json
└── shadows/
    └── effects.json
```

### Syncing Tokens

```bash
# Manual sync
npm run tokens:sync

# Watch for changes
npm run tokens:watch
```

## 📚 Storybook

Explore all components interactively:

```bash
# Start Storybook development server
npm run storybook

# Build static Storybook
npm run build-storybook
```

Visit [http://localhost:6006](http://localhost:6006) to see the component library in action.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode
npm run test:ci
```

## 🔧 Development

### Building the Library

```bash
# Development build with watch
npm run dev

# Production build
npm run build
```

### Project Structure

```
src/
├── components/          # React components
│   ├── __tests__/      # Component tests
│   ├── *.stories.tsx   # Storybook stories
│   └── *.tsx          # Component files
├── tokens/            # Design tokens from Figma
├── lib/              # Utility functions
├── generated/        # Auto-generated token files
└── index.ts         # Main export file
```

## 📖 API Reference

### Button

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

### Card Components

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
```

### ThemeProvider

```tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}
```

## 🎨 Customization

### Extending Theme

You can override CSS custom properties in your application:

```css
:root {
  --color-primary-500: #your-color;
  --border-radius: 8px;
  --font-family-sans: 'Your Font', sans-serif;
}
```

### Using Design Tokens

```tsx
import { getColor, getSpacing } from '@codeguide/ui-library';

function CustomComponent() {
  return (
    <div style={{
      backgroundColor: getColor('primary', '500'),
      padding: getSpacing('4'),
      borderRadius: 'var(--radius-lg)',
    }}>
      Custom styled component
    </div>
  );
}
```

## 🚀 Publishing

The library is configured for npm publishing:

```bash
# Prepare for publishing (runs tests, lint, build)
npm run prepublishOnly

# Publish to npm
npm publish
```

## 📄 License

MIT © [CodeGuide Team](LICENSE)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- 📖 [Documentation](https://github.com/your-org/codeguide-ui-library#readme)
- 🐛 [Issue Tracker](https://github.com/your-org/codeguide-ui-library/issues)
- 💬 [Discussions](https://github.com/your-org/codeguide-ui-library/discussions)

## 🔗 Related Packages

- [@codeguide/design-tokens](https://github.com/your-org/design-tokens) - Design token definitions
- [@codeguide/eslint-config](https://github.com/your-org/eslint-config) - Shared ESLint configuration