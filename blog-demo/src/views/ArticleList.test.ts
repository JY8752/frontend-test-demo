import { expect, test } from 'vitest'
import { setupMockServer } from '../tests/setup'
import { handlers } from './__mock__/msw'
import { render } from '@testing-library/vue'
import ArticleList from './ArticleList.vue'

setupMockServer(...handlers)

test('記事一覧が表示される', async () => {
  const { findAllByRole } = render(ArticleList)
  expect(await findAllByRole('heading', { level: 2 })).toHaveLength(2)
})
