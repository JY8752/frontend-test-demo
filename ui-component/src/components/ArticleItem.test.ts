import { render, RenderResult, within } from '@testing-library/vue';
import ArticleItem, { ItemProps } from './ArticleItem.vue';

const item: ItemProps = {
  id: 'test',
  title: 'test-title',
  body: 'testです',
};

function _render(_item: ItemProps): RenderResult {
  return render(ArticleItem, { props: _item });
}

test('一覧要素として表示される', () => {
  const { getByRole } = _render(item);
  expect(getByRole('listitem')).toBeInTheDocument();
});

test('記事タイトルが表示される', () => {
  const { getByRole } = _render(item);
  expect(getByRole('heading', { level: 3 })).toHaveTextContent('test-title');
});

test('記事の内容が表示される', () => {
  const { getByText } = _render(item);
  expect(getByText('testです')).toBeInTheDocument();
});

test('指定のidのリンクが表示される', () => {
  const { getByRole } = _render(item);
  expect(getByRole('link', { name: 'もっと見る' })).toHaveAttribute(
    'href',
    '/articles/test'
  );
});
