import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ChooseAmountForm } from '../../components/ChooseAmountForm/ChooseAmountForm';

const props = {
  tokenSymbols: ['CHF36', 'EUR36'],
  amount: '',
  symbol: 'CHF36',
  handleChange: jest.fn()
};

test('renders the component', () => {
  const { getByText } = render(<ChooseAmountForm {...props} />);

  expect(getByText('CHF36')).toBeVisible();
});

describe('numeric input change', () => {
  test('calls handleChange on string input', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ChooseAmountForm {...props} handleChange={handleChange} />
    );

    const input = getByPlaceholderText('0');

    fireEvent.input(input, {
      target: {
        value: '2'
      }
    });

    expect(handleChange).toHaveBeenCalled();
  });

  test("doesn't call handleChange on string input", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ChooseAmountForm {...props} handleChange={handleChange} />
    );

    const input = getByPlaceholderText('0');

    fireEvent.input(input, {
      target: {
        value: ''
      }
    });

    expect(handleChange).not.toHaveBeenCalled();
  });
});

describe('select input', () => {
  test('displays the correct value of select input', () => {
    const { getByPlaceholderText } = render(<ChooseAmountForm {...props} />);

    const input = getByPlaceholderText('TOKEN36');

    expect(input.value).toBe('CHF36');
  });

  test('changes the value of select input on change', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ChooseAmountForm {...props} handleChange={handleChange} />
    );

    const input = getByPlaceholderText('TOKEN36');

    fireEvent.input(input, {
      target: {
        value: 'EUR36'
      }
    });

    expect(input.value).toBe('EUR36');
  });
});
