import { subYears } from 'date-fns';

export const formModel = [
  {
    name: 'targetInvestment',
    type: 'text',
    label: 'Target Investment',
    placeholder: 'Enter the target Amount'
  },
  {
    name: 'acceptedToken',
    type: 'select',
    label: 'Accepted Token',
    list: [
      { value: 0, label: 'All at once - No votes' },
      { value: 1, label: '50% now - 50% then' },
      { value: 2, label: 'Iterative - 3 votes' },
      { value: 3, label: 'Custom' }
    ],
    placeholder: 'Select Token'
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    placeholder: 'DD/MM/YYYY',
    maxDate: subYears(new Date(), 18),
    initialFocusedDate: subYears(new Date(), 25)
  }
];

export const initialValues = {
  startDate: '',
  targetInvestment: '',
  acceptedToken: ''
};
