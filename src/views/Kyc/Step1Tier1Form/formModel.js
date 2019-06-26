import moment from 'moment';

export const formModel = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name(s)',
    placeholder: 'Enter your First Name'
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Enter your Last Name'
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: 'DD.MM.YYYY',
    maxDate: new Date(
      moment()
        .subtract(18, 'years')
        .format()
    ),
    initialFocusedDate: new Date(
      moment()
        .subtract(25, 'years')
        .format()
    )
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email Address',
    placeholder: 'Enter your Email Address'
  },
  {
    name: 'street',
    type: 'text',
    label: 'Street',
    placeholder: 'Enter your Street'
  },
  {
    name: 'streetNr',
    type: 'text',
    label: 'Street Number',
    placeholder: 'Enter your Street Number'
  },
  {
    name: 'city',
    type: 'text',
    label: 'Town/City',
    placeholder: 'Enter your City'
  },
  {
    name: 'zip',
    type: 'text',
    label: 'ZIP Code',
    placeholder: 'Enter your ZIP Code'
  },
  {
    name: 'country',
    type: 'autocomplete',
    label: 'Select your country',
    list: [],
    placeholder: 'Select your country'
  }
];

export const nationalityModel = [
  {
    name: 'nationality',
    type: 'autocomplete',
    label: 'Select your nationality 1',
    list: [],
    placeholder: 'Select your nationality'
  },
  {
    name: 'nationality2',
    type: 'autocomplete',
    label: 'Select your nationality 2',
    list: [],
    placeholder: 'Select your nationality'
  },
  {
    name: 'nationality3',
    type: 'autocomplete',
    label: 'Select your nationality 3',
    list: [],
    placeholder: 'Select your nationality'
  },
  {
    name: 'nationality4',
    type: 'autocomplete',
    label: 'Select your nationality 4',
    list: [],
    placeholder: 'Select your nationality'
  }
];

export const ibanModel = {
  name: 'iban',
  type: 'text',
  label: 'IBAN',
  placeholder: 'Enter your IBAN'
};

export const initialValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  city: '',
  street: '',
  country: '',
  nationality: '',
  nationality2: '',
  nationality3: '',
  nationality4: '',
  streetNr: '',
  zip: '',
  email: '',
  iban: ''
};
