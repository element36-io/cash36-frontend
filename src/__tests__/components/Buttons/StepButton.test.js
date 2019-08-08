import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import StepButton from '../../../components/Buttons/StepButton';

const onClick = jest.fn();
const text = 'text';

test('renders the component', () => {
  const { getByText } = render(<StepButton text={text} onClick={onClick} />);

  expect(getByText('text')).toBeVisible();
});

test('calls onClick on click', () => {
  const { getByText } = render(
    <StepButton onClick={onClick} text={text}>
      children
    </StepButton>
  );

  fireEvent.click(getByText('text'));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('renders an arrow icon', () => {
  const { getByTestId } = render(<StepButton onClick={onClick} />);

  expect(getByTestId('step-button__arrow')).toBeVisible();
});
