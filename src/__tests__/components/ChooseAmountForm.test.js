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
  const { container } = render(<ChooseAmountForm {...props} />);

  expect(container.firstChild).toBeVisible();
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
