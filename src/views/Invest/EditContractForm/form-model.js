export const formModel = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Contract Name'
  },
  {
    name: 'symbol',
    type: 'select',
    label: 'Token',
    list: [
      { value: 'EUR36', label: 'EUR36' },
      { value: 'CHF36', label: 'CHF36' }
    ],
    placeholder: 'EUR36/CHF36'
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
    placeholder: 'Public/Private'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter your contract description'
  }
];
