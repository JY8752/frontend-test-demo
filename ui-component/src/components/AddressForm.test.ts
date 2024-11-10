import { logRoles, render, screen } from '@testing-library/vue';
import AddressForm, { AddressOption } from './AddressForm.vue';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

// ユーザー操作

async function inputContactNumber(
  input = {
    name: 'test user',
    phoneNumber: '000-0000-0000',
  }
) {
  await user.type(
    screen.getByRole('textbox', { name: '電話番号' }),
    input.phoneNumber
  );
  await user.type(screen.getByRole('textbox', { name: 'お名前' }), input.name);
  return input;
}

async function inputAddress(
  input = {
    postalCode: '123-4567',
    prefectures: '東京都',
    municipalities: '杉並区荻窪1',
    streetNumber: '00-00',
  }
) {
  await user.type(
    screen.getByRole('textbox', { name: '郵便番号' }),
    input.postalCode
  );
  await user.type(
    screen.getByRole('textbox', { name: '都道府県' }),
    input.prefectures
  );
  await user.type(
    screen.getByRole('textbox', { name: '市区町村' }),
    input.municipalities
  );
  await user.type(
    screen.getByRole('textbox', { name: '番地番号' }),
    input.streetNumber
  );
  return input;
}

async function clickSubmit() {
  return user.click(
    screen.getByRole('button', { name: '注文内容の確認へ進む' })
  );
}

// テスト用のモック関数

function mockHandleSubmit() {
  const mockFn = vi.fn();
  const onSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: { [k: string]: unknown } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    mockFn(data);
  };
  return [mockFn, onSubmit];
}

// テスト用のレンダリング関数

function renderAddressForm({
  deliveryAddresses,
  onSubmit,
}: {
  deliveryAddresses?: AddressOption[];
  onSubmit?: (e: Event) => void;
}) {
  return render(AddressForm, {
    props: {
      deliveryAddresses,
      onSubmit,
    },
  });
}

// テストデータ

const deliveryAddresses = [
  {
    id: '1',
    value: 'address_id_xxx',
    children: 'test',
  },
];

test('過去のお届け先がない時、お届け先フォームが表示される', () => {
  const { getByRole } = render(AddressForm);
  expect(getByRole('group', { name: '連絡先' })).toBeInTheDocument();
  expect(getByRole('group', { name: 'お届け先' })).toBeInTheDocument();
});

describe('過去のお届け先がない場合', () => {
  test('入力、送信すると、入力内容が送信される', async () => {
    const [mockFn, onSubmit] = mockHandleSubmit();
    renderAddressForm({ onSubmit });

    const contactInput = await inputContactNumber();
    const addressInput = await inputAddress();

    await clickSubmit();

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({ ...contactInput, ...addressInput })
    );
  });
});

describe('過去のお届け先がある場合', () => {
  test('設問に答えるまでは、お届け先を選べない', async () => {
    renderAddressForm({ deliveryAddresses });
    expect(
      screen.getByRole('group', { name: '新しいお届け先を登録しますか？' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: '過去のお届け先' })
    ).toBeDisabled();
  });
  test('「いいえ」を選択、入力、送信すると、入力内容が送信される', async () => {
    const [mockFn, onSubmit] = mockHandleSubmit();
    renderAddressForm({ deliveryAddresses, onSubmit });

    await user.click(screen.getByLabelText('いいえ'));
    expect(
      screen.getByRole('group', { name: '過去のお届け先' })
    ).toBeInTheDocument();

    const inputValues = await inputContactNumber();
    await clickSubmit();
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({ ...inputValues })
    );
  });
  test('「はい」を選択、入力、送信すると、入力内容が送信される', async () => {
    const [mockFn, onSubmit] = mockHandleSubmit();
    renderAddressForm({ deliveryAddresses, onSubmit });

    await user.click(screen.getByLabelText('はい'));
    expect(
      screen.getByRole('group', { name: '新しいお届け先' })
    ).toBeInTheDocument();

    const inputValues = await inputContactNumber();
    const addressInput = await inputAddress();

    await clickSubmit();
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({ ...inputValues, ...addressInput })
    );
  });
});

test('Snapshot', () => {
  const { container } = renderAddressForm({ deliveryAddresses });
  expect(container).toMatchSnapshot();
});

test('アクセシビリティの確認', () => {
  const { container } = renderAddressForm({ deliveryAddresses });
  logRoles(container as HTMLElement);
});
