import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import FileInput from '../../../views/Kyc/FileInput';

const props = {
  removeCallback: jest.fn(),
  changeCallback: jest.fn(),
  documentType: 'picture'
};

test('renders the component', () => {
  const { getByText } = render(<FileInput {...props} />);

  expect(getByText(/upload a document or an image/i)).toBeInTheDocument();
});

test('calls changeCallback on file input', async () => {
  const changeCallback = jest.fn();
  const { getByTestId } = render(
    <FileInput {...props} changeCallback={changeCallback} />
  );

  const fileInput = getByTestId('kyc__file-input');
  const file = new File(['(⌐□_□)'], 'johndoe.png', { type: 'image/png' });

  fireEvent.change(fileInput, { target: { files: [file] } });

  await wait(() => {
    expect(changeCallback).toHaveBeenCalledTimes(1);
  });
});
