import type { Preview } from "@storybook/vue3";
import { mswDecorator, initialize } from 'msw-storybook-addon';

export const decorators = [mswDecorator];

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
