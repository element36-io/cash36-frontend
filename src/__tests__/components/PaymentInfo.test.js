import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import PaymentInfo from '../../components/PaymentInfo';

const info = {
  amount: 10,
  bankAddress: 'Main St 5, 1000 Philadelphia',
  bankBic: 'KESSQE',
  bankCountry: 'Switzerland',
  bankCountryCode: 'CH',
  bankName: 'Philadelphia Bank',
  currency: null,
  paymentReferenceId: '123456',
  receipientAddress: 'Second St 5, Zug',
  receipientIban: 'RS10340341403',
  receipientName: 'element36 AG',
  userIban: 'RS1343123434'
};

test('renders the component', () => {
  const { getByText } = render(<PaymentInfo info={info} />);

  expect(getByText('Switzerland')).toBeVisible();
  expect(getByText('123456')).toBeVisible();
  expect(getByText('KESSQE')).toBeVisible();
  expect(getByText('Philadelphia Bank')).toBeVisible();
});

test('renders the warning message', () => {
  const { getByText } = render(<PaymentInfo info={info} />);

  expect(getByText('This must be included exactly for your transfer to work'));
});

test('shows the title if passed in', () => {
  const title = 'title';
  const { getByTestId } = render(<PaymentInfo info={info} title={title} />);

  expect(getByTestId('payment-info__title')).toBeVisible();
});

test("doesn't show title if title is not passed in", () => {
  const { queryByTestId } = render(<PaymentInfo info={info} />);

  expect(queryByTestId('payment-info__title')).toBeNull();
});

describe('component is a modal', () => {
  test('shows close button', () => {
    const { getByTestId } = render(<PaymentInfo info={info} isModal />);

    expect(getByTestId('payment-info__close-icon')).toBeVisible();
  });

  test('calls closeModal on close button click', () => {
    const closeModal = jest.fn();
    const { getByTestId } = render(
      <PaymentInfo info={info} isModal closeModal={closeModal} />
    );

    fireEvent.click(getByTestId('payment-info__close-icon'));

    expect(closeModal).toHaveBeenCalled();
  });
});
