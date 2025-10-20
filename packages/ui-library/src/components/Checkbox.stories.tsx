import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'checkbox-default',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-default">Accept terms and conditions</label>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-checked">Already checked</label>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-disabled" className="text-gray-500">Disabled option</label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  args: {
    id: 'checkbox-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-disabled-checked" className="text-gray-500">Disabled and checked</label>
    </div>
  ),
};

export const Required: Story = {
  args: {
    id: 'checkbox-required',
    required: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-required">Required field *</label>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <form className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <label htmlFor="newsletter">Subscribe to newsletter</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="updates" defaultChecked />
        <label htmlFor="updates">Receive product updates</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <label htmlFor="marketing">Marketing communications</label>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Save Preferences
      </button>
    </form>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Select your interests:</h3>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest1" />
        <label htmlFor="interest1">Technology</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest2" defaultChecked />
        <label htmlFor="interest2">Design</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest3" />
        <label htmlFor="interest3">Business</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="interest4" defaultChecked />
        <label htmlFor="interest4">Marketing</label>
      </div>
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    id: 'checkbox-standalone',
  },
  render: (args) => <Checkbox {...args} />,
};

export const CustomStyling: Story = {
  args: {
    id: 'checkbox-custom',
    className: 'border-purple-500 data-[state=checked]:bg-purple-500',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-custom">Custom styled checkbox</label>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-lg font-medium">Privacy Settings</legend>
      <div className="flex items-center space-x-2">
        <Checkbox id="public" name="privacy" value="public" />
        <label htmlFor="public">Public profile</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="friends" name="privacy" value="friends" defaultChecked />
        <label htmlFor="friends">Visible to friends</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="private" name="privacy" value="private" />
        <label htmlFor="private">Private profile</label>
      </div>
    </fieldset>
  ),
};