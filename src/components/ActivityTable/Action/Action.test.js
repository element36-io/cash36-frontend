import React from 'react';
import { shallow } from 'enzyme';
import Action from './Action';
import Typography from '@material-ui/core/Typography';

const props = {
  type: 'SELL',
  username: 'johnsmith'
};

describe('Shallow render component', () => {
  let wrapper = shallow(<Action {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 2 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should render 1 Typography element inside the component', () => {
    expect(wrapper.find(Typography).length).toBe(1);
  });
});
