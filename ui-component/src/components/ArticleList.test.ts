import { render, within } from '@testing-library/vue';
import { ItemProps } from './ArticleItem.vue';
import ArticleList from './ArticleList.vue';

const items: ItemProps[] = [
  {
    id: 'howto-testing-with-typescript',
    title: 'TypeScriptを使ったテストの書き方',
    body: 'テストを書くとき、TypeScriptを使うことで、テストの保守性が向上します…',
  },
  {
    id: 'nextjs-link-component',
    title: 'Next.jsのLinkコンポーネント',
    body: 'Next.jsの画面遷移には、Linkコンポーネントを使用します…',
  },
  {
    id: 'react-component-testing-with-jest',
    title: 'JestではじめるReactのコンポーネントテスト',
    body: 'Jestは単体テストとして、UIコンポーネントのテストが可能です…',
  },
];

function _render(_items: ItemProps[]) {
  return render(ArticleList, {
    props: {
      items: _items,
    },
  });
}

test('itemsの数だけ一覧表示される', () => {
  const { getAllByRole } = _render(items);
  expect(getAllByRole('listitem')).toHaveLength(3);
});

test('一覧が表示されること', () => {
  const { getByRole } = _render(items);
  expect(getByRole('list')).toBeInTheDocument();
});

test('itemsの数だけ一覧表示される', () => {
  const { getByRole } = _render(items);
  const list = getByRole('list');
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole('listitem')).toHaveLength(3);
});

test('一覧アイテムがからの時「投稿記事がありません」が表示される', () => {
  const { queryByRole, getByText } = _render([]);
  const list = queryByRole('list');
  expect(list).not.toBeInTheDocument();
  expect(getByText('投稿記事がありません')).toBeInTheDocument();
});
