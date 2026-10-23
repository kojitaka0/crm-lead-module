import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { CreateLeadModal } from './CreateLeadModal';

const meta: Meta<typeof CreateLeadModal> = {
  title: 'CRM/CreateLeadModal',
  component: CreateLeadModal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CreateLeadModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
  },
};
