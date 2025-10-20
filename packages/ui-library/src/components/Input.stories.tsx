import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample value',
    placeholder: 'Enter text here...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input...',
  },
};

export const WithError: Story = {
  args: {
    className: 'border-red-500 focus:border-red-500',
    placeholder: 'Input with error state...',
  },
};

export const CustomWidth: Story = {
  args: {
    className: 'w-96',
    placeholder: 'Wide input field...',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const TelInput: Story = {
  args: {
    type: 'tel',
    placeholder: 'Enter phone number...',
  },
};

export const UrlInput: Story = {
  args: {
    type: 'url',
    placeholder: 'Enter URL...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Default value',
    placeholder: 'Enter text here...',
  },
};

export const InputVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input placeholder="Default input" />
      <Input type="password" placeholder="Password input" />
      <Input type="email" placeholder="Email input" />
      <Input type="number" placeholder="Number input" />
      <Input disabled placeholder="Disabled input" />
      <Input className="border-red-500 focus:border-red-500" placeholder="Error state" />
    </div>
  ),
};