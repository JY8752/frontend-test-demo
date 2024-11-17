import { Meta, StoryObj } from "@storybook/vue3";
import Hello from "../components/Hello.vue";
import { handleMe } from "../__mock__/me/msw";

const meta = {
  title: 'Example/Hello',
  component: Hello,
  tags: ['autodocs'],
} satisfies Meta<typeof Hello>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [handleMe()],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [handleMe({ delay: 1000 })],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleMe({ status: 500 })],
    },
  },
};
