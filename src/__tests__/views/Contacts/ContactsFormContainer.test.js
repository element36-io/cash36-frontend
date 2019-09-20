import React from 'react';
import Web3 from 'web3';
import { fireEvent } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';

import { renderWithRedux } from '../../../helpers/tests.helpers';
import ContactsFormContainer from '../../../views/Contacts/ContactFormContainer';
import { Web3Context } from '../../../providers/web3.provider';

const renderWithProviders = component => {
  return renderWithRedux(
    <ResponsiveContext.Provider value={{ width: 1200 }}>
      <Web3Context.Provider
        value={{
          networkId: '3',
          network: 'TestNetwork',
          web3: new Web3()
        }}
      >
        {component}
      </Web3Context.Provider>
    </ResponsiveContext.Provider>,
    { initialState }
  );
};

const initialState = {
  auth: {
    user: {
      username: '0x00000000001',
      useMetamask: false
    }
  }
};

const props = {
  isActive: true,
  onSubmit: jest.fn(),
  closeForm: jest.fn(),
  contactsList: [{ id: '1' }, { id: '2' }]
};

test('renders the component', () => {
  const { getByText } = renderWithProviders(
    <ContactsFormContainer {...props} />
  );

  expect(getByText(/add contact/i)).toBeInTheDocument();
});

test("doesn't render if isActive is false", () => {
  const { queryByText } = renderWithProviders(
    <ContactsFormContainer {...props} isActive={false} />
  );

  expect(queryByText(/add contact/i)).toBeNull();
});

test('calls onClose the form if close icon is clicked', () => {
  const closeForm = jest.fn();
  const { getByTestId } = renderWithProviders(
    <ContactsFormContainer {...props} closeForm={closeForm} />
  );

  fireEvent.click(getByTestId('contact-form__close'));

  expect(closeForm).toHaveBeenCalledTimes(1);
});
