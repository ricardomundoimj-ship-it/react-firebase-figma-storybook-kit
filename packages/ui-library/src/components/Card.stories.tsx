import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Card without header. Just content directly in the card.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>No footer on this card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card only has a header and content, no footer section.</p>
      </CardContent>
    </Card>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Minimal card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Long Content</CardTitle>
        <CardDescription>This card contains a lot of content to test scrolling behavior</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This is the first paragraph of content. It demonstrates how text flows within the card content area.
        </p>
        <p className="mb-4">
          This is the second paragraph. Cards can contain multiple paragraphs of text to organize information effectively.
        </p>
        <p className="mb-4">
          You can also include other elements like lists:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>First list item</li>
          <li>Second list item</li>
          <li>Third list item</li>
        </ul>
        <p>
          This shows that cards can handle various types of content while maintaining a clean, organized appearance.
        </p>
      </CardContent>
      <CardFooter>
        <p>End of card content</p>
      </CardFooter>
    </Card>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Card className="w-[350px] border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="text-purple-800">Custom Styled Card</CardTitle>
        <CardDescription className="text-purple-600">This card has custom styling applied</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-purple-700">The content area can also have custom styling.</p>
      </CardContent>
      <CardFooter className="border-t-purple-200">
        <p className="text-purple-600">Custom footer</p>
      </CardFooter>
    </Card>
  ),
};