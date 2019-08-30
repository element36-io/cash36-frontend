import React from 'react';
import { render } from '@testing-library/react';

import TokenIcon from '../../components/TokenIcon';

test('renders a CHF36 icon', () => {
  const { getByAltText } = render(<TokenIcon symbol={'CHF36'} />);

  expect(getByAltText('FRANC TOKEN')).toBeVisible();
});
test('renders a EUR36 icon', () => {
  const { getByAltText } = render(<TokenIcon symbol={'EUR36'} />);

  expect(getByAltText('EURO TOKEN')).toBeVisible();
});
test('renders a USD36 icon', () => {
  const { getByAltText } = render(<TokenIcon symbol={'USD36'} />);

  expect(getByAltText('DOLLAR TOKEN')).toBeVisible();
});
test('renders a GBP36 icon', () => {
  const { getByAltText } = render(<TokenIcon symbol={'GBP36'} />);

  expect(getByAltText('POUND TOKEN')).toBeVisible();
});

test("renders nothing if symbol doesn't exist", () => {
  const { container } = render(<TokenIcon symbol={'random text'} />);

  expect(container.firstChild).toBeNull();
});
