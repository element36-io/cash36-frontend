export const formModel = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Contract Name'
  },
  {
    name: 'contractSymbol',
    type: 'text',
    label: 'Contract symbol',
    placeholder: 'Enter your contract symbol'
  },
  {
    type: 'checkboxArray',
    name: 'acceptedTokens',
    checkboxes: [{ id: 'CHF36', name: 'CHF36' }, { id: 'EUR36', name: 'EUR36' }]
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
