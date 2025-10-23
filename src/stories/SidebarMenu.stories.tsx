import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu, type SidebarMenuProps } from '../components/SidebarMenu/SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  tags: ['autodocs'],
};

export default meta;

const menuItemsLvl1 = [
  { label: 'Home' },
  { label: 'About' },
  { label: 'Services' },
  { label: 'Contact' },
];

const menuItemsLvl2 = [
  { label: 'Home' },
  {
    label: 'Products',
    children: [{ label: 'Laptops' }, { label: 'Smartphones' }, { label: 'Tablets' }],
  },
  {
    label: 'Services',
    children: [{ label: 'Web Development' }, { label: 'Mobile App Development' }],
  },
  { label: 'Contact' },
];

const SidebarMenuWrapper: React.FC<Omit<SidebarMenuProps, 'isOpen' | 'onClose'>> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Sidebar</button>
      <SidebarMenu {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

type Story = StoryObj<typeof SidebarMenuWrapper>;

export const Level1: Story = {
  args: {
    items: menuItemsLvl1,
  },
  render: (args) => <SidebarMenuWrapper {...args} />,
};

export const Level2: Story = {
  args: {
    items: menuItemsLvl2,
  },
  render: (args) => <SidebarMenuWrapper {...args} />,
};
