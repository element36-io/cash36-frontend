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
    type: 'checkboxArray',
    name: 'acceptedTokens',
    checkboxes: [{ id: 'CHF36', name: 'CHF36' }, { id: 'EUR36', name: 'EUR36' }]
  },
  {
    name: 'contractSymbol',
    type: 'text',
    label: 'Contract symbol',
    placeholder: 'Enter your contract symbol'
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
  acceptedTokens: [],
  contractSymbol: '',
  investmentLink: '',
  website: '',
  access: '',
  isWalletFree: false
};
