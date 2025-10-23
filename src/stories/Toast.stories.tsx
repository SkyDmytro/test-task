import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, type ToastProps } from '../components/Toast/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    message: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'info', 'warning'],
    },
    duration: { control: 'number' },
  },
  tags: ['autodocs'],
};

export default meta;

const ToastWrapper: React.FC<Omit<ToastProps, 'show' | 'onClose'>> = (props) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <button onClick={() => setShowToast(true)}>Show Toast</button>
      <Toast {...props} show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

type Story = StoryObj<typeof ToastWrapper>;

export const Success: Story = {
  args: {
    message: 'This is a success toast!',
    type: 'success',
  },
  render: (args) => <ToastWrapper {...args} />,
};

export const Error: Story = {
  args: {
    message: 'This is an error toast!',
    type: 'error',
  },
  render: (args) => <ToastWrapper {...args} />,
};

export const Info: Story = {
  args: {
    message: 'This is an info toast.',
    type: 'info',
  },
  render: (args) => <ToastWrapper {...args} />,
};

export const Warning: Story = {
  args: {
    message: 'This is a warning toast.',
    type: 'warning',
  },
  render: (args) => <ToastWrapper {...args} />,
};

export const CustomDuration: Story = {
  args: {
    message: 'This toast lasts for 5 seconds.',
    type: 'info',
    duration: 5000,
  },
  render: (args) => <ToastWrapper {...args} />,
};
