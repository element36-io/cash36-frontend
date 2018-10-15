import React from 'react';
import Date from './Date';
import Status from './Status';
import Action from './Action';
import Amount from './Amount';

import './ActivityTable.scss';

const mockActivity = [{
  'action': 'BUY',
  'amount': 15,
  'date': '11.10.1455',
  'status': 'PROCESSING',
  'symbol': 'CHF36',
  'targetAddress': '0x8ee94d7797dc24aa48ed1c362dc6c10093051f60',
  'txHash': '3155'
},
{
  'action': 'SELL',
  'amount': 15,
  'date': '11.10.1455',
  'status': 'ON_HOLD',
  'symbol': 'EUR36',
  'targetAddress': '0x8ee94d7797dc24aa48ed1c363dc6c10093452f60',
  'txHash': '13153515353'
},
{
  'action': 'BUY',
  'amount': 15535,
  'date': '11.10.1455',
  'status': 'COMPLETED',
  'symbol': 'EUR36',
  'targetAddress': '0x8ee94d7797dc24aa48ed1c363dc6c10093452f60',
  'txHash': '131533553153'
},
{
  'action': 'SELL',
  'amount': 15,
  'date': '11.10.1455',
  'status': 'OPEN',
  'symbol': 'EUR36',
  'targetAddress': '0x8ee94d7797dc24aa48ed1c363dc6c10093452f60',
  'txHash': '13153335353'
}];

const ActivityTable = () => (
  <div className='activity-table'>
    <div className='activity-table__head activity-table__row'>
      <div>Date</div>
      <div>Action</div>
      <div>Status</div>
      <div>Amount</div>
    </div>
    <div className='activity-table__body paper'>
      {mockActivity.map((activity) => {
        return (
          <div key={activity.txHash} className='activity-table__row'>
            <div><Date date={activity.date} /></div>
            <div><Action type={activity.action} username={activity.targetAddress} /></div>
            <div><Status status={activity.status} /></div>
            <div><Amount type={activity.action} amount={activity.amount} symbol={activity.symbol} /></div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ActivityTable;
