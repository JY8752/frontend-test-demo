import type { Preview } from '@storybook/vue3'
import { withScreenshot} from 'storycap'

export const decorator = [withScreenshot]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
