import React from 'react';
import { render } from '@testing-library/react';

import ActionStatus from '../../components/ActionStatus';

test('renders the component', () => {
  const { container } = render(<ActionStatus type="" />);

  expect(container.firstChild).toBeVisible();
});

test('renders the component with error-icon when type is undefined', () => {
  const { getByTestId } = render(<ActionStatus type="" />);

  expect(getByTestId('error-icon')).toBeVisible();
});

test('renders the component with done-icon when type is "success"', () => {
  const { getByTestId } = render(<ActionStatus type="success" />);

  expect(getByTestId('done-icon')).toBeVisible();
});

test('renders the component with time-icon when type is "progress"', () => {
  const { getByTestId } = render(<ActionStatus type="progress" />);

  expect(getByTestId('time-icon')).toBeVisible();
});

test('renders a title if there is one', () => {
  const { getByText } = render(<ActionStatus type="" title="title" />);

  expect(getByText('title')).toBeVisible();
});
