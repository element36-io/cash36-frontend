import React from 'react';
import { shallow } from 'enzyme';
import Amount from './Amount';

const props = {
  type: 'SELL',
  symbol: 'CHF36',
  amount: 5
};

describe('Shallow render component', () => {
  let wrapper = shallow(<Amount {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 3 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
});
