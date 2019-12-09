export const formModel = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Contract Name'
  },
  {
    name: 'contractAddress',
    type: 'text',
    label: 'Contract Address',
    placeholder: '0x67b5656d60a809915323bf2c40a8bef15a152e3e'
  },
  {
    name: 'acceptedTokens',
    type: 'select',
    label: 'Accepted Token(s)',
    list: [
      { value: ['EUR36'], label: 'EUR36' },
      { value: ['CHF36'], label: 'CHF36' },
      { value: ['EUR36', 'CHF36'], label: 'EUR36 and CHF36' }
    ],
    placeholder: 'Choose which token(s) you want to accept'
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
    placeholder: 'Enter the project website'
  },
  {
    name: 'access',
    type: 'select',
    label: 'Access',
    list: [
      { value: 'PUBLIC', label: 'Public' },
      { value: 'PRIVATE', label: 'Private' }
    ],
    placeholder: 'Determine the access scope of your project'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter your contract description'
  },
  {
    name: 'isWalletFree',
    type: 'checkbox',
    label: 'Is it wallet free?'
  }
];

export const initialValues = {
  name: '',
  contractAddress: '',
  description: '',
  acceptedTokens: '',
  investmentLink: '',
  website: '',
  access: '',
  isWalletFree: false
};
