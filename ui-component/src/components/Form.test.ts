import { fireEvent, render } from '@testing-library/vue';
import Form from './Form.vue';

test('フォームコンポーネントが正常に表示されていること', () => {
  const { getByText, getByRole } = render(Form, {
    props: {
      name: 'yamanaka',
    },
  });
  expect(getByText('yamanaka')).toBeInTheDocument();
  expect(getByRole('button')).toBeInTheDocument();
  expect(getByRole('heading')).toHaveTextContent('アカウント情報');
});

test('ボタンをクリックするとイベントハンドラーが実行される', () => {
  const mockFn = vi.fn();
  const { getByRole } = render(Form, {
    props: {
      name: 'yamanaka',
      onSubmit: mockFn,
    },
  });
  fireEvent.click(getByRole('button'));
  expect(mockFn).toHaveBeenCalled();
});
