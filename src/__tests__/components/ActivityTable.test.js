import React from 'react';
import { render } from '@testing-library/react';

import ActivityTable from '../../components/ActivityTable';
import { formatAmount } from '../../helpers/currencies.helpers';

const userActivity = [
  {
    action: 'BUY',
    amount: 15,
    date: '06.08.2019',
    paymentInfo: null,
    status: 'COMPLETED',
    symbol: 'CHF36',
    targetAddress: '0x95ff342a3db1a7dd6cd81ff02a4bd6dcba68f3f0',
    txHash: '0xc49ca0c54824c440139ddfcc161458345e98f45f7326c0bd0c9ffc2758c96573'
  }
];

test('should render a component', () => {
  const { container } = render(<ActivityTable userActivity={userActivity} />);

  expect(container.firstChild).toBeVisible();
});

describe('date', () => {
  test('should show proper date format', () => {
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Aug')).toBeVisible();
    expect(getByText('06')).toBeVisible();
  });
});

describe('action', () => {
  test('should show proper status on BUY tokens', () => {
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Bought Tokens')).toBeVisible();
  });

  test('should show proper status on SELL tokens', () => {
    userActivity[0].action = 'SELL';
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Sold Tokens')).toBeVisible();
  });

  test('should show proper status on SENT tokens', () => {
    userActivity[0].action = 'SENT';
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Sent to')).toBeVisible();
  });

  test('should show proper status on TRANSFERED tokens', () => {
    userActivity[0].action = 'RECEIVED';
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Bought Tokens')).toBeVisible();
  });

  test('should show proper address', () => {
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText(userActivity[0].targetAddress)).toBeVisible();
  });
});

describe('status', () => {
  test('should show proper status on COMPLETED', () => {
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Completed')).toBeVisible();
  });

  test('should show proper status on PROCESSING', () => {
    userActivity[0].status = 'PROCESSING';

    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Processing')).toBeVisible();
  });

  test('should show proper status on OPEN', () => {
    userActivity[0].status = 'OPEN';

    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('Open')).toBeVisible();
  });

  test('should show proper status on ON HOLD', () => {
    userActivity[0].status = 'ON_HOLD';

    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('On Hold')).toBeVisible();
  });
});

describe('amount', () => {
  test('should show the proper symbol', () => {
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText('CHF36')).toBeVisible();
  });

  test('should show the proper amount if BUY', () => {
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText(`+${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });

  test('should show the proper amount if RECEIVED', () => {
    userActivity[0].action = 'RECEIVED';
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText(`+${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });

  test('should show the proper amount if SELL', () => {
    userActivity[0].action = 'SELL';
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText(`-${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });

  test('should show the proper amount if SENT', () => {
    userActivity[0].action = 'SENT';
    const { getByText } = render(<ActivityTable userActivity={userActivity} />);

    expect(getByText(`-${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });
});
