import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphonex',
    },
    screenshot: {
      viewport: {
        width: 375,
        height: 812,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};
