import React from 'react';

import { render } from '@testing-library/react';

import ArrowButton from '../../../views/Transfer/ArrowButton';

test('renders the component', () => {
  const { getByTestId } = render(<ArrowButton />);

  expect(getByTestId('arrow-button')).toBeInTheDocument();
});
