export const formModel = [
  {
    name: 'contractAddress',
    type: 'text',
    label: 'Contract Address',
    placeholder: 'Enter the address of the contract'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter your contract description'
  },
  {
    name: 'symbol',
    type: 'select',
    label: 'Token',
    list: [
      { value: 'EUR36', label: 'EUR36' },
      { value: 'CHF36', label: 'CHF36' }
    ],
    placeholder: 'Choose the token of contract'
  },
  {
    name: 'investmentLink',
    type: 'text',
    label: 'Link to your Dapp',
    placeholder: 'Enter your dapp link'
  },
  {
    name: 'website',
    type: 'text',
    label: 'Project website',
    placeholder: 'Enter the project website.'
  },
  {
    name: 'access',
    type: 'text',
    label: 'Contract Address',
    placeholder: 'Enter the address of the contract'
  }
];

export const initialValues = {
  contractAddress: '',
  description: '',
  symbol: '',
  investmentLink: '',
  website: '',
  access: ''
};
