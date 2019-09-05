import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { renderWithRouter } from '../../../helpers/tests.helpers';

import { Step1Tier1Form } from '../../../views/Kyc/Step1Tier1Form/Step1Tier1Form';
import { fireEvent } from '@testing-library/react';

const props = {
  countries: [],
  nationalities: [],
  changeSteps: jest.fn(),
  getCountries: jest.fn()
};

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Step1Tier1Form {...props} />
    </MuiPickersUtilsProvider>
  );

  expect(getByText(/verification process - step 1/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
  expect(getByText(/submit & continue/i)).toBeInTheDocument();
});

test('date field', () => {
  const { getByLabelText } = renderWithRouter(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Step1Tier1Form {...props} />
    </MuiPickersUtilsProvider>
  );

  const dateField = getByLabelText('Date of Birth');

  expect(dateField).toBeInTheDocument();
  expect(dateField.value).toBe('');

  fireEvent.change(dateField, { target: { value: '11/11/1994' } });

  expect(dateField.value).toBe('11.11.1994');
});

describe('text input fields', () => {
  let component;

  beforeEach(() => {
    component = renderWithRouter(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Step1Tier1Form {...props} />
      </MuiPickersUtilsProvider>
    );
  });

  test('renders and updates the First Name(s) field', () => {
    const { getByLabelText } = component;

    const firstNameField = getByLabelText('First Name(s)');

    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe('');

    fireEvent.change(firstNameField, { target: { value: 'John' } });

    expect(firstNameField.value).toBe('John');
  });

  test('renders and updates the Last Name field', () => {
    const { getByLabelText } = component;

    const lastNameField = getByLabelText('Last Name');

    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField.value).toBe('');

    fireEvent.change(lastNameField, { target: { value: 'Doe' } });

    expect(lastNameField.value).toBe('Doe');
  });

  test('renders and updates the Email Address field', () => {
    const { getByLabelText } = component;

    const emailField = getByLabelText('Email Address');

    expect(emailField).toBeInTheDocument();
    expect(emailField.value).toBe('');

    fireEvent.change(emailField, { target: { value: 'test@example.com' } });

    expect(emailField.value).toBe('test@example.com');
  });

  test('renders and updates the Street field', () => {
    const { getByLabelText } = component;

    const streetField = getByLabelText('Street');

    expect(streetField).toBeInTheDocument();
    expect(streetField.value).toBe('');

    fireEvent.change(streetField, { target: { value: 'Main St' } });

    expect(streetField.value).toBe('Main St');
  });

  test('renders and updates the Street Number field', () => {
    const { getByLabelText } = component;

    const streetNumberField = getByLabelText('Street Number');

    expect(streetNumberField).toBeInTheDocument();
    expect(streetNumberField.value).toBe('');

    fireEvent.change(streetNumberField, { target: { value: '5' } });

    expect(streetNumberField.value).toBe('5');
  });

  test('renders and updates the Town/City field', () => {
    const { getByLabelText } = component;

    const townField = getByLabelText('Town/City');

    expect(townField).toBeInTheDocument();
    expect(townField.value).toBe('');

    fireEvent.change(townField, { target: { value: 'Bern' } });

    expect(townField.value).toBe('Bern');
  });

  test('renders and updates the ZIP Code field', () => {
    const { getByLabelText } = component;

    const zipCodeField = getByLabelText('ZIP Code');

    expect(zipCodeField).toBeInTheDocument();
    expect(zipCodeField.value).toBe('');

    fireEvent.change(zipCodeField, { target: { value: '1000' } });

    expect(zipCodeField.value).toBe('1000');
  });

  test('renders and updates the IBAN field', () => {
    const { getByLabelText } = component;

    const ibanField = getByLabelText('IBAN');

    expect(ibanField).toBeInTheDocument();
    expect(ibanField.value).toBe('');

    fireEvent.change(ibanField, { target: { value: 'CH0000001' } });

    expect(ibanField.value).toBe('CH0000001');
  });
});

describe('select input fields', () => {
  const countries = [
    { code: 'IT', name: 'Italy' },
    { code: 'CH', name: 'Switzerland' }
  ];
  const nationalities = [
    { code: 'IT', name: 'Italian' },
    { code: 'CH', name: 'Swiss' }
  ];

  let component;

  beforeEach(() => {
    component = renderWithRouter(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Step1Tier1Form
          {...props}
          countries={countries}
          nationalities={nationalities}
        />
      </MuiPickersUtilsProvider>
    );
  });

  test('renders and updates the Select your country field', () => {
    const { getByLabelText } = component;

    const countryField = getByLabelText('Select your country');

    expect(countryField).toBeInTheDocument();
    expect(countryField.value).toBe('');

    fireEvent.change(countryField, { target: { value: 'Italy' } });

    expect(countryField.value).toBe('Italy');
  });

  test('renders and updates the Select your nationality 1 field', () => {
    const { getByLabelText } = component;

    const nationalityField = getByLabelText('Select your nationality 1');

    expect(nationalityField).toBeInTheDocument();
    expect(nationalityField.value).toBe('');

    fireEvent.change(nationalityField, { target: { value: 'Italian' } });

    expect(nationalityField.value).toBe('Italian');
  });

  test('renders and updates the Select your nationality 2 field', () => {
    const { getByLabelText } = component;

    const nationalityField = getByLabelText('Select your nationality 2');

    expect(nationalityField).toBeInTheDocument();
    expect(nationalityField.value).toBe('');

    fireEvent.change(nationalityField, { target: { value: 'Italian' } });

    expect(nationalityField.value).toBe('Italian');
  });

  test('renders and updates the Select your nationality 3 field', () => {
    const { getByLabelText } = component;

    const nationalityField = getByLabelText('Select your nationality 3');

    expect(nationalityField).toBeInTheDocument();
    expect(nationalityField.value).toBe('');

    fireEvent.change(nationalityField, { target: { value: 'Italian' } });

    expect(nationalityField.value).toBe('Italian');
  });

  test('renders and updates the Select your nationality 4 field', () => {
    const { getByLabelText } = component;

    const nationalityField = getByLabelText('Select your nationality 4');

    expect(nationalityField).toBeInTheDocument();
    expect(nationalityField.value).toBe('');

    fireEvent.change(nationalityField, { target: { value: 'Italian' } });

    expect(nationalityField.value).toBe('Italian');
  });
});
