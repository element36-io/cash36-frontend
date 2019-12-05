export const formModel = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Contract Name'
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
    placeholder: 'Public/Private'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter your contract description'
  }
];
