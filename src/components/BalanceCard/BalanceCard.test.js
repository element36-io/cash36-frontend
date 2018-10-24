import React from 'react';
import { shallow } from 'enzyme';
import BalanceCard from './BalanceCard';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const props = {
  symbol: 'CHF36',
  name: 'Swiss Franc',
  balance: 135
};

describe('Shallow render component', () => {
  let wrapper = shallow(<BalanceCard {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 6 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(4);
  });

  it('should render 1 Typography element inside the component', () => {
    expect(wrapper.find(Typography).length).toBe(1);
  });

  it('should render 1 MoreVert icon inside the component', () => {
    expect(wrapper.find(MoreVertIcon).length).toBe(1);
  });
});
