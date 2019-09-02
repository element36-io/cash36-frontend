import React from 'react';
import { render } from '@testing-library/react';

import ProcessHeader from '../../../views/Kyc/ProcessHeader';

test('renders the component', () => {
  const { getByText } = render(
    <ProcessHeader title="start" subtitle="process subtitle" />
  );

  expect(getByText('start')).toBeInTheDocument();
  expect(getByText('process subtitle')).toBeInTheDocument();
});
