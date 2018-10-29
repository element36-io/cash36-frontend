import React from 'react';
import { shallow } from 'enzyme';
import ActivityTable from './ActivityTable';

const props = {
  userActivity: [{
    'action': 'BUY',
    'amount': 15,
    'date': '11.10.1455',
    'status': 'PROCESSING',
    'symbol': 'CHF36',
    'targetAddress': '0x8ee94d7797dc24aa48ed1c362dc6c10093051f60',
    'txHash': '3155'
  }]
};

describe('Shallow render component', () => {
  let wrapper = shallow(<ActivityTable {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });
});
