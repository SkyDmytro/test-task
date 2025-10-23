import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number'],
    },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Text input',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password input',
  },
};

export const PasswordWithClear: Story = {
  args: {
    type: 'password',
    placeholder: 'Password input',
    clearable: true,
  },
};

export const Clearable: Story = {
  args: {
    placeholder: 'Clearable input',
    clearable: true,
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Number input',
  },
};
