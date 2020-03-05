import React from 'react';
import { fireEvent } from '@testing-library/react';

import ActivityTable from '../../components/ActivityTable';
import Status from '../../components/ActivityTable/Status';
import Row from '../../components/ActivityTable/Row';
import { renderWithWeb3Context } from '../../helpers/tests.helpers';

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
    txHash:
      '0xc49ca0c54824c440139ddfcc161458345e98f45f7326c0bd0c9ffc2758c96573',
    id: '1'
  }
];

test('renders the component', () => {
  const { getByText } = renderWithWeb3Context(
    <ActivityTable userActivity={userActivity} />
  );

  expect(getByText('CHF36')).toBeVisible();
  expect(getByText('0x95ff342a3db1a7dd6cd81ff02a4bd6dcba68f3f0')).toBeVisible();
});

describe('date', () => {
  test('shows proper date format', () => {
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Aug')).toBeVisible();
    expect(getByText('06')).toBeVisible();
  });
});

describe('action', () => {
  test('shows proper status on BUY tokens', () => {
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('New tokens created')).toBeVisible();
  });

  test('shows proper status on SELL tokens', () => {
    userActivity[0].action = 'SELL';
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Sold tokens')).toBeVisible();
  });

  test('shows proper status on SENT tokens', () => {
    userActivity[0].action = 'SENT';
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Tokens sent to')).toBeVisible();
  });

  test('shows proper status on TRANSFERED tokens', () => {
    userActivity[0].action = 'RECEIVED';
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Received tokens')).toBeVisible();
  });

  test('shows proper address', () => {
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText(userActivity[0].targetAddress)).toBeVisible();
  });
});

describe('status', () => {
  test('shows proper status on COMPLETED', () => {
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Completed')).toBeVisible();
  });

  test('shows proper status on PROCESSING', () => {
    userActivity[0].status = 'PROCESSING';

    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Processing')).toBeVisible();
  });

  test('shows proper status on OPEN', () => {
    userActivity[0].status = 'OPEN';

    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('Open')).toBeVisible();
  });

  test('shows transaction info icon on OPEN', () => {
    userActivity[0].status = 'OPEN';

    const { getByTestId } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByTestId('activity-table-status__info')).toBeVisible();
  });
  test('calls openModal on click', () => {
    const openModal = jest.fn();
    const { getByTestId } = renderWithWeb3Context(
      <Status status={'OPEN'} openModal={openModal} />
    );

    fireEvent.click(getByTestId('activity-table-status__info'));

    expect(openModal).toHaveBeenCalled();
  });

  test('shows proper status on ON HOLD', () => {
    userActivity[0].status = 'ON_HOLD';

    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('On Hold')).toBeVisible();
  });
});

describe('amount', () => {
  test('shows the proper symbol', () => {
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText('CHF36')).toBeVisible();
  });

  test('shows the proper amount if BUY', () => {
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText(`+${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });

  test('shows the proper amount if RECEIVED', () => {
    userActivity[0].action = 'RECEIVED';
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText(`+${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });

  test('shows the proper amount if SELL', () => {
    userActivity[0].action = 'SELL';
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText(`-${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });

  test('shows the proper amount if SENT', () => {
    userActivity[0].action = 'SENT';
    const { getByText } = renderWithWeb3Context(
      <ActivityTable userActivity={userActivity} />
    );

    expect(getByText(`-${formatAmount(userActivity[0].amount)}`)).toBeVisible();
  });
});

describe('row', () => {
  const activity = {
    action: 'BUY',
    amount: 15,
    date: '06.08.2019',
    paymentInfo: null,
    status: 'COMPLETED',
    symbol: 'CHF36',
    targetAddress: '0x95ff342a3db1a7dd6cd81ff02a4bd6dcba68f3f0',
    txHash:
      '0xc49ca0c54824c440139ddfcc161458345e98f45f7326c0bd0c9ffc2758c96573',
    id: '1'
  };

  test('renders the Row component', () => {
    const { getByText } = renderWithWeb3Context(
      <Row activity={activity} id={activity.id} />
    );

    expect(getByText('CHF36')).toBeVisible();
    expect(
      getByText('0x95ff342a3db1a7dd6cd81ff02a4bd6dcba68f3f0')
    ).toBeVisible();
  });
});
