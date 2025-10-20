import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, ThemeToggle, useTheme } from '../ThemeToggle';
import { Button } from '../Button';
import { Card } from '../Card';

const meta = {
  title: 'Components/Theming',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to demonstrate theme functionality
const ThemeDemo = () => {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 p-6 bg-background text-foreground min-h-[400px] w-[600px] rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Theme Demo</h2>
        <ThemeToggle />
      </div>
      
      <div className="space-y-2">
        <p>Current theme: <strong>{theme}</strong></p>
        <p>Resolved theme: <strong>{resolvedTheme}</strong></p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Sample Card</h3>
            <p className="text-muted-foreground">This card adapts to the current theme.</p>
          </div>
        </Card>
        <Card className="border-primary">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Accent Card</h3>
            <p className="text-muted-foreground">This card uses primary colors.</p>
          </div>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const LightMode: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const SystemMode: Story = {
  render: () => (
    <ThemeProvider defaultTheme="system">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const ThemeToggleVariants: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex gap-4 items-center p-6 bg-background text-foreground rounded-lg border">
        <h3 className="font-semibold">Theme Toggle Variants:</h3>
        <ThemeToggle />
        <ThemeToggle variant="outline" />
        <ThemeToggle variant="ghost" />
        <ThemeToggle size="sm" />
        <ThemeToggle size="lg" />
        <ThemeToggle showLabel />
      </div>
    </ThemeProvider>
  ),
};